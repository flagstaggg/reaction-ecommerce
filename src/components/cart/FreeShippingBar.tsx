import { Truck } from 'lucide-react'
import { formatCurrency } from '@/lib/formatCurrency'

interface FreeShippingBarProps {
  subtotal: number
  threshold: number
}

/** Barra de progresso para o frete grátis (R$ 299). */
export function FreeShippingBar({ subtotal, threshold }: FreeShippingBarProps) {
  const missing = Math.max(0, threshold - subtotal)
  const progress = Math.min(100, Math.round((subtotal / threshold) * 100))
  const unlocked = missing === 0

  return (
    <div className="border-b border-line px-5 py-4">
      <p className="m-0 mb-2 flex items-center gap-2 text-[13px] font-medium">
        <Truck aria-hidden="true" className="h-4 w-4 shrink-0" />
        {unlocked ? (
          <span className="text-success">Você ganhou frete grátis!</span>
        ) : (
          <span>
            Faltam{' '}
            <span className="font-semibold">{formatCurrency(missing)}</span> para o frete grátis
          </span>
        )}
      </p>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={threshold}
        aria-valuenow={Math.min(subtotal, threshold)}
        aria-label="Progresso para o frete grátis"
        className="h-[3px] w-full bg-surface"
      >
        <div
          className={`h-full transition-[width] duration-300 ${unlocked ? 'bg-success' : 'bg-ink'}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}