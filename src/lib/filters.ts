import { EMPTY_FILTERS, slugify, SORT_OPTIONS } from '@/data/categories'
import { discountPercent } from '@/lib/formatCurrency'
import type { FilterState, Gender, Product, ProductStyle, ProductTag, SortOption } from '@/types'

export { slugify }

/** Slug da categoria legível de um produto — é o valor usado na URL. */
export function categorySlug(product: Product): string {
  return slugify(product.category)
}

/* ------------------------------------------------------------------ */
/* URL <-> estado                                                       */
/* ------------------------------------------------------------------ */

const LIST_KEYS = [
  'genero',
  'categoria',
  'tamanho',
  'cor',
  'estilo',
  'colecao',
  'tag',
] as const

type ListKey = (typeof LIST_KEYS)[number]

function toList(params: URLSearchParams, key: ListKey): string[] {
  const raw = params.getAll(key)
  const flat = raw.flatMap((value) => value.split(',')).filter(Boolean)
  return Array.from(new Set(flat))
}

/** Aplica uma lista vinda da URL no campo correspondente de `FilterState`. */
function writeList(filters: FilterState, key: ListKey, values: string[]): void {
  switch (key) {
    case 'genero':
      filters.genders = values as Gender[]
      break
    case 'categoria':
      filters.categories = values
      break
    case 'tamanho':
      filters.sizes = values
      break
    case 'cor':
      filters.colors = values
      break
    case 'estilo':
      filters.styles = values as ProductStyle[]
      break
    case 'colecao':
      filters.collections = values
      break
    case 'tag':
      filters.tags = values as ProductTag[]
      break
  }
}

function readList(filters: FilterState, key: ListKey): string[] {
  switch (key) {
    case 'genero':
      return filters.genders
    case 'categoria':
      return filters.categories
    case 'tamanho':
      return filters.sizes
    case 'cor':
      return filters.colors
    case 'estilo':
      return filters.styles
    case 'colecao':
      return filters.collections
    case 'tag':
      return filters.tags
  }
}

