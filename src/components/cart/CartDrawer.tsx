import { Button } from '@/components/ui/Button'
import { Drawer } from '@/components/ui/Drawer'
import { FREE_SHIPPING_THRESHOLD } from '@/data/categories'
import { formatCurrency } from '@/lib/formatCurrency'
import { selectSubtotal, useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { CartItemRow } from './CartItemRow'
import { FreeShippingBar } from './FreeShippingBar'

/** Drawer da sacola, aberto pelo ícone do header ou ao adicionar um item. */
export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen)
  const close = useCartStore((state) => state.close)
  const items = useCartStore((state) => state.items)
  const subtotal = useCartStore(selectSubtotal)

  const setCheckoutOpen = useUIStore((state) => state.setCheckoutOpen)

  const startCheckout = () => {
    close()
    setCheckoutOpen(true)
  }

  const footer =
    items.length > 0 ? (
      <div className="px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium">Subtotal</span>
          <span className="text-base font-semibold">{formatCurrency(subtotal)}</span>
        </div>
        <Button fullWidth onClick={startCheckout}>
          Finalizar compra
        </Button>
        <p className="mb-0 mt-2 text-center text-[11px] text-muted">
          Frete e impostos calculados no checkout.
        </p>
      </div>
    ) : undefined

  return (
    <Drawer
      open={isOpen}
      onClose={close}
      variant="right"
      title={`Sacola${items.length ? ` (${items.length})` : ''}`}
      footer={footer}
    >
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
          <p className="m-0 text-sm font-medium">Sua sacola está vazia</p>
          <p className="m-0 text-sm text-muted">
            Explore a coleção e adicione suas peças favoritas.
          </p>
          <Button to="/loja" onClick={close}>
            Ver produtos
          </Button>
        </div>
      ) : (
        <>
          <FreeShippingBar subtotal={subtotal} threshold={FREE_SHIPPING_THRESHOLD} />

          <ul className="m-0 list-none px-5">
            {items.map((item) => (
              <CartItemRow key={item.key} item={item} />
            ))}
          </ul>
        </>
      )}
    </Drawer>
  )
}