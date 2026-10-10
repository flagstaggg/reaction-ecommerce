import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { SORT_OPTIONS } from '@/data/categories'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import type { SortOption } from '@/types'

interface SortDropdownProps {
  value: SortOption
  onChange: (value: SortOption) => void
  className?: string
}

/** Dropdown de ordenação com navegação por teclado (padrão listbox). */
export function SortDropdown({ value, onChange, className = '' }: SortDropdownProps) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listId = useId()

  const close = () => setOpen(false)
  useEscapeKey(open, () => {
    close()
    buttonRef.current?.focus()
  })

  const selectedIndex = SORT_OPTIONS.findIndex((option) => option.value === value)
  const [lastSelected, setLastSelected] = useState(selectedIndex)

  // Se o valor mudar externamente (ex.: link com ?ordem=), ajusta o índice ativo.
  if (lastSelected !== selectedIndex) {
    setLastSelected(selectedIndex)
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
  }

  /** Abre o menu já com a opção atual em foco. */
  const openMenu = () => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) close()
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  const select = (index: number) => {
    const option = SORT_OPTIONS[index]
    if (!option) return
    onChange(option.value)
    close()
    buttonRef.current?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!open) {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        openMenu()
      }
      return
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((index) => (index + 1) % SORT_OPTIONS.length)
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((index) => (index - 1 + SORT_OPTIONS.length) % SORT_OPTIONS.length)
        break
      case 'Home':
        event.preventDefault()
        setActiveIndex(0)
        break
      case 'End':
        event.preventDefault()
        setActiveIndex(SORT_OPTIONS.length - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        select(activeIndex)
        break
      default:
        break
    }
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className="inline-flex h-9 items-center gap-2 whitespace-nowrap text-sm text-ink transition-colors hover:text-muted"
      >
        <span className="text-muted">Ordenar por</span>
        <span className="font-medium">{SORT_OPTIONS[selectedIndex]?.label ?? 'Em destaque'}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Ordenar produtos"
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className="absolute right-0 top-full z-40 mt-2 min-w-[220px] border border-line bg-paper py-1"
        >
          {SORT_OPTIONS.map((option, index) => {
            const isSelected = option.value === value
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => select(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                    index === activeIndex ? 'bg-surface' : ''
                  }`}
                >
                  <span className={isSelected ? 'font-semibold' : ''}>{option.label}</span>
                  {isSelected && <Check aria-hidden="true" className="h-4 w-4" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}