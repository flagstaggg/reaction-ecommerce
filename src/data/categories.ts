import type {
  Announcement,
  FilterState,
  Gender,
  NavLink,
  ProductStyle,
  ProductType,
  SortOption,
} from '@/types'

/** Remove acentos e normaliza para uso em rotas e query params. */
export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/* ------------------------------------------------------------------ */
/* Opções de filtro                                                     */
/* ------------------------------------------------------------------ */

export const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'infantil', label: 'Infantil' },
  { value: 'unissex', label: 'Unissex' },
]

/** Ordem fixa da sidebar "Tipo de produto". */
export const CATEGORY_ORDER = [
  'Camisetas',
  'Moletons',
  'Calças',
  'Shorts',
  'Jaquetas',
  'Tênis',
  'Bonés',
  'Meias',
  'Mochilas',
] as const

export const SIZE_OPTIONS = [
  'PP',
  'P',
  'M',
  'G',
  'GG',
  '2',
  '4',
  '6',
  '8',
  '10',
  '12',
  'Único',
]

export const STYLE_OPTIONS: { value: ProductStyle; label: string }[] = [
  { value: 'casual', label: 'Casual' },
  { value: 'esportivo', label: 'Esportivo' },
  { value: 'street', label: 'Street' },
]

export const COLLECTION_OPTIONS = [
  'Essentials',
  'Heritage',
  'Urban',
  'Tech',
  'Run',
  'Kids',
]

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'destaque', label: 'Em destaque' },
  { value: 'recentes', label: 'Mais recentes' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'maior-desconto', label: 'Maiores descontos' },
]

export const PRICE_BOUNDS = { min: 0, max: 500 }

/** Estado inicial dos filtros — também define o formato da query string. */
export const EMPTY_FILTERS: FilterState = {
  genders: [],
  categories: [],
  sizes: [],
  colors: [],
  styles: [],
  collections: [],
  tags: [],
  minPrice: null,
  maxPrice: null,
  sort: 'destaque',
}

/* ------------------------------------------------------------------ */
/* Navegação                                                            */
/* ------------------------------------------------------------------ */

const destaqueLinks = (gender?: Gender) => [
  { label: 'Lançamentos', to: gender ? `/lancamentos?genero=${gender}` : '/lancamentos' },
  { label: 'Ofertas', to: gender ? `/ofertas?genero=${gender}` : '/ofertas' },
  { label: 'Mais vendidos', to: gender ? `/${gender}?tag=new` : '/loja' },
  { label: 'Novidades', to: gender ? `/${gender}?tag=exclusive` : '/loja?tag=new' },
]

const WEBINKS: NavLink[] = [
  { label: 'Ofertas', to: '/ofertas' },
  { label: 'Lançamentos', to: '/lancamentos' },
  {
    label: 'Masculino',
    to: '/masculino',
    mega: [
      { title: 'Destaques', links: destaqueLinks('masculino') },
      {
        title: 'Roupas',
        links: [
          { label: 'Camisetas', to: '/masculino/camisetas' },
          { label: 'Moletons', to: '/masculino/moletons' },
          { label: 'Jaquetas', to: '/masculino/jaquetas' },
          { label: 'Calças', to: '/masculino/calcas' },
          { label: 'Shorts', to: '/masculino/shorts' },
        ],
      },
      {
        title: 'Calçados',
        links: [
          { label: 'Tênis', to: '/masculino/tenis' },
          { label: 'Tênis casuais', to: '/masculino/tenis?estilo=casual' },
          { label: 'Tênis esportivos', to: '/masculino/tenis?estilo=esportivo' },
        ],
      },
      {
        title: 'Acessórios',
        links: [
          { label: 'Bonés', to: '/masculino/bones' },
          { label: 'Meias', to: '/masculino/meias' },
          { label: 'Mochilas', to: '/masculino/mochilas' },
          { label: 'Ver tudo', to: '/masculino' },
        ],
      },
    ],
  },
  {
    label: 'Feminino',
    to: '/feminino',
    mega: [
      { title: 'Destaques', links: destaqueLinks('feminino') },
      {
        title: 'Roupas',
        links: [
          { label: 'Camisetas', to: '/feminino/camisetas' },
          { label: 'Moletons', to: '/feminino/moletons' },
          { label: 'Jaquetas', to: '/feminino/jaquetas' },
          { label: 'Calças', to: '/feminino/calcas' },
          { label: 'Shorts', to: '/feminino/shorts' },
        ],
      },
      {
        title: 'Calçados',
        links: [
          { label: 'Tênis', to: '/feminino/tenis' },
          { label: 'Tênis casuais', to: '/feminino/tenis?estilo=casual' },
          { label: 'Tênis esportivos', to: '/feminino/tenis?estilo=esportivo' },
        ],
      },
      {
        title: 'Acessórios',
        links: [
          { label: 'Bonés', to: '/feminino/bones' },
          { label: 'Meias', to: '/feminino/meias' },
          { label: 'Mochilas', to: '/feminino/mochilas' },
          { label: 'Ver tudo', to: '/feminino' },
        ],
      },
    ],
  },
  {
    label: 'Infantil',
    to: '/infantil',
    mega: [
      { title: 'Destaques', links: destaqueLinks('infantil') },
      {
        title: 'Roupas',
        links: [
          { label: 'Camisetas', to: '/infantil/camisetas' },
          { label: 'Moletons', to: '/infantil/moletons' },
          { label: 'Jaquetas', to: '/infantil/jaquetas' },
          { label: 'Calças', to: '/infantil/calcas' },
          { label: 'Shorts', to: '/infantil/shorts' },
        ],
      },
      {
        title: 'Calçados',
        links: [
          { label: 'Tênis', to: '/infantil/tenis' },
          { label: 'Tênis casuais', to: '/infantil/tenis?estilo=casual' },
          { label: 'Tênis esportivos', to: '/infantil/tenis?estilo=esportivo' },
        ],
      },
      {
        title: 'Acessórios',
        links: [
          { label: 'Bonés', to: '/infantil/bones' },
          { label: 'Meias', to: '/infantil/meias' },
          { label: 'Mochilas', to: '/infantil/mochilas' },
          { label: 'Ver tudo', to: '/infantil' },
        ],
      },
    ],
  },
  { label: 'Acessórios', to: '/acessorios' },
]

