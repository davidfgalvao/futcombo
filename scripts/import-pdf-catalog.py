#!/usr/bin/env python3
"""Extrai fotos, nomes e tamanhos do PDF Catalogo_camisas."""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

import pymupdf

PDF = Path("/Users/davidgalvao/Downloads/Catalogo_camisas.pdf")
ROOT = Path(__file__).resolve().parents[1]
OUT_JSON = ROOT / "lib" / "beta-catalog.json"
IMG_DIR = ROOT / "public" / "camisas"

SIZE_RE = re.compile(r"^(P|M|G|GG|XG|XL|XXL|2XL|3XL|4XL|G1|2XG|3XG)$", re.I)
SKIP_TEXT = ("catálogo", "modelos disponíveis", "versão torcedor")

TEAMS = [
    "Atlético de Madrid",
    "Atletico de Madrid",
    "Atlético Mineiro",
    "Atletico Mineiro",
    "Borussia Dortmund",
    "Bayern de Munique",
    "Manchester City",
    "Manchester United",
    "Real Madrid",
    "Aston Villa",
    "AC Milan",
    "Paris Saint-Germain",
    "Red Bull Bragantino",
    "Internacional",
    "Fluminense",
    "Corinthians",
    "Flamengo",
    "Palmeiras",
    "São Paulo",
    "Sao Paulo",
    "Santos",
    "Botafogo",
    "Cruzeiro",
    "Grêmio",
    "Gremio",
    "Vasco",
    "Bahia",
    "Fortaleza",
    "Barcelona",
    "Liverpool",
    "Arsenal",
    "Chelsea",
    "Juventus",
    "Inter",
    "Ajax",
    "Celtic",
    "Porto",
    "PSG",
    "Milan",
    "Brasil",
    "Argentina",
    "Argélia",
    "Argelia",
    "México",
    "Mexico",
    "França",
    "Franca",
    "Portugal",
    "Alemanha",
    "Espanha",
    "Itália",
    "Italia",
    "Inglaterra",
    "Japão",
    "Japao",
    "Holanda",
    "Uruguai",
]


def slugify(text: str) -> str:
    normalized = unicodedata.normalize("NFKD", text)
    ascii_text = normalized.encode("ascii", "ignore").decode("ascii")
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_text.lower()).strip("-")
    return slug or "camisa"


def guess_team(name: str) -> str:
    lower = name.lower()
    for team in TEAMS:
        if team.lower() in lower:
            return (
                team.replace("Sao Paulo", "São Paulo")
                .replace("Gremio", "Grêmio")
                .replace("Atletico de Madrid", "Atlético de Madrid")
                .replace("Atletico Mineiro", "Atlético Mineiro")
                .replace("Argelia", "Argélia")
                .replace("Mexico", "México")
                .replace("Franca", "França")
                .replace("Italia", "Itália")
                .replace("Japao", "Japão")
            )
    tokens = name.replace("Camisa", "").replace("Camiseta", "").replace("Regata", "").split()
    return tokens[0] if tokens else name


def guess_gender(name: str) -> str:
    n = name.lower()
    if "infantil" in n or "juvenil" in n or "kids" in n:
        return "infantil"
    if "feminina" in n or "feminino" in n or "torcedora" in n:
        return "feminina"
    return "masculino"


def guess_category(name: str) -> str:
    n = name.lower()
    if "retrô" in n or "retro" in n:
        return "retro"
    if any(
        key in n
        for key in (
            "seleção",
            "selecao",
            "copa do mundo",
            "copa 2026",
            "argentina",
            "méxico",
            "mexico",
            "argélia",
            "argelia",
        )
    ) or re.search(r"\bbrasil\b", n):
        return "selecoes"
    if "treino" in n or "pré-jogo" in n or "pre-jogo" in n:
        return "conjuntos"
    return "torcedor"


def overlap_x(a: pymupdf.Rect, b: pymupdf.Rect) -> float:
    left = max(a.x0, b.x0)
    right = min(a.x1, b.x1)
    return max(0.0, right - left)


def save_image(doc: pymupdf.Document, xref: int, dest: Path) -> bool:
    pix = pymupdf.Pixmap(doc, xref)
    try:
        if pix.n - pix.alpha > 3:
            pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
        elif pix.alpha:
            pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
        dest.parent.mkdir(parents=True, exist_ok=True)
        pix.save(dest.as_posix(), jpg_quality=88)
        return dest.exists() and dest.stat().st_size > 800
    finally:
        pix = None


def parse_page(page: pymupdf.Page) -> list[dict]:
    images = []
    for img in page.get_images(full=True):
        xref = img[0]
        rects = page.get_image_rects(xref)
        if not rects:
            continue
        images.append({"xref": xref, "rect": rects[0], "w": img[2], "h": img[3]})
    images.sort(key=lambda item: (round(item["rect"].y0 / 20), item["rect"].x0))

    texts = []
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") != 0:
            continue
        raw = " ".join(span["text"] for line in block.get("lines", []) for span in line.get("spans", []))
        raw = re.sub(r"\s+", " ", raw).strip()
        if not raw:
            continue
        lower = raw.lower()
        if any(skip in lower for skip in SKIP_TEXT):
            continue
        texts.append({"text": raw, "rect": pymupdf.Rect(block["bbox"])})

    items = []
    used: set[int] = set()
    for image in images:
        caption_parts: list[str] = []
        for index, text in enumerate(texts):
            if index in used:
                continue
            if text["rect"].y0 < image["rect"].y1 - 6:
                continue
            if text["rect"].y0 > image["rect"].y1 + 90:
                continue
            if overlap_x(image["rect"], text["rect"]) < 20:
                continue
            caption_parts.append(text["text"])
            used.add(index)
        caption = " ".join(caption_parts)
        caption = caption.replace("TAMANHOS", " TAMANHOS ").strip()
        if "TAMANHOS" in caption:
            name, _, rest = caption.partition("TAMANHOS")
        else:
            name, rest = caption, ""
        name = re.sub(r"\s+", " ", name).strip(" -")
        sizes = [token.upper() for token in rest.split() if SIZE_RE.match(token)]
        if not name:
            continue
        items.append({"name": name, "sizes": sizes or ["P", "M", "G", "GG"], "xref": image["xref"]})
    return items


def main() -> None:
    doc = pymupdf.open(PDF)
    catalog: list[dict] = []
    seen_slugs: set[str] = set()
    IMG_DIR.mkdir(parents=True, exist_ok=True)

    for page_index in range(doc.page_count):
        page = doc[page_index]
        items = parse_page(page)
        print(f"página {page_index + 1}: {len(items)} produtos")
        for item in items:
            slug = slugify(item["name"])
            base = slug
            suffix = 2
            while slug in seen_slugs:
                slug = f"{base}-{suffix}"
                suffix += 1
            seen_slugs.add(slug)
            dest = IMG_DIR / f"{slug}.jpg"
            ok = save_image(doc, item["xref"], dest)
            catalog.append(
                {
                    "slug": slug,
                    "name": item["name"],
                    "category": guess_category(item["name"]),
                    "image": f"/camisas/{dest.name}" if ok else None,
                    "sizes": item["sizes"],
                    "team": guess_team(item["name"]),
                    "gender": guess_gender(item["name"]),
                }
            )

    OUT_JSON.write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")
    missing = sum(1 for item in catalog if not item["image"])
    print(f"Total: {len(catalog)} | sem foto: {missing} | json: {OUT_JSON}")


if __name__ == "__main__":
    main()
