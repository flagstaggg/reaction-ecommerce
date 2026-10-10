import { X } from 'lucide-react'
import { useState } from 'react'
import { Accordion, AccordionItem } from '@/components/ui/Accordion'
import { Chip } from '@/components/ui/Chip'
import {
  CATEGORY_ORDER,
  COLLECTION_OPTIONS,
  EMPTY_FILTERS,
  GENDER_OPTIONS,
  PRICE_BOUNDS,
  SIZE_OPTIONS,
  STYLE_OPTIONS,
} from '@/data/categories'
import { ALL_COLORS } from '@/data/products'
import { countActiveFilters, slugify, toggleInList } from '@/lib/filters'
import type { FilterState, Gender, ProductStyle } from '@/types'

interface FilterSidebarProps {
  filters: FilterState
  onChange: (next: FilterState) => void
  /** `drawer` omite o título (o drawer mobile já tem o seu). */
  variant?: 'panel' | 'drawer'
  className?: string
}

const STEP = 10

function parsePrice(value: string): number | null {
  const digits = value.replace(/\D/g, '')
  if (!digits) return null
  return Math.min(PRICE_BOUNDS.max, Math.round(Number(digits) / STEP) * STEP)
}

/**
 * Sidebar de filtros (~260px, rolagem própria fina).
 * Todos os filtros funcionam sobre os dados mock e ficam na URL.
 */
