import { ProductCard } from './ProductCard'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  /** 3 colunas com a sidebar de filtros, 4 sem. */
  columns?: 3 | 4
  /** Quantos cards da primeira dobra entram com `loading="eager"`. */
  priorityCount?: number
  className?: string
}

const COLS = {
  3: 'grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
}

/** Grade de produtos — gap de 14px, 2 colunas no mobile. */
export function ProductGrid({
  products,
  columns = 4,
  priorityCount = 4,
  className = '',
}: ProductGridProps) {
  return (
    <ul className={`m-0 grid list-none gap-cards p-0 ${COLS[columns]} ${className}`}>
      {products.map((product, index) => (
        <li key={product.id} className="h-full min-w-0">
          <ProductCard product={product} priority={index < priorityCount} />
        </li>
      ))}
    </ul>
  )
}