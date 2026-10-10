import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { CheckoutDemoModal } from '@/components/cart/CheckoutDemoModal'
import { Toast } from '@/components/ui/Toast'
import { AnnouncementBar } from './AnnouncementBar'
import { Footer } from './Footer'
import { Header } from './Header'
import { MobileMenu } from './MobileMenu'
import { SearchOverlay } from './SearchOverlay'
import { UtilityBar } from './UtilityBar'

/** Volta ao topo a cada troca de rota (respeitando links com âncora). */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

interface LayoutProps {
  children: ReactNode
}

/** Casca global da loja: barras, header fixo, overlays, rodapé. */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <a
        href="#conteudo"
        className="sr-only-focusable absolute left-4 top-4 z-[80] rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper"
      >
        Pular para o conteúdo
      </a>

      <ScrollToTop />

      <UtilityBar />
      <Header />
      <AnnouncementBar />

      <main id="conteudo" className="flex-1">
        {children}
      </main>

      <Footer />

      <CartDrawer />
      <SearchOverlay />
      <MobileMenu />
      <CheckoutDemoModal />
      <Toast />
    </div>
  )
}