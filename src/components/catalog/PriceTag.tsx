import { discountPercent, formatCurrency } from '@/lib/formatCurrency'

interface PriceTagProps {
  price: number
  oldPrice?: number
  size?: 'sm' | 'lg'
  /** Oculta o sufixo "no Pix" (uso em espaços apertados). */
  hidePix?: boolean
  className?: string
}

/**
 * Bloco de preço do card e da página de produto:
 * preço atual em negrito, preço antigo riscado e desconto em `success`.
 */
export function PriceTag({ price, oldPrice, size = 'sm', hidePix = false, className = '' }: PriceTagProps) {
  const percent = discountPercent(price, oldPrice)
  const currentSize = size === 'sm' ? 'text-sm' : 'text-lg'

  return (
    <div className={className}>
      <p className="m-0 flex flex-wrap items-baseline gap-x-1.5">
        <span className={`font-semibold ${currentSize}`}>{formatCurrency(price)}</span>
        {!hidePix && <span className="text-xs text-muted">no Pix</span>}
      </p>

      {percent > 0 && (
        <p className="m-0 mt-0.5 flex flex-wrap items-baseline gap-x-2">
          <s className="text-xs text-muted">{formatCurrency(oldPrice as number)}</s>
          <span className="text-xs font-semibold text-success">{percent}% off</span>
        </p>
      )}
    </div>
  )
}