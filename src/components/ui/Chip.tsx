import type { ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
  selected?: boolean
  /** Quando `true`, o chip aparece riscado e não recebe clique. */
  disabled?: boolean
  onClick?: () => void
  /** `checkbox` permite desmarcar clicando de novo; `radio` mantém sempre uma seleção. */
  type?: 'checkbox' | 'radio'
  className?: string
  'aria-label'?: string
}

/**
 * Chip de filtro. Estado selecionado = fundo ink; indisponível = riscado
 * e desabilitado (usado nos tamanhos de roupa).
 */
export function Chip({
  children,
  selected = false,
  disabled = false,
  onClick,
  type = 'checkbox',
  className = '',
  ...rest
}: ChipProps) {
  const stateClasses = disabled
    ? 'border-line text-muted line-through cursor-not-allowed'
    : selected
      ? 'border-ink bg-ink text-paper'
      : 'border-ink text-ink hover:bg-surface'

  const role = type === 'radio' ? 'radio' : 'checkbox'

  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      aria-label={rest['aria-label']}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-line px-3 text-sm font-medium transition-colors duration-150 ${stateClasses} ${className}`}
    >
      {children}
    </button>
  )
}