function toNumber(value: string | null): number | null {
  if (value === null || value.trim() === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const VALID_SORTS = new Set<SortOption>(SORT_OPTIONS.map((option) => option.value))

/** Lê os filtros a partir da query string. */
export function parseFilters(params: URLSearchParams): FilterState {
  const next: FilterState = { ...EMPTY_FILTERS }

  for (const key of LIST_KEYS) {
    const values = toList(params, key)
    if (values.length) writeList(next, key, values)
  }

  const min = toNumber(params.get('min'))
  const max = toNumber(params.get('max'))
  if (min !== null) next.minPrice = min
  if (max !== null) next.maxPrice = max

  const sort = params.get('ordem')
  if (sort && VALID_SORTS.has(sort as SortOption)) {
    next.sort = sort as SortOption
  }

  return next
}

/** Serializa o estado de filtros de volta para a query string. */
export function filtersToSearch(filters: FilterState, base?: URLSearchParams): string {
  const params = new URLSearchParams(base)

  for (const key of LIST_KEYS) {
    params.delete(key)
  }
  params.delete('min')
  params.delete('max')

  for (const key of LIST_KEYS) {
    for (const value of readList(filters, key)) params.append(key, value)
  }

  if (filters.minPrice !== null) params.set('min', String(filters.minPrice))
  if (filters.maxPrice !== null) params.set('max', String(filters.maxPrice))

  if (filters.sort === EMPTY_FILTERS.sort) params.delete('ordem')
  else params.set('ordem', filters.sort)

  const search = params.toString()
  return search ? `?${search}` : ''
}

/** Quantidade de filtros ativos (ignora a ordenação). */
export function countActiveFilters(filters: FilterState): number {
  return (
    filters.genders.length +
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    filters.styles.length +
    filters.collections.length +
    filters.tags.length +
    (filters.minPrice !== null || filters.maxPrice !== null ? 1 : 0)
  )
}

/** Verifica se algum filtro além do padrão está aplicado. */
export function hasActiveFilters(filters: FilterState): boolean {
  return countActiveFilters(filters) > 0
}

/* ------------------------------------------------------------------ */
/* Aplicação dos filtros                                                */
/* ------------------------------------------------------------------ */

interface ExtraScope {
  /** Gênero vindo da rota (`/masculino`). */
  gender?: Gender | null
  /** `/ofertas` só mostra produtos com desconto. */
  onlyOffers?: boolean
  /** `/lancamentos` só mostra produtos com o selo "Novo". */
  onlyNew?: boolean
}

/**
 * Aplica gênero da rota, contexto da página e filtros da query string.
 * `unissex` aparece em qualquer gênero selecionado, como em lojas reais.
 */
export function filterProducts(
  products: Product[],
  filters: FilterState,
  scope: ExtraScope = {},
): Product[] {
  const { gender = null, onlyOffers = false, onlyNew = false } = scope

  return products.filter((product) => {
    if (gender && product.gender !== gender && product.gender !== 'unissex') return false
    if (onlyOffers && discountPercent(product.price, product.oldPrice) <= 0) return false
    if (onlyNew && !product.tags.includes('new')) return false

    if (filters.genders.length) {
      const matches =
        (filters.genders as Gender[]).includes(product.gender) || product.gender === 'unissex'
      if (!matches) return false
    }

    if (filters.categories.length) {
      if (!filters.categories.includes(categorySlug(product))) return false
    }

    if (filters.sizes.length) {
      const matches = product.sizes.some((size) => filters.sizes.includes(size.label))
      if (!matches) return false
    }

    if (filters.colors.length) {
      const matches = product.colors.some((color) => filters.colors.includes(color.name))
      if (!matches) return false
    }

    if (filters.styles.length) {
      if (!filters.styles.includes(product.style as ProductStyle)) return false
    }

    if (filters.collections.length) {
      if (!filters.collections.includes(product.collection)) return false
    }

    if (filters.tags.length) {
      const matches = product.tags.some((tag) => filters.tags.includes(tag as ProductTag))
      if (!matches) return false
    }

    if (filters.minPrice !== null && product.price < filters.minPrice) return false
    if (filters.maxPrice !== null && product.price > filters.maxPrice) return false

    return true
  })
}

/* ------------------------------------------------------------------ */
/* Ordenação                                                            */
/* ------------------------------------------------------------------ */

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products]

  switch (sort) {
    case 'recentes':
      return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    case 'menor-preco':
      return list.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name))
    case 'maior-preco':
      return list.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name))
    case 'maior-desconto':
      return list.sort(
        (a, b) =>
          discountPercent(b.price, b.oldPrice) - discountPercent(a.price, a.oldPrice) ||
          a.price - b.price,
      )
    case 'destaque':
    default:
      return list.sort(
        (a, b) =>
          Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
          b.rating - a.rating ||
          b.reviewCount - a.reviewCount,
      )
  }
}

/* ------------------------------------------------------------------ */
/* Busca                                                                */
/* ------------------------------------------------------------------ */

/** Normaliza texto: minúsculo e sem acentos. */
export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

/** Busca por nome, categoria, tipo e coleção. */
export function searchProducts(products: Product[], query: string, limit?: number): Product[] {
  const term = normalizeText(query)
  if (term.length < 1) return []

  const terms = term.split(/\s+/)

  const matches = products.filter((product) => {
    const haystack = normalizeText(
      [product.name, product.category, product.type, product.collection, product.style].join(' '),
    )
    return terms.every((part) => haystack.includes(part))
  })

  // Começa por quem tem o termo no início do nome.
  matches.sort((a, b) => {
    const aStarts = normalizeText(a.name).startsWith(term) ? 0 : 1
    const bStarts = normalizeText(b.name).startsWith(term) ? 0 : 1
    return aStarts - bStarts || a.name.localeCompare(b.name, 'pt-BR')
  })

  return typeof limit === 'number' ? matches.slice(0, limit) : matches
}

/** Sugestões exibidas quando o campo de busca está vazio. */
export function popularSearches(): string[] {
  return ['Camiseta', 'Moletom', 'Cargo', 'Windbreaker', 'Boné', 'Camiseta infantil']
}

/** Atualiza um filtro de lista (add/remove) e devolve um novo array. */
export function toggleInList(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}