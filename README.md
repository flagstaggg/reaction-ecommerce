# Reaction

Site de e-commerce de moda (**front-end apenas**) para a loja fictícia **Reaction**,
de Criciúma — Santa Catarina. Projeto de demonstração: todos os dados são mockados em
TypeScript e ficam salvos apenas no navegador do visitante.

- **Stack:** React 19 + Vite 8 + TypeScript, Tailwind CSS v4, React Router 7, Zustand 5,
  Swiper 14, Framer Motion 14, Lucide React.
- **Idioma:** toda a interface em português do Brasil.
- **Sem back-end:** sem servidor, sem API externa de mapas, sem pagamento.

---

## 1. Como rodar

```bash
npm install     # instala as dependências
npm run dev     # sobe em http://localhost:5173
npm run build   # type-check (tsc -b) + build de produção em dist/
npm run preview # serve o build de produção
npm run lint    # oxlint
```

> Se o PowerShell bloquear `npm.ps1` (política de execução), use `npm.cmd install`,
> `npm.cmd run dev`, etc.

Complementares:

```bash
npm run check:images   # faz um HEAD request em todas as URLs de data/images.ts
```

**Requisitos:** Node 20+ (testado no Node 24).

---

## 2. Estrutura

```
src/
├─ assets/               (vazio — imagens ficam em data/images.ts)
├─ components/
│  ├─ layout/            UtilityBar, AnnouncementBar, Header, MegaMenu,
│  │                     MobileMenu, SearchOverlay, Footer, Layout
│  ├─ home/              HeroCarousel, SplitBanners, CategoryTrio, IconsSection,
│  │                     ShopByStyle, TopSearchedTabs, Newsletter
│  ├─ catalog/           ProductCard, ProductGrid, FilterSidebar, FilterDrawer,
│  │                     SortDropdown, Breadcrumb, Rating, PriceTag
│  ├─ product/           Gallery, SizeSelector, ColorSwatches, ProductAccordion,
│  │                     ShippingSimulator, RelatedProducts
│  ├─ cart/              CartDrawer, CartItemRow, FreeShippingBar, CheckoutDemoModal
│  └─ ui/                Button, Pill, Chip, Accordion, Drawer, Modal, Logo,
│                        ImageWithFallback, SocialIcons, Toast
├─ data/                 products.ts, categories.ts, images.ts, stores.ts
├─ pages/                Home, Catalog, ProductDetail, Favorites, Stores, NotFound
├─ store/                cartStore.ts, favoritesStore.ts, uiStore.ts
├─ hooks/                useMediaQuery, usePrefersReducedMotion, useScrolledPast,
│                        useLockBodyScroll, useEscapeKey, useFocusTrap,
│                        useCopyToClipboard, useSeo
├─ lib/                  formatCurrency.ts, filters.ts
├─ types/                index.ts
├─ App.tsx               rotas (lazy por página)
├─ main.tsx
└─ index.css             tokens de design, base e utilities
```

**Fluxo de dados:** `data/*.ts` → `lib/filters.ts` → páginas → componentes.
`data/products.ts` é a única fonte de produtos; `data/images.ts` a única fonte de URLs.

---

## 3. Rotas

| Rota | Página |
| --- | --- |
| `/` | Home |
| `/loja`, `/ofertas`, `/lancamentos` | Listagem completa |
| `/masculino`, `/feminino`, `/infantil`, `/acessorios` | Listagem por gênero |
| `…/:category` (ex.: `/masculino/camisetas`) | Listagem por gênero + categoria |
| `/produto/:slug` | Detalhe do produto |
| `/favoritos` | Favoritos |
| `/lojas` | Loja física |
| `*` | 404 |

Todas as páginas de listagem são o **mesmo componente** (`pages/Catalog.tsx`), que lê o
gênero pelo primeiro segmento da URL e o resto dos filtros pela query string.

**Parâmetros de filtro (query string)**

| Chave | Exemplo | Significado |
| --- | --- | --- |
| `genero` | `?genero=masculino` | Gênero |
| `categoria` | `?categoria=camisetas` | Tipo de produto |
| `tamanho` | `?tamanho=M&tamanho=G` | Tamanho (aceita repetido ou vírgula) |
| `cor` | `?cor=Preto` | Cor |
| `estilo` | `?estilo=street` | Estilo |
| `colecao` | `?colecao=Urban` | Coleção |
| `tag` | `?tag=new` | Selo (`new`, `exclusive`, `personalize`) |
| `min` / `max` | `?min=100&max=300` | Faixa de preço |
| `ordem` | `?ordem=menor-preco` | Ordenação |
| `busca` | `?busca=cargo` | Termo de busca (usado por “Ver todos os resultados”) |

Exemplo: `/masculino/camisetas?cor=Preto&tamanho=M&ordem=menor-preco`

---

## 4. Como trocar as cores

Tudo está no bloco `@theme` do topo de **`src/index.css`**:

