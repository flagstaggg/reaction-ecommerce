import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useRef, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { TAG_LABELS } from '@/data/categories'
import { useFavoritesStore, useIsFavorite } from '@/store/favoritesStore'
import { useUIStore } from '@/store/uiStore'
import type { Product } from '@/types'
import { PriceTag } from './PriceTag'
import { Rating } from './Rating'

interface ProductCardProps {
  product: Product
  /** `priority` carrega a primeira dobra já (usado no topo das listagens). */
  priority?: boolean
  className?: string
}

/**
 * Card de produto: foto 4:5 que troca no hover, botão de favorito,
 * selo opcional, nome, categoria, preço, avaliação e cupom.
 */
export function ProductCard({ product, priority = false, className = '' }: ProductCardProps) {
  const isFavorite = useIsFavorite(product.id)
  const toggle = useFavoritesStore((state) => state.toggle)
  const showToast = useUIStore((state) => state.showToast)

  const [pulse, setPulse] = useState(false)
  const pulseTimer = useRef<number | null>(null)

  const [primary, secondary] = product.images

  const onToggleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const added = toggle(product.id)
    showToast(
      added ? `${product.name} salvo nos favoritos.` : `${product.name} removido dos favoritos.`,
    )

    setPulse(true)
    if (pulseTimer.current) window.clearTimeout(pulseTimer.current)
    pulseTimer.current = window.setTimeout(() => setPulse(false), 240)
  }

  const badge = product.tags[0]

  return (
    <article className={`group relative flex h-full flex-col ${className}`}>
      <div className="relative">
        <Link to={`/produto/${product.slug}`} className="block" aria-label={`Ver ${product.name}`}>
          <ImageWithFallback
            src={primary}
            alt={product.name}
            ratio="4 / 5"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            sizes="(min-width: 1280px) 320px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            fallbackLabel={product.name}
            imgClassName="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
        </Link>

        {secondary && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <ImageWithFallback
              src={secondary}
              alt=""
              ratio="4 / 5"
              loading="lazy"
              className="h-full w-full"
              imgClassName="h-full w-full object-cover"
            />
          </div>
        )}

        {badge && (
          <span className="pointer-events-none absolute left-2 top-2 text-[11px] font-bold uppercase tracking-[0.08em] text-accent">
            {TAG_LABELS[badge]}
          </span>
        )}

        <motion.button
          type="button"
          onClick={onToggleFavorite}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remover ${product.name} dos favoritos`
              : `Adicionar ${product.name} aos favoritos`
          }
          animate={{ scale: pulse ? 1.22 : 1 }}
          transition={{ type: 'spring', stiffness: 520, damping: 18 }}
          className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper transition-colors hover:bg-surface"
        >
          <Heart
            aria-hidden="true"
            className={`h-4 w-4 ${isFavorite ? 'fill-ink text-ink' : 'text-ink'}`}
            strokeWidth={1.75}
          />
        </motion.button>
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <h3 className="m-0 line-clamp-2 min-h-[2.75em] text-sm font-semibold leading-snug">
          <Link to={`/produto/${product.slug}`} className="transition-colors hover:text-muted">
            {product.name}
          </Link>
        </h3>

        <p className="m-0 mt-0.5 text-sm text-muted">{product.category}</p>

        <PriceTag price={product.price} oldPrice={product.oldPrice} className="mt-2" />

        <Rating value={product.rating} className="mt-2" />

        {product.coupon && (
          <p className="mb-0 mt-2 text-xs font-medium text-success">Cupom {product.coupon}</p>
        )}
      </div>
    </article>
  )
}