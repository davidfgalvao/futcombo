# FutCombo

Loja de camisas de time em Planaltina, Goiás, no modelo **dropshipping**: o cliente compra no site e o pedido segue para o fornecedor enviar ao endereço cadastrado.

## Como funciona

1. Cliente escolhe a camisa e paga (PIX ou cartão).
2. O pedido entra na [central de pedidos](/operacao) com nome, WhatsApp e endereço completo.
3. Você copia o texto ou envia no WhatsApp para o canal oficial do fornecedor (API, e-mail ou atendimento).
4. O fornecedor despacha direto para o cliente.

Não há robô que entra no site do fornecedor para finalizar a compra.

**Precificação padrão:** custo R$ 50,00 · venda R$ 99,90 (versão jogador R$ 119,90).

## Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Publicação

1. Envie o repositório para o GitHub (`davidfgalvao/futcombo`).
2. Importe o projeto na Vercel (conta `brunodab10-7017`) ou rode `npx vercel --prod`.

## Observações

Catálogo e checkout são demonstrativos. WhatsApp da loja: (61) 98210-9134.
