import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useUIStore } from '@/store/uiStore'

/** Checkout simulado — a loja é uma demonstração, sem back-end. */
export function CheckoutDemoModal() {
  const open = useUIStore((state) => state.checkoutOpen)
  const close = useUIStore((state) => state.setCheckoutOpen)

  return (
    <Modal
      open={open}
      onClose={() => close(false)}
      title="Checkout indisponível"
      footer={
        <>
          <Button variant="outline" onClick={() => close(false)}>
            Continuar comprando
          </Button>
          <Button onClick={() => close(false)}>Entendi</Button>
        </>
      }
    >
      <p className="mt-0 text-sm text-ink">
        Este é um site de demonstração. O checkout não está disponível.
      </p>
      <p className="mb-0 text-sm text-muted">
        Nenhum pagamento é processado e nenhum dado seu é enviado. Todo o site — inclusive o seu
        carrinho — roda apenas no seu navegador.
      </p>
    </Modal>
  )
}