export const NAV_LINKS: NavLink[] = WEBINKS

/** Menu usado no drawer mobile (mesma fonte de verdade). */
export const MOBILE_MENU_SECTIONS = [
  {
    title: 'Comprar',
    links: [
      { label: 'Ofertas', to: '/ofertas' },
      { label: 'Lançamentos', to: '/lancamentos' },
      { label: 'Todos os produtos', to: '/loja' },
    ],
  },
  ...WEBINKS.filter((l) => l.mega).map((link) => ({
    title: link.label,
    links: link.mega!.flatMap((col) => col.links.slice(0, 5)),
  })),
  {
    title: 'Acessórios',
    links: [
      { label: 'Ver acessórios', to: '/acessorios' },
      { label: 'Tênis', to: '/acessorios/tenis' },
      { label: 'Bonés', to: '/acessorios/bones' },
      { label: 'Meias', to: '/acessorios/meias' },
      { label: 'Mochilas', to: '/acessorios/mochilas' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Rotas de catálogo                                                    */
/* ------------------------------------------------------------------ */

export interface CatalogRouteConfig {
  /** Gênero fixo vindo do path, quando houver. */
  gender: Gender | null
  /** Título usado no cabeçalho da listagem. */
  label: string
}

export const CATALOG_ROUTES: Record<string, CatalogRouteConfig> = {
  loja: { gender: null, label: 'Todos os produtos' },
  ofertas: { gender: null, label: 'Ofertas' },
  lancamentos: { gender: null, label: 'Lançamentos' },
  masculino: { gender: 'masculino', label: 'Masculino' },
  feminino: { gender: 'feminino', label: 'Feminino' },
  infantil: { gender: 'infantil', label: 'Infantil' },
  acessorios: { gender: null, label: 'Acessórios' },
}

/* ------------------------------------------------------------------ */
/* Barra de avisos                                                      */
/* ------------------------------------------------------------------ */

export const ANNOUNCEMENTS: Announcement[] = [
  {
    title: 'Frete grátis',
    text: 'em compras acima de R$ 299',
    linkLabel: 'Ver condições',
    to: '/loja',
    icon: 'Truck',
  },
  {
    title: '10% off no Pix',
    text: 'em toda a loja, site e loja física',
    linkLabel: 'Aproveitar',
    to: '/ofertas',
    icon: 'BadgePercent',
  },
  {
    title: 'Retire na loja',
    text: 'em Criciúma, sem custo',
    linkLabel: 'Encontrar loja',
    to: '/lojas',
    icon: 'Store',
  },
]

/* ------------------------------------------------------------------ */
/* Utilidades de rótulo                                                */
/* ------------------------------------------------------------------ */

export const TYPE_LABELS: Record<ProductType, string> = {
  camiseta: 'Camisetas',
  moletom: 'Moletons',
  calca: 'Calças',
  short: 'Shorts',
  jaqueta: 'Jaquetas',
  calcado: 'Tênis',
  acessorio: 'Acessórios',
}

export const TAG_LABELS: Record<string, string> = {
  new: 'Novo',
  exclusive: 'Exclusivo',
  personalize: 'Personalize',
}

export const FREE_SHIPPING_THRESHOLD = 299