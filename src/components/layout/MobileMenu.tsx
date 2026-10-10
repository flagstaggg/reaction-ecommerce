import { Link } from 'react-router-dom'
import { Drawer } from '@/components/ui/Drawer'
import { AccordionItem } from '@/components/ui/Accordion'
import { MOBILE_MENU_SECTIONS } from '@/data/categories'
import { useUIStore } from '@/store/uiStore'

const UTILITY_LINKS = [
  { label: 'Acompanhe seu pedido', to: '#' },
  { label: 'Ajuda', to: '#' },
  { label: 'Junte-se a nós', to: '#' },
  { label: 'Entrar', to: '#' },
]

/** Drawer lateral com os menus em acordeão (mobile). */
export function MobileMenu() {
  const open = useUIStore((state) => state.mobileMenuOpen)
  const setOpen = useUIStore((state) => state.setMobileMenuOpen)
  const close = () => setOpen(false)

  return (
    <Drawer open={open} onClose={close} variant="left" title="Menu">
      <nav aria-label="Menu mobile" className="px-5 py-2">
        {MOBILE_MENU_SECTIONS.map((section, index) => (
          <AccordionItem
            key={section.title}
            title={section.title}
            defaultOpen={index === 0}
            flush={index === 0}
          >
            <ul className="m-0 list-none space-y-3 p-0">
              {section.links.map((link) => (
                <li key={`${section.title}-${link.label}`}>
                  <Link
                    to={link.to}
                    onClick={close}
                    className="text-[15px] text-ink transition-colors hover:text-muted"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionItem>
        ))}

        <div className="border-t border-line py-5">
          <ul className="m-0 list-none space-y-3 p-0">
            <li>
              <Link to="/lojas" onClick={close} className="text-[15px] text-ink">
                Encontre uma loja
              </Link>
            </li>
            <li>
              <Link to="/favoritos" onClick={close} className="text-[15px] text-ink">
                Favoritos
              </Link>
            </li>
            {UTILITY_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.to}
                  onClick={(event) => {
                    event.preventDefault()
                    close()
                  }}
                  className="cursor-default text-[15px] text-muted"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </Drawer>
  )
}