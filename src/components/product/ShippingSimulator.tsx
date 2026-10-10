import { MapPin, Truck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { formatCurrency } from '@/lib/formatCurrency'

const CEP_PATTERN = /^(\d{5})(\d{3})$/
const DIGITS = 8

interface ShippingSimulatorProps {
  /** Preço do produto, usado para estimar o frete (valores fictícios). */
  price: number
}

/** Aplica a máscara 00000-000 no campo de CEP. */
function maskCep(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, DIGITS)
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
}

/**
 * Simulador de frete: CEP com máscara e prazo/valor fictícios.
 * Nenhum dado sai do navegador — é apenas para demonstrar a interface.
 */
export function ShippingSimulator({ price }: ShippingSimulatorProps) {
  const [cep, setCep] = useState('')
  const [submitted, setSubmitted] = useState<string | null>(null)

  const calculate = (value: string) => {
    const match = CEP_PATTERN.exec(value)
    if (!match) return null

    const region = Number(value.replace(/\D/g, '').slice(0, 1))
    const days = 3 + ((region * 2) % 6)
    // Frete fictício: de 14,90 a 39,90, grátis acima de R$ 299.
    const cost = price >= 299 ? 0 : 14.9 + ((region * 5) % 6) * 5

    return { cep: value, days, cost }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(CEP_PATTERN.test(cep) ? cep : null)
  }

  const result = submitted ? calculate(submitted) : null

  return (
    <section aria-labelledby="frete-titulo" className="border border-line p-5">
      <h2 id="frete-titulo" className="m-0 text-sm font-semibold">
        Calcule o frete
      </h2>

      <form onSubmit={onSubmit} noValidate className="mt-3">
        <label htmlFor="cep" className="mb-1.5 block text-xs text-muted">
          Digite seu CEP
        </label>
        <div className="flex gap-2">
          <input
            id="cep"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="00000-000"
            value={cep}
            onChange={(event) => {
              setCep(maskCep(event.target.value))
              setSubmitted(null)
            }}
            aria-describedby="cep-resultado"
            className="h-11 min-w-0 flex-1 border border-line px-3 text-sm outline-none transition-colors focus:border-ink"
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-full bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-[#333333]"
          >
            Calcular
          </button>
        </div>
      </form>

      <div id="cep-resultado" aria-live="polite" className="mt-4 text-sm">
        {result ? (
          <ul className="m-0 list-none space-y-2 p-0">
            <li className="flex items-center gap-2">
              <Truck aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span>
                Entrega em até <strong>{result.days} dias úteis</strong> —{' '}
                {result.cost === 0 ? (
                  <span className="font-semibold text-success">frete grátis</span>
                ) : (
                  formatCurrency(result.cost)
                )}
              </span>
            </li>
            <li className="flex items-center gap-2 text-muted">
              <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span>Retirar na loja em Criciúma: grátis</span>
            </li>
          </ul>
        ) : (
          <p className="m-0 text-xs text-muted">
            Simulação fictícia, apenas para demonstrar a interface. Nenhum dado é enviado.
          </p>
        )}
      </div>
    </section>
  )
}