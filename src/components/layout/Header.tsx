import { Heart, Menu, Search, ShoppingBag } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '@/data/categories'
import { useFavoritesStore, selectFavoriteCount } from '@/store/favoritesStore'
import { useCartStore, selectItemCount } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { useScrolledPast } from '@/hooks/useScrolledPast'
import { Logo } from '@/components/ui/Logo'
import { MegaMenu } from './MegaMenu'

/** Header fixo: 56px, branco, borda inferior de 1px que aparece ao rolar. */
export function Header() {
  const scrolled = useScrolledPast()
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const setSearchOpen = useUIStore((state) => state.setSearchOpen)
  const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen)
  const openCart = useCartStore((state) => state.open)

  const itemCount = useCartStore(selectItemCount)
  const favoriteCount = useFavoritesStore(selectFavoriteCount)

  const { pathname } = useLocation()
  const closeMenuTimeout = useRef<number | null>(null)
  const [lastPath, setLastPath] = useState(pathname)

  // Fecha o mega menu ao trocar de página (ajuste durante o render).
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpenMenu(null)
  }

  useEffect(
    () => () => {
      if (closeMenuTimeout.current) window.clearTimeout(closeMenuTimeout.current)
    },
    [],
  )

  const scheduleCloseMenu = () => {
    if (closeMenuTimeout.current) window.clearTimeout(closeMenuTimeout.current)
    closeMenuTimeout.current = window.setTimeout(() => setOpenMenu(null), 120)
  }

  const cancelCloseMenu = () => {
    if (closeMenuTimeout.current) window.clearTimeout(closeMenuTimeout.current)
    closeMenuTimeout.current = null
  }

  return (
    <header
      className={`sticky top-0 z-50 h-14 bg-paper ${
        scrolled ? 'border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <div className="shell flex h-full items-center justify-between gap-4">
        {/* Esquerda: logo + busca no mobile */}
        <div className="flex flex-1 items-center gap-2 lg:flex-none">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menu"
            aria-haspopup="dialog"
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface lg:hidden"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>

          <Logo size={22} />
        </div>

        {/* Centro: navegação */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="m-0 flex list-none items-center gap-7 p-0">
            {NAV_LINKS.map((link) =>
              link.mega ? (
                <li key={link.label}>
                  <MegaMenu
                    link={link}
                    open={openMenu === link.label}
                    onOpen={() => {
                      cancelCloseMenu()
                      setOpenMenu(link.label)
                    }}
                    onClose={() => {
                      cancelCloseMenu()
                      setOpenMenu(null)
                    }}
                  >
                    <NavLink
                      to={link.to}
                      onMouseEnter={() => {
                        cancelCloseMenu()
                        setOpenMenu(link.label)
                      }}
                      onMouseLeave={scheduleCloseMenu}
                      onFocus={() => setOpenMenu(link.label)}
                      className={({ isActive }) =>
                        `relative py-2 text-[16px] font-medium transition-colors hover:text-muted ${
                          isActive ? 'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-ink' : ''
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </MegaMenu>
                </li>
              ) : (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    onMouseEnter={scheduleCloseMenu}
                    onMouseLeave={scheduleCloseMenu}
                    className={({ isActive }) =>
                      `relative py-2 text-[16px] font-medium transition-colors hover:text-muted ${
                        isActive
                          ? 'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-ink'
                          : ''
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* Direita: busca, favoritos e sacola */}
        <div className="flex flex-1 items-center justify-end gap-0.5 lg:flex-none">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar produtos"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface"
          >
            <Search aria-hidden="true" className="h-5 w-5" />
          </button>

          <Link
            to="/favoritos"
            aria-label={`Favoritos (${favoriteCount} ${favoriteCount === 1 ? 'item' : 'itens'})`}
            className="relative hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface sm:inline-flex"
          >
            <Heart aria-hidden="true" className="h-5 w-5" />
            <Badge count={favoriteCount} />
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Abrir sacola (${itemCount} ${itemCount === 1 ? 'item' : 'itens'})`}
            aria-haspopup="dialog"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface"
          >
            <ShoppingBag aria-hidden="true" className="h-5 w-5" />
            <Badge count={itemCount} />
          </button>
        </div>
      </div>
    </header>
  )
}

function Badge({ count }: { count: number }) {
  if (count <= 0) return null
  return (
    <span
      aria-hidden="true"
      className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold leading-none text-paper"
    >
      {count > 99 ? '99+' : count}
    </span>
  )
}