/**
 * Ícones de redes sociais desenhados à mão.
 * O Lucide v1 removeu os ícones de marca, então estes SVGs simples
 * mantêm o rodapé sem depender de biblioteca extra.
 */

interface IconProps {
  className?: string
}

export function InstagramIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M15.5 3h-2.2A3.8 3.8 0 0 0 9.5 6.8V9H7.5v3h2v9h3v-9h2.2l.6-3h-2.8V7.2A.8.8 0 0 1 13.3 6.4H15.5Z" />
    </svg>
  )
}

export function YouTubeIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="M10.5 9.3v5.4L15 12z" fill="currentColor" stroke="none" />
    </svg>
  )
}