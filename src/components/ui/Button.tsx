import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

export type ButtonVariant = 'primary' | 'onPhoto' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANTS: Record<ButtonVariant, string> = {
  // Sobre foto: fundo branco, texto preto.
  onPhoto: 'bg-paper text-ink hover:bg-surface',
  // Sobre fundo claro: fundo ink, texto branco.
  primary: 'bg-ink text-paper hover:bg-[#333333]',
  // Secundário: borda de 1px em ink, fundo transparente.
  outline: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-12 px-8 text-base',
}

interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

type AsButton = CommonProps & { to?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>
type AsLink = CommonProps & { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

function classes({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}: Pick<CommonProps, 'variant' | 'size' | 'fullWidth' | 'className'>): string {
  return [
    'inline-flex items-center justify-center gap-2 rounded-full font-medium',
    'transition-colors duration-150 ease-out select-none',
    'disabled:cursor-not-allowed disabled:opacity-40',
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

/**
 * Botão da loja. Renderiza um `<button>` ou, quando recebe `to`,
 * um `<Link>` do React Router — mantendo o mesmo visual.
 */
export function Button(props: AsButton | AsLink) {
  const { variant, size, fullWidth, className, children, to, ...rest } = props as CommonProps & {
    to?: string
  } & Record<string, unknown>

  const style = classes({ variant, size, fullWidth, className })

  if (typeof to === 'string') {
    return (
      <Link to={to} className={style} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={style} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}