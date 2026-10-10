import { Star } from 'lucide-react'

interface RatingProps {
  value: number
  reviewCount?: number
  /** `box` mostra a nota dentro de uma caixa de borda fina (cards). */
  variant?: 'box' | 'inline'
  size?: 'sm' | 'md'
  className?: string
}

/** 5 estrelas pretas + nota numa caixinha de borda fina. */
export function Rating({
  value,
  reviewCount,
  variant = 'box',
  size = 'sm',
  className = '',
}: RatingProps) {
  const rounded = Math.round(value)
  const starSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'
  const showCount = typeof reviewCount === 'number'

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((index) => (
          <Star
            key={index}
            className={`${starSize} ${index < rounded ? 'fill-ink text-ink' : 'text-line'}`}
            strokeWidth={1.5}
          />
        ))}
      </span>

      <span
        className={
          variant === 'box'
            ? `inline-flex items-center border border-line font-medium tabular-nums ${
                size === 'sm' ? 'h-[18px] px-1 text-[11px]' : 'h-5 px-1.5 text-xs'
              }`
            : `inline-flex items-center font-medium tabular-nums ${
                size === 'sm' ? 'text-[11px]' : 'text-xs'
              }`
        }
      >
        {value.toFixed(1).replace('.', ',')}
      </span>

      {showCount && (
        <span className="text-[11px] text-muted">
          ({reviewCount.toLocaleString('pt-BR')})
        </span>
      )}

      <span className="sr-only">
        Nota {value.toFixed(1).replace('.', ',')} de 5
        {showCount ? `, ${reviewCount} avaliações` : ''}
      </span>
    </div>
  )
}