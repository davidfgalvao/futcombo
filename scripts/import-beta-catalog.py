#!/usr/bin/env python3
"""Importa produtos e fotos do beta FutCollection Oficial (loja wBuy do próprio projeto)."""

from __future__ import annotations

import json
import re
import time
import subprocess
from pathlib import Path

BASE = "https://www.futcollectionoficial.com.br/"
STORE_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
ROOT = Path(__file__).resolve().parents[1]
OUT_JSON = ROOT / "lib" / "beta-catalog.json"
IMG_DIR = ROOT / "public" / "camisas"
COOKIE_JAR = Path("/tmp/futcombo-beta.jar")

CATEGORIES = [
    ("camisas-torcedor", "torcedor"),
    ("camisas-jogador", "jogador"),
    ("retro", "retro"),
    ("selecoes1", "selecoes"),
    ("conjuntos-esportivos", "conjuntos"),
    ("nba-basquete", "nba"),
    ("grade", "grade"),
]


def fetch(url: str) -> bytes:
    cmd = [
        "curl",
        "-sSL",
        "-c",
        str(COOKIE_JAR),
        "-b",
        str(COOKIE_JAR),
        "-A",
        STORE_UA,
        "-H",
        "Accept: text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "-H",
        "Accept-Language: pt-BR,pt;q=0.9",
        "-H",
        f"Referer: {BASE}",
        "--max-time",
        "40",
        url,
    ]
    result = subprocess.run(cmd, capture_output=True, check=False)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.decode("utf-8", "replace") or "curl falhou")
    return result.stdout


def decode(raw: bytes) -> str:
    return raw.decode("latin-1", "replace")


def is_antibot(html: str) -> bool:
    return "anti-bot" in html.lower() or "Continuando para a loja" in html


def parse_items(html: str, category: str) -> list[dict]:
    items: list[dict] = []
    blocks = re.split(r'<div class="item" ', html)[1:]
    for block in blocks:
        href = re.search(r'href="([^"]+/)"', block)
        name = re.search(r'<h3 class="produto"[^>]*title="([^"]+)"', block)
        img = re.search(
            r'<img src="(https://assets\.sistemawbuy\.com\.br/arquivos/[^"]+/produtos/[^"]+)"',
            block,
        )
        price = re.search(r'class="valor_final"><span>R\$([0-9.,]+)</span>', block)
        sizes = re.findall(r'<span class="variacao">([^<]+)</span>', block)
        if not href or not name or not img:
            continue
        slug = href.group(1).strip("/").split("/")[-1]
        image_url = img.group(1).replace("_mini", "")
        items.append(
            {
                "slug": slug,
                "name": re.sub(r"\s+", " ", name.group(1)).strip(),
                "category": category,
                "imageUrl": image_url,
                "sizes": sizes or ["P", "M", "G", "GG"],
                "listedPrice": price.group(1) if price else None,
            }
        )
    return items


def max_page(html: str, path: str) -> int:
    pages = [int(n) for n in re.findall(rf"{re.escape(path)}/\?page=(\d+)", html)]
    return max(pages) if pages else 1


def guess_team(name: str) -> str:
    known = [
        "Flamengo",
        "Palmeiras",
        "Corinthians",
        "São Paulo",
        "Sao Paulo",
        "Santos",
        "Botafogo",
        "Fluminense",
        "Vasco",
        "Grêmio",
        "Gremio",
        "Internacional",
        "Cruzeiro",
        "Atlético Mineiro",
        "Atletico Mineiro",
        "Bahia",
        "Fortaleza",
        "Brasil",
        "Argentina",
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
        "Real Madrid",
        "Barcelona",
        "PSG",
        "Liverpool",
        "Arsenal",
        "Chelsea",
        "Manchester City",
        "Manchester United",
        "Bayern",
        "Borussia Dortmund",
        "AC Milan",
        "Milan",
        "Inter",
        "Juventus",
        "Ajax",
        "Atlético de Madrid",
        "Atletico de Madrid",
        "Lakers",
        "Bulls",
        "Celtics",
        "Celtic",
    ]
    lower = name.lower()
    for team in known:
        if team.lower() in lower:
            return team.replace("Sao Paulo", "São Paulo").replace("Gremio", "Grêmio")
    return name.split(" ")[1] if len(name.split(" ")) > 1 else name


def guess_gender(name: str) -> str:
    n = name.lower()
    if "infantil" in n or "kids" in n:
        return "infantil"
    if "feminina" in n:
        return "feminina"
    return "masculino"


def download(url: str, dest: Path) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 1000:
        return True
    try:
        data = fetch(url)
        if len(data) < 500:
            return False
        dest.write_bytes(data)
        return True
    except Exception:
        return False


def main() -> None:
    print("Abrindo a loja beta...")
    fetch(BASE)
    time.sleep(1)

    catalog: list[dict] = []
    seen: set[str] = set()

    for path, category in CATEGORIES:
        page = 1
        last = 1
        while page <= last:
            url = f"{BASE}{path}/" if page == 1 else f"{BASE}{path}/?page={page}"
            print(f"Buscando {url}")
            try:
                html = decode(fetch(url))
            except Exception as exc:
                print("  falhou:", exc)
                break
            if is_antibot(html):
                print("  anti-bot, esperando...")
                time.sleep(3)
                fetch(BASE)
                time.sleep(2)
                html = decode(fetch(url))
                if is_antibot(html):
                    print("  ainda bloqueado, pulando")
                    break
            if page == 1:
                last = max_page(html, path)
                print(f"  páginas: {last}")
            batch = parse_items(html, category)
            print(f"  {len(batch)} produtos")
            for item in batch:
                if item["slug"] in seen:
                    continue
                seen.add(item["slug"])
                catalog.append(item)
            page += 1
            time.sleep(0.7)

    print(f"Total únicos: {len(catalog)}")
    IMG_DIR.mkdir(parents=True, exist_ok=True)

    for index, item in enumerate(catalog, start=1):
        ext = Path(item["imageUrl"].split("?")[0]).suffix or ".jpg"
        filename = f"{item['slug']}{ext}"
        dest = IMG_DIR / filename
        ok = download(item["imageUrl"], dest)
        item["image"] = f"/camisas/{filename}" if ok else None
        item["team"] = guess_team(item["name"])
        item["gender"] = guess_gender(item["name"])
        print(f"[{index}/{len(catalog)}] {'ok' if ok else 'sem foto'} {item['name']}")
        time.sleep(0.12)

    OUT_JSON.write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Salvo em", OUT_JSON)


if __name__ == "__main__":
    main()
