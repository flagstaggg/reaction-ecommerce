import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import type { Product } from '@/types'

const SHIPPING_COPY = [
  'Entrega padrão de 5 a 8 dias úteis para todo o Brasil.',
  'Frete grátis em compras acima de R$ 299, com envio para capitais.',
  'Retirada grátis na loja Reaction de Criciúma, em até 2 horas após a confirmação do pedido.',
  'Trocas e devoluções em até 30 dias corridos, desde que a peça esteja sem uso e com a etiqueta.',
  'A devolução deve ser feita pelo mesmo meio de envio do pedido — o custo é por nossa conta.',
]

interface ProductAccordionProps {
  product: Product
}

/** Acordeões de informações da página de produto. */
export function ProductAccordion({ product }: ProductAccordionProps) {
  return (
    <Accordion>
      <AccordionItem title="Descrição" defaultOpen>
        <p className="m-0 text-sm text-muted">{product.description}</p>
      </AccordionItem>

      <AccordionItem title="Detalhes do produto">
        <ul className="m-0 list-none space-y-2 p-0">
          {product.details.map((detail) => (
            <li key={detail} className="flex gap-2 text-sm text-muted">
              <span aria-hidden="true">—</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </AccordionItem>

      <AccordionItem title="Entrega e devoluções">
        <ul className="m-0 list-none space-y-2 p-0">
          {SHIPPING_COPY.map((line) => (
            <li key={line} className="flex gap-2 text-sm text-muted">
              <span aria-hidden="true">—</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </AccordionItem>
    </Accordion>
  )
}