import { Link } from 'react-router-dom'

const LEFT_LABEL = 'Retire na loja em Criciúma'

const RIGHT_LINKS = [
  { label: 'Encontre uma loja', to: '/lojas', route: true },
  { label: 'Acompanhe seu pedido', to: '#', route: false },
  { label: 'Ajuda', to: '#', route: false },
  { label: 'Junte-se a nós', to: '#', route: false },
  { label: 'Entrar', to: '#', route: false },
]

/**
 * Barra utilitária no topo — fina, fundo `surface`, texto 12px.
 * Rolagem natural: some ao descer e deixa o header fixo assume o topo.
 */
export function UtilityBar() {
  return (
    <div className="hidden bg-surface text-[12px] text-ink lg:block">
      <div className="shell flex h-9 items-center justify-between">
        <p className="m-0">{LEFT_LABEL}</p>

        <ul className="flex items-center gap-5">
          {RIGHT_LINKS.map((link) => (
            <li key={link.label}>
              {link.route ? (
                <Link to={link.to} className="transition-colors hover:text-muted">
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.to}
                  onClick={(event) => event.preventDefault()}
                  className="cursor-default transition-colors hover:text-muted"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}