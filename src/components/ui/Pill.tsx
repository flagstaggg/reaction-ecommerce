import type { ReactNode } from 'react'

type Tone = 'paper' | 'ink' | 'success' | 'accent' | 'outline'

const TONES: Record<Tone, string> = {
  paper: 'bg-paper text-ink',
  ink: 'bg-ink text-paper',
  success: 'bg-success text-paper',
  accent: 'bg-accent text-paper',
  outline: 'bg-transparent text-ink border border-ink',
}

interface PillProps {
  children: ReactNode
  tone?: Tone
  className?: string
}

/**
 * Etiqueta arredondada. É a única peça da loja que usa
 * `rounded-full` junto com botões e chips.
 */
export function Pill({ children, tone = 'paper', className = '' }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  )
}