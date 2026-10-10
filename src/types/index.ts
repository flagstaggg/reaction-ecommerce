/**
 * Tipos de domínio da loja Reaction.
 * Todos os dados são mockados e vivem em `src/data`.
 */

export type Gender = 'masculino' | 'feminino' | 'infantil' | 'unissex'

export type ProductType =
  | 'camiseta'
  | 'moletom'
  | 'calca'
  | 'short'
  | 'jaqueta'
  | 'calcado'
  | 'acessorio'

export type ProductStyle = 'casual' | 'esportivo' | 'street'

/** Selos exibidos no ProductCard. */
export type ProductTag = 'new' | 'exclusive' | 'personalize'

export interface ProductColor {
  name: string
  /** Hexadecimal usado nas bolinhas do seletor de cor. */
  hex: string
}

export interface ProductSize {
  label: string
  available: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  /** Categoria exibida no card, ex.: "Camisetas". */
  category: string
  type: ProductType
  gender: Gender
  style: ProductStyle
  /** Linha/coleção, ex.: "Urban", "Tech", "Heritage". */
  collection: string
  /** Preço final já com o desconto do Pix. */
  price: number
  /** Preço "de", opcional. Ausente = sem desconto. */
  oldPrice?: number
  rating: number
  reviewCount: number
  colors: ProductColor[]
  sizes: ProductSize[]
  images: string[]
  tags: ProductTag[]
  /** Cupom exibido na linha verde do card. */
  coupon?: string
  description: string
  details: string[]
  /** ISO date — usado na ordenação "Mais recentes". */
  createdAt: string
  /** Destaque manual usado na home. */
  featured?: boolean
}

export interface CartItem {
  /** `${productId}|${color}|${size}` — identidade única da variação. */
  key: string
  productId: string
  slug: string
  name: string
  image: string
  color: string
  size: string
  price: number
  quantity: number
}

export interface CategoryLink {
  label: string
  to: string
}

export interface MegaMenuColumn {
  title: string
  links: CategoryLink[]
}

export interface NavLink {
  label: string
  to: string
  /** Presente quando o item abre um mega menu no hover. */
  mega?: MegaMenuColumn[]
}

export interface StoreLocation {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  hours: string[]
  phone: string
  services: string[]
}

export interface Announcement {
  title: string
  text: string
  linkLabel: string
  to: string
  /** Ícone do Lucide. */
  icon: 'Truck' | 'BadgePercent' | 'Store' | 'Sparkles'
}

export type SortOption =
  | 'destaque'
  | 'recentes'
  | 'menor-preco'
  | 'maior-preco'
  | 'maior-desconto'

export interface FilterState {
  genders: Gender[]
  /** Slugs das categorias (derivados de `Product.category`). */
  categories: string[]
  sizes: string[]
  colors: string[]
  styles: ProductStyle[]
  collections: string[]
  tags: ProductTag[]
  minPrice: number | null
  maxPrice: number | null
  sort: SortOption
}