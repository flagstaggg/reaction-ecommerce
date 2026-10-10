import { Minus, Plus, Trash2 } from 'lucide-react'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { formatCurrency } from '@/lib/formatCurrency'
import { useCartStore } from '@/store/cartStore'
import type { CartItem } from '@/types'

interface CartItemRowProps {
  item: CartItem
}

/** Item do carrinho: foto, variação, quantidade e preço. */
export function CartItemRow({ item }: CartItemRowProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  return (
    <li className="flex gap-4 border-b border-line py-4">
      <ImageWithFallback
        src={item.image}
        alt={item.name}
        ratio="4 / 5"
        className="w-[84px] shrink-0"
        fallbackLabel={item.name}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="m-0 truncate text-sm font-medium">{item.name}</p>
        <p className="m-0 mt-0.5 text-xs text-muted">
          Cor: {item.color} · Tamanho: {item.size}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="flex items-center rounded-full border border-line">
            <button
              type="button"
              onClick={() => updateQuantity(item.key, item.quantity - 1)}
              aria-label={`Diminuir quantidade de ${item.name}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-surface"
            >
              <Minus aria-hidden="true" className="h-3.5 w-3.5" />
            </button>

            <span aria-live="polite" className="min-w-6 text-center text-sm tabular-nums">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => updateQuantity(item.key, item.quantity + 1)}
              aria-label={`Aumentar quantidade de ${item.name}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-surface"
            >
              <Plus aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
          </div>

          <span className="text-sm font-semibold">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => removeItem(item.key)}
        aria-label={`Remover ${item.name} do carrinho`}
        className="h-8 w-8 shrink-0 self-start rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
      >
        <Trash2 aria-hidden="true" className="mx-auto h-4 w-4" />
      </button>
    </li>
  )
}