```css
@theme {
  --color-ink: #111111;       /* texto, logo, ícones, botão primário */
  --color-paper: #ffffff;     /* fundo */
  --color-surface: #f5f5f5;   /* barra de avisos, fundo das fotos */
  --color-surface-2: #ededed; /* tiles de destaque */
  --color-muted: #757575;     /* texto secundário, preço riscado */
  --color-line: #e5e5e5;      /* divisórias de 1px */
  --color-success: #007d48;   /* desconto, cupom, frete grátis */
  --color-accent: #ff4b1f;    /* só selos ("Novo", "Exclusivo") */

  --container-shell: 90rem;   /* largura máxima do conteúdo (1440px) */
}
```

O Tailwind v4 gera os utilitários automaticamente: mudar `--color-accent` troca
`text-accent` em todo o site, sem nenhum outro ajuste.

---

## 5. Como trocar as fontes

As fontes são locais (via `@fontsource`), então **não há requisição ao Google Fonts**.

Em `src/main.tsx`:

```ts
import '@fontsource-variable/inter'              // Inter variável (400–700)
import '@fontsource/barlow-condensed/latin-600.css'
import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource/barlow-condensed/latin-800.css'
```

As famílias ficam em `--font-sans` e `--font-display`, no mesmo `@theme`:

```css
--font-sans: 'Inter Variable', ui-sans-serif, system-ui, sans-serif;
--font-display: 'Barlow Condensed', 'Inter Variable', sans-serif;
```

O utilitário `font-display` já aplica caixa alta, `line-height: 0.9` e tracking
negativo — é ele que dá o ar editorial dos títulos de hero e banners.
Trocar para outra fonte = mudar o `@import` e as duas variáveis.

---

## 6. Como trocar as imagens

**Todas as URLs estão centralizadas em `src/data/images.ts`.** Nenhum outro arquivo
do projeto contém endereço de imagem.

```ts
// Helper atual (Unsplash com recorte e qualidade):
export function unsplash(id: string, width = 900, quality = 80): string

// Para usar fotos próprias / CDN:
export function absolute(url: string): string
```

O arquivo exporta: `heroImages`, `splitBannerImages`, `categoryTrioImages`,
`iconsSectionImages`, `styleCardImages`, `productImages` (2 fotos por produto, a
segunda aparece no hover) e `placeholderImage`.

Ao trocar as URLs, mantenha o `alt` preenchido. Toda foto passa por
`ImageWithFallback`, que reserva a proporção (`ratio="4 / 5"`) e, se a imagem falhar,
troca por um bloco `surface` com o nome do produto — nunca aparece imagem quebrada.

Para conferir se nenhuma URL morreu:

```bash
npm run check:images
```

---

## 7. Onde mexir no conteúdo

| O quê | Onde |
| --- | --- |
| Produtos (nome, preço, cores, tamanhos, cupom, descrição) | `src/data/products.ts` |
| Categorias, filtros, navegação, mega menu, avisos | `src/data/categories.ts` |
| Loja física (endereço, horários, telefone) | `src/data/stores.ts` |
| Textos dos banners do hero | `SLIDES` em `src/components/home/HeroCarousel.tsx` |
| Banners 50/50 | `BANNERS` em `src/components/home/SplitBanners.tsx` |
| Cards de "Compre por Estilo" | `STYLES` em `src/components/home/ShopByStyle.tsx` |
| Abas de "Produtos mais buscados" | `TOP_SEARCHED_TABS` em `src/data/products.ts` |
| Título e descrição de cada página | `useSeo(...)` dentro de cada página |

---

## 8. Design system em números

- Margem lateral: **40px** no desktop, **16px** no mobile (utilitário `shell`).
- Gap entre cards: **14px** (utilitário `gap-cards`).
- Espaçamento entre seções: **48–64px** (`py-12` / `py-16`).
- Altura do header: **56px** (`h-14`), fixo, com borda de 1px ao rolar.
- Botões: `rounded-full`, altura 44px (`h-11`), padding horizontal 24px.
- **Sem sombras, sem gradientes decorativos, sem cantos arredondados** em imagens e
  cards. Arredondamento total só em botões, pílulas e chips.
- Foco visível em tudo: `outline: 2px solid ink` com offset (definido em `index.css`).
- Breakpoints: 640, 768, 1024, 1280 (padrão do Tailwind).
- Contêiner máximo: 1440px. Hero e banners vão de ponta a ponta.

---

## 9. Acessibilidade

- Navegação completa por teclado: mega menu (hover **e** foco), carrosséis com setas e
  teclado, tabs da home com ←/→/Home/End, dropdown de ordenação como `listbox` navegável.
- Drawers e modais: `role="dialog"`, `aria-modal`, foco preso, devolução do foco ao
  fechar e fechamento por **Esc**.
- `aria-label` em todos os botões só de ícone; `aria-pressed` / `aria-checked` nos
  controles de estado; breadcrumb com `aria-current="page"`.
- Contraste AA: texto ink/paper e muted/paper usados apenas acima de 4.5:1.
- `prefers-reduced-motion`: sem autoplay de carrossel e sem transições longas
  (regra global em `index.css` + `usePrefersReducedMotion`).
- Link “Pular para o conteúdo” no topo de cada página.

---

## 10. Performance

