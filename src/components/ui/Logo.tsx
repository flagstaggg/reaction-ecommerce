import { Link } from 'react-router-dom'

interface LogoProps {
  /** Tamanho em px da altura da caixa do wordmark. */
  size?: number
  /** `light` usa papel sobre fundo escuro. */
  tone?: 'dark' | 'light'
  className?: string
}

/**
 * Wordmark REACTION — Barlow Condensed 800, caixa alta, tracking amplo.
 * Feito só com texto/SVG, sem imagem externa.
 */
export function Logo({ size = 26, tone = 'dark', className = '' }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Reaction — página inicial"
      className={`inline-flex items-center leading-none ${tone === 'light' ? 'text-paper' : 'text-ink'} ${className}`}
    >
      <span
        className="font-display uppercase"
        style={{ fontSize: size, letterSpacing: '0.16em', lineHeight: 0.9 }}
      >
        Reaction
      </span>
    </Link>
  )
}

/** Versão sem link, para barra de avisos e rodapé. */
export function Wordmark({
  size = 26,
  tone = 'dark',
  className = '',
}: Omit<LogoProps, 'size'> & { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className={`font-display uppercase ${tone === 'light' ? 'text-paper' : 'text-ink'} ${className}`}
      style={{ fontSize: size, letterSpacing: '0.16em', lineHeight: 0.9 }}
    >
      Reaction
    </span>
  )
}