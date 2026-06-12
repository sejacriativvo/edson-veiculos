# Edson Veículos — Site

Site institucional + vitrine de estoque da **Edson Veículos** (concessionária multimarca, Araras-SP).
Recriação premium, moderna e clean do site original, com páginas e componentes dinâmicos.

## Stack
- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (design system em `src/app/globals.css`)
- **Motion** (animações de entrada, hover, galeria, transições)
- **lucide-react** (ícones)

## Rodar localmente
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run start    # servir o build
```

## Estrutura
- `src/app/page.tsx` — Home (hero, busca, destaques, diferenciais, financiamento, mapa)
- `src/app/estoque/` — Estoque com filtros dinâmicos (marca, preço, câmbio, busca, ordenação, grade/lista)
- `src/app/veiculo/[id]/` — Página do veículo (galeria com lightbox, ficha técnica, opcionais, CTAs)
- `src/app/sobre/` e `src/app/contato/` — Institucional e contato (form → WhatsApp)
- `src/components/` — Header, Footer, VehicleCard, Gallery, SearchHero, EstoqueClient, etc.
- `src/data/veiculos.ts` — Estoque (8 veículos reais extraídos do site original, com fotos)
- `src/data/site.ts` — Contato, horários, redes, links (editar aqui pra atualizar dados da loja)
- `public/veiculos/<id>/` — Fotos dos veículos · `public/brand/` — logo

## Atualizar estoque
Editar `src/data/veiculos.ts` e adicionar as fotos em `public/veiculos/<id>/`.
Cada veículo: `marca`, `modelo`, `anoFabMod`, `km`, `cor`, `combustivel`, `cambio`, `preco`, `opcionais[]`, `fotos[]`, `destaque`.

## Deploy
Pronto para **Vercel** (`npx vercel`). Build estático exceto `/estoque` (filtros via querystring).

---
Desenvolvido pela **criativvo**.
