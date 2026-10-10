import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface Crumb {
  label: string
  to?: string
}

interface BreadcrumbProps {
  items: Crumb[]
  className?: string
}

/** Trilha de navegação — "Página Inicial / Masculino / Em Oferta / Roupas". */
export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Você está em" className={className}>
      <ol className="m-0 flex list-none flex-wrap items-center gap-1 p-0 text-xs text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {item.to && !isLast ? (
                <Link to={item.to} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-ink' : ''}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight aria-hidden="true" className="h-3 w-3 shrink-0" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}