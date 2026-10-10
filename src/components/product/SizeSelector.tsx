import { Ruler } from 'lucide-react'
import { Chip } from '@/components/ui/Chip'
import type { ProductSize } from '@/types'

interface SizeSelectorProps {
  sizes: ProductSize[]
  value: string | null
  onChange: (label: string) => void
}

/** Chips de tamanho — os indisponíveis ficam riscados e desabilitados. */
export function SizeSelector({ sizes, value, onChange }: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="m-0 text-sm font-medium">Tamanho</p>
        <button
          type="button"
          onClick={(event) => event.preventDefault()}
          className="inline-flex items-center gap-1.5 text-xs text-muted underline underline-offset-2"
        >
          <Ruler aria-hidden="true" className="h-3.5 w-3.5" />
          Guia de medidas
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {sizes.map((size) => (
          <Chip
            key={size.label}
            selected={value === size.label}
            disabled={!size.available}
            onClick={() => onChange(size.label)}
            aria-label={
              size.available
                ? `Tamanho ${size.label}`
                : `Tamanho ${size.label} indisponível`
            }
          >
            {size.label}
          </Chip>
        ))}
      </div>
    </div>
  )
}