- Todas as páginas entram por `React.lazy` (um chunk por rota).
- Imagens com `loading="lazy"` (exceto hero e primeira dobra), `sizes` e
  parâmetros de largura/qualidade na URL do Unsplash.
- Proporção reservada via `aspect-ratio` — sem salto de layout.
- `document.title` e `meta description` atualizados por página.

---

## 11. Premissas assumidas

O briefing não respondia tudo; estas foram as decisões tomadas:

1. **“Calçados” aparece no mega menu**, mas a lista de tipos pedida não incluía calçados.
   Para que os links funcionassem, criei o tipo `calcado` (categoria “Tênis”) com 4
   produtos — vale como extensão, não como substituição dos tipos exigidos.
2. **Acessórios foram separados em Bonés, Meias e Mochilas** para que os links do mega
   menu (“Bonés”, “Meias”, “Mochilas”) levem a listagens reais com conteúdo.
3. **Preço = preço final no Pix.** Todo desconto está embutido em `price`, com `oldPrice`
   guardando o “de”. O filtro de preço opera sobre `price`.
4. **Frete grátis em R$ 299** (valor do briefing) também vira meta da barra de progresso
   no carrinho.
5. **Hero em 3 slides** com os textos indicados; o CTA “Avise-me” dispara um toast.
6. **Textos de conteúdo** (descrições, detalhes, avisos, FAQ) foram escritos para a
   demonstração e são fictícios.
7. **Links sem destino** (Ajuda, Devoluções, Junte-se a nós, redes sociais, políticas)
   ficam visualmente habilitados, com `preventDefault` e texto explicativo no rodapé.
8. **SVG do mapa** é um bloco ilustrativo em CSS/CSS-grid + marcador — nenhuma API
   externa, conforme pedido.
9. **Ícones de rede social desenhados à mão** em `ui/SocialIcons.tsx`: a versão atual do
   Lucide removeu os ícones de marca, e não vale adicionar uma biblioteca só por causa
   disso. São três SVGs simples e sem dependência.
10. **Filtros combináveis por query string** em vez de sub-rotas, para manter links
    compartilháveis e o botão “Compartilhar” funcional.

---

## 12. Limitações (é uma demonstração)

- **Não há back-end.** Produtos, preços, estoque e avaliações são arquivos locais.
- **Checkout simulado.** “Finalizar compra” abre um modal informando que o site é de
  demonstração. Nenhum pagamento é processado.
- **Sem login e sem conta.** Carrinho e favoritos são por navegador (`localStorage`).
- **Simulador de frete e CEP fictícios**, calculados no cliente a partir dos dígitos
  do CEP. Nada é enviado a ninguém.
- **Newsletter e “avise-me” não enviam e-mail** — só mostram confirmação na tela.
- **Busca é local** (filtra o array de produtos), sem índice nem relevância avançada.
- **Imagens vêm do Unsplash** e mostram pessoas e cenários reais; são surround de
  catálogo de demonstração e devem ser substituídas pelas fotos oficiais antes de
  qualquer uso comercial.
- **Dados da loja são fictícios**, inclusive endereço, telefone e horários.

---

## 13. Checklist de aceite

- [x] Header fixo de 56px, borda de 1px que aparece ao rolar
- [x] Carrossel do hero (autoplay 6s, pausa no hover, barras de progresso, setas, teclado)
- [x] Carrossel da barra de avisos (troca a cada 5s, setas, dots no mobile)
- [x] Mega menu de 4 colunas no hover/foco
- [x] Drawer de menu no mobile com acordeões
- [x] Busca em tela cheia com filtro em tempo real (até 6 resultados + “Ver todos”)
- [x] Filtros e ordenação reais, aplicados sobre os dados mock e refletidos na URL
- [x] Botão “Compartilhar” copiando o link com toast
- [x] “Limpar filtros” e estado vazio amigável
- [x] “Carregar mais” de 12 em 12
- [x] Carrinho e favoritos persistindo ao recarregar a página
- [x] Frete grátis com barra de progresso
- [x] Página de produto: galeria com miniaturas, zoom, cores, tamanhos (indisponíveis
      riscados), parcelamento, simulador de CEP com máscara, acordeões e relacionados
- [x] Checkout simulado em modal
- [x] Layout conferido em 375px, 768px, 1024px e 1440px
- [x] `npm run build` sem erros de TypeScript e `npm run lint` sem avisos
- [x] Nenhuma imagem quebrada (`npm run check:images` → 54/54 OK)
- [x] Identidade visual 100% Reaction — nenhuma marca de terceiro citada em código,
      textos ou imagens

---

## 14. Dependências

Somente as/libs do briefing, sem nada extra:

`react`, `react-dom`, `react-router-dom`, `zustand`, `swiper`, `framer-motion`,
`lucide-react`, `@fontsource-variable/inter`, `@fontsource/barlow-condensed`.

Dev: `vite`, `@vitejs/plugin-react`, `typescript`, `tailwindcss`,
`@tailwindcss/vite`, `oxlint`, `@types/*`.

O único script fora do padrão é `scripts/check-images.mjs`, que usa apenas `node:fs`
e `fetch` nativos — nenhuma dependência nova.