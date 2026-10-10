import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

/* Todas as páginas entram sob demanda (code splitting por rota). */
const Home = lazy(() => import('@/pages/Home'))
const Catalog = lazy(() => import('@/pages/Catalog'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Favorites = lazy(() => import('@/pages/Favorites'))
const Stores = lazy(() => import('@/pages/Stores'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] items-center justify-center px-4"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Carregando…</span>
    </div>
  )
}

export function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Listagem reutilizada, filtrada pelos parâmetros da rota. */}
          <Route path="/loja" element={<Catalog />} />
          <Route path="/ofertas" element={<Catalog />} />
          <Route path="/lancamentos" element={<Catalog />} />
          <Route path="/masculino" element={<Catalog />} />
          <Route path="/masculino/:category" element={<Catalog />} />
          <Route path="/feminino" element={<Catalog />} />
          <Route path="/feminino/:category" element={<Catalog />} />
          <Route path="/infantil" element={<Catalog />} />
          <Route path="/infantil/:category" element={<Catalog />} />
          <Route path="/acessorios" element={<Catalog />} />
          <Route path="/acessorios/:category" element={<Catalog />} />

          <Route path="/produto/:slug" element={<ProductDetail />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/lojas" element={<Stores />} />

          {/* Atalhos legados do topo do site. */}
          <Route path="/carrinho" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}