export function FilterSidebar({
  filters,
  onChange,
  variant = 'panel',
  className = '',
}: FilterSidebarProps) {
  const activeCount = countActiveFilters(filters)

  // Campos de preço em texto — só vão para a URL ao confirmar/blur.
const [minText, setMinText] = useState(filters.minPrice !== null ? String(filters.minPrice) : '')
  const [maxText, setMaxText] = useState(filters.maxPrice !== null ? String(filters.maxPrice) : '')
  const [lastRange, setLastRange] = useState(`${filters.minPrice}-${filters.maxPrice}`)

  // Reflete mudanças externas (link, botão "limpar filtros").
  const rangeKey = `${filters.minPrice}-${filters.maxPrice}`
  if (lastRange !== rangeKey) {
    setLastRange(rangeKey)
    setMinText(filters.minPrice !== null ? String(filters.minPrice) : '')
    setMaxText(filters.maxPrice !== null ? String(filters.maxPrice) : '')
  }

  const update = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch })

  const commitPrice = () => {
    const min = parsePrice(minText)
    const max = parsePrice(maxText)
    update({
      minPrice: min !== null && min < PRICE_BOUNDS.max ? min : null,
      maxPrice: max !== null && max > PRICE_BOUNDS.min ? max : null,
    })
  }

  const clearAll = () => onChange({ ...EMPTY_FILTERS, sort: filters.sort })

  return (
    <div className={className}>
      <div
        className={`mb-4 flex items-center justify-between gap-3 ${
          variant === 'drawer' ? 'justify-end pt-1' : ''
        }`}
      >
        {variant === 'panel' && (
          <h2 className="m-0 text-sm font-semibold">
            Filtros
            {activeCount > 0 && <span className="ml-1 font-normal text-muted">({activeCount})</span>}
          </h2>
        )}

        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-xs text-muted underline underline-offset-2 transition-colors hover:text-ink"
          >
            <X aria-hidden="true" className="h-3 w-3" />
            Limpar filtros
          </button>
        )}
      </div>

      <Accordion>
        <AccordionItem title="Gênero">
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {GENDER_OPTIONS.map((option) => (
              <li key={option.value}>
                <FilterCheckbox
                  label={option.label}
                  checked={filters.genders.includes(option.value)}
                  onChange={() =>
                    update({ genders: toggleInList(filters.genders, option.value) as Gender[] })
                  }
                />
              </li>
            ))}
          </ul>
        </AccordionItem>

        <AccordionItem title="Tipo de produto" defaultOpen>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {CATEGORY_ORDER.map((category) => {
              const slug = slugify(category)
              return (
                <li key={category}>
                  <FilterCheckbox
                    label={category}
                    checked={filters.categories.includes(slug)}
                    onChange={() => update({ categories: toggleInList(filters.categories, slug) })}
                  />
                </li>
              )
            })}
          </ul>
        </AccordionItem>

        <AccordionItem title="Tamanho">
          <div className="flex flex-wrap gap-2">
            {SIZE_OPTIONS.map((size) => (
              <Chip
                key={size}
                selected={filters.sizes.includes(size)}
                onClick={() => update({ sizes: toggleInList(filters.sizes, size) })}
              >
                {size}
              </Chip>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem title="Preço">
          <div className="flex items-center gap-2">
            <PriceField
              id="filtro-preco-min"
              label="Preço mínimo"
              value={minText}
              placeholder={String(PRICE_BOUNDS.min)}
              onChange={setMinText}
              onCommit={commitPrice}
            />
            <span aria-hidden="true" className="mt-5 text-muted">
              —
            </span>
            <PriceField
              id="filtro-preco-max"
              label="Preço máximo"
              value={maxText}
              placeholder={String(PRICE_BOUNDS.max)}
              onChange={setMaxText}
              onCommit={commitPrice}
            />
          </div>
          <p className="mb-0 mt-3 text-[11px] text-muted">
            Valores por item, já com o desconto do Pix.
          </p>
        </AccordionItem>

        <AccordionItem title="Cores">
          <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
            {ALL_COLORS.map((color) => {
              const selected = filters.colors.includes(color.name)
              return (
                <li key={color.name}>
                  <button
                    type="button"
                    onClick={() => update({ colors: toggleInList(filters.colors, color.name) })}
                    aria-pressed={selected}
                    aria-label={color.name}
                    title={color.name}
                    className={`h-7 w-7 rounded-full border transition-shadow ${
                      selected ? 'border-ink ring-2 ring-ink ring-offset-2' : 'border-line'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                </li>
              )
            })}
          </ul>
        </AccordionItem>

        <AccordionItem title="Estilo">
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {STYLE_OPTIONS.map((option) => (
              <li key={option.value}>
                <FilterCheckbox
                  label={option.label}
                  checked={filters.styles.includes(option.value)}
                  onChange={() =>
                    update({
                      styles: toggleInList(filters.styles, option.value) as ProductStyle[],
                    })
                  }
                />
              </li>
            ))}
          </ul>
        </AccordionItem>

        <AccordionItem title="Coleções">
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {COLLECTION_OPTIONS.map((collection) => (
              <li key={collection}>
                <FilterCheckbox
                  label={collection}
                  checked={filters.collections.includes(collection)}
                  onChange={() =>
                    update({ collections: toggleInList(filters.collections, collection) })
                  }
                />
              </li>
            ))}
          </ul>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

interface FilterCheckboxProps {
  label: string
  checked: boolean
  onChange: () => void
}

function FilterCheckbox({ label, checked, onChange }: FilterCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 cursor-pointer appearance-none border border-line bg-paper transition-colors checked:border-ink checked:bg-ink"
        style={
          checked
            ? {
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3.5 8.5l3 3 6-6'/%3E%3C/svg%3E\")",
                backgroundSize: '100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }
            : undefined
        }
      />
      <span>{label}</span>
    </label>
  )
}

interface PriceFieldProps {
  id: string
  label: string
  value: string
  placeholder: string
  onChange: (value: string) => void
  onCommit: () => void
}

function PriceField({ id, label, value, placeholder, onChange, onCommit }: PriceFieldProps) {
  return (
    <div className="min-w-0 flex-1">
      <label htmlFor={id} className="mb-1 block text-[11px] text-muted">
        {label}
      </label>
      <div className="flex h-9 items-center gap-1 border border-line px-2 focus-within:border-ink">
        <span aria-hidden="true" className="text-xs text-muted">
          R$
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onCommit}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              onCommit()
            }
          }}
          className="w-full min-w-0 bg-transparent text-sm outline-none"
        />
      </div>
    </div>
  )
}