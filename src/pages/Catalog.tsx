import { Share2, SlidersHorizontal } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumb, type Crumb } from '@/components/catalog/Breadcrumb'
import { FilterDrawer } from '@/components/catalog/FilterDrawer'
import { FilterSidebar } from '@/components/catalog/FilterSidebar'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { SortDropdown } from '@/components/catalog/SortDropdown'
import { Button } from '@/components/ui/Button'
import {
  CATALOG_ROUTES,
  CATEGORY_ORDER,
  EMPTY_FILTERS,
  slugify,
} from '@/data/categories'
import { PRODUCTS } from '@/data/products'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import { useSeo } from '@/hooks/useSeo'
import {
  categorySlug,
  countActiveFilters,
  filterProducts,
  filtersToSearch,
  parseFilters,
  searchProducts,
  sortProducts,
} from '@/lib/filters'
import { useUIStore } from '@/store/uiStore'
import type { FilterState } from '@/types'

const PAGE_SIZE = 12

const GENDER_LABEL: Record<string, string> = {
  masculino: 'masculino',
  feminino: 'feminino',
  infantil: 'infantil',
}

const CATEGORY_LABEL = new Map(CATEGORY_ORDER.map((label) => [slugify(label), label]))

export default function Catalog() {
  const { pathname } = useLocation()
  const { category: categoryParam } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const isDesktop = useIsDesktop()
  const showToast = useUIStore((state) => state.showToast)
  const { copy } = useCopyToClipboard()

  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [visible, setVisible] = useState(PAGE_SIZE)

  /* --------------------------- Escopo da rota --------------------------- */

  const routeKey = pathname.split('/')[1] ?? 'loja'
  const routeConfig = CATALOG_ROUTES[routeKey] ?? CATALOG_ROUTES.loja
  const gender = routeConfig.gender

  const categoryLabel = categoryParam ? CATEGORY_LABEL.get(categoryParam) : undefined

  const filters = useMemo(() => parseFilters(searchParams), [searchParams])
  const searchTerm = searchParams.get('busca') ?? ''

  const updateFilters = useCallback(
    (next: FilterState) => {
      setSearchParams(filtersToSearch(next, new URLSearchParams(searchParams)), {
        replace: true,
      })
    },
    [searchParams, setSearchParams],
  )

  const resetFilters = () => updateFilters({ ...EMPTY_FILTERS })

  /* ------------------------------ Resultados ---------------------------- */

  const results = useMemo(() => {
    const scoped = filterProducts(PRODUCTS, filters, {
      gender,
      onlyOffers: routeKey === 'ofertas',
      onlyNew: routeKey === 'lancamentos',
    })

    // O segmento da rota (`/masculino/tenis`) já define a categoria.
    const byRouteCategory = categoryParam
      ? scoped.filter((product) => categorySlug(product) === categoryParam)
      : scoped

    const searched = searchTerm ? searchProducts(byRouteCategory, searchTerm) : byRouteCategory

    return sortProducts(searched, filters.sort)
  }, [categoryParam, filters, gender, routeKey, searchTerm])

  // Reseta a paginação quando qualquer filtro muda (ajuste durante o render).
  const filterKey = `${pathname}?${searchParams.toString()}`
  const [lastFilterKey, setLastFilterKey] = useState(filterKey)
  if (lastFilterKey !== filterKey) {
    setLastFilterKey(filterKey)
    setVisible(PAGE_SIZE)
    setDrawerOpen(false)
  }

  const visibleProducts = results.slice(0, visible)

  /* --------------------------------- SEO -------------------------------- */

  const title = buildTitle({ routeKey, genderLabel: gender ? GENDER_LABEL[gender] : undefined, categoryLabel })
  useSeo(
    title,
    `Compre ${title.toLowerCase()} na Reaction. Moda esportiva e streetwear em Criciúma, Santa Catarina. Loja de demonstração.`,
  )

  /* ------------------------------ Ações --------------------------------- */

  const onShare = async () => {
    const ok = await copy(window.location.href)
    showToast(ok ? 'Link copiado para a área de transferência.' : 'Não foi possível copiar o link.')
  }

  const activeCount = countActiveFilters(filters)
  const withSidebar = sidebarVisible && isDesktop
  const breadcrumb = buildBreadcrumb({
    routeKey,
    genderLabel: gender ? GENDER_LABEL[gender] : undefined,
    gender,
    categoryLabel,
  })

  return (
    <div className="shell py-6 md:py-8">
      <Breadcrumb items={breadcrumb} className="mb-4" />

      <div className="flex flex-col gap-4 border-b border-line pb-5 md:flex-row md:items-end md:justify-between">
        <h1 className="m-0 text-xl font-normal leading-tight md:text-[28px]">
          {title} <span className="text-muted">({results.length})</span>
        </h1>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <button
            type="button"
            onClick={onShare}
            className="inline-flex h-9 items-center gap-2 text-sm text-ink transition-colors hover:text-muted"
          >
            <Share2 aria-hidden="true" className="h-4 w-4" />
            Compartilhar
          </button>

          <button
            type="button"
            onClick={() => (isDesktop ? setSidebarVisible((value) => !value) : setDrawerOpen(true))}
            aria-expanded={isDesktop ? sidebarVisible : drawerOpen}
            className="inline-flex h-9 items-center gap-2 text-sm text-ink transition-colors hover:text-muted"
          >
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
            Filtros
            {activeCount > 0 && <span className="text-muted">({activeCount})</span>}
          </button>

          <SortDropdown
            value={filters.sort}
            onChange={(sort) => updateFilters({ ...filters, sort })}
          />
        </div>
      </div>

      <div className="flex gap-8 pt-6 lg:gap-10">
        {withSidebar && (
          <aside
            aria-label="Filtros"
            className="hidden w-[260px] shrink-0 lg:block"
          >
            <div className="sticky top-[72px] max-h-[calc(100vh-96px)] overflow-y-auto scroll-thin pr-2">
              <FilterSidebar filters={filters} onChange={updateFilters} />
            </div>
          </aside>
        )}

        <div className="min-w-0 flex-1">
          {results.length === 0 ? (
            <EmptyState onClear={resetFilters} hasFilters={activeCount > 0} />
          ) : (
            <>
              <ProductGrid products={visibleProducts} columns={withSidebar ? 3 : 4} />

              {visible < results.length && (
                <div className="mt-10 flex flex-col items-center gap-2">
                  <Button variant="outline" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
                    Carregar mais
                  </Button>
                  <p className="m-0 text-xs text-muted">
                    {visible} de {results.length} produtos
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {!isDesktop && (
        <FilterDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          filters={filters}
          onChange={updateFilters}
          resultCount={results.length}
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Títulos e trilha                                                    */
/* ------------------------------------------------------------------ */

interface BuildTitleArgs {
  routeKey: string
  genderLabel?: string
  categoryLabel?: string
}

function buildTitle({ routeKey, genderLabel, categoryLabel }: BuildTitleArgs): string {
  if (categoryLabel) {
    return genderLabel ? `${categoryLabel} ${genderLabel}` : categoryLabel
  }

  const defaults: Record<string, string> = {
    loja: 'Todos os produtos',
    ofertas: 'Ofertas',
    lancamentos: 'Lançamentos',
    acessorios: 'Acessórios',
  }

  const base = defaults[routeKey] ?? 'Produtos'

  // Rotas por gênero (`/masculino`) têm o próprio nome como título.
  if (base === 'Produtos') return capitalize(genderLabel ?? base)

  return genderLabel ? `${base} ${genderLabel}` : base
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

interface BuildBreadcrumbArgs {
  routeKey: string
  gender?: string | null
  genderLabel?: string
  categoryLabel?: string
}

function buildBreadcrumb({
  routeKey,
  gender,
  genderLabel,
  categoryLabel,
}: BuildBreadcrumbArgs): Crumb[] {
  const crumbs: Crumb[] = [{ label: 'Página Inicial', to: '/' }]

  if (gender && genderLabel) {
    crumbs.push({ label: capitalize(genderLabel), to: `/${routeKey}` })
  }

  if (routeKey === 'ofertas') {
    crumbs.push({ label: 'Em Oferta', to: '/ofertas' })
  }

  if (routeKey === 'lancamentos') {
    crumbs.push({ label: 'Lançamentos', to: '/lancamentos' })
  }

  if (categoryLabel) {
    crumbs.push({ label: categoryLabel })
  }

  return crumbs
}

interface EmptyStateProps {
  onClear: () => void
  hasFilters: boolean
}

function EmptyState({ onClear, hasFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-5 border border-line px-6 py-16 md:items-center md:text-center">
      <div>
        <h2 className="m-0 text-lg font-semibold">Nenhum produto encontrado</h2>
        <p className="mb-0 mt-2 max-w-sm text-sm text-muted">
          {hasFilters
            ? 'Nenhum item atende a essa combinação de filtros. Tente remover alguns.'
            : 'Esta categoria está sem produtos no momento. Veja a loja completa.'}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {hasFilters && (
          <Button onClick={onClear}>Limpar filtros</Button>
        )}
        <Link
          to="/loja"
          className="inline-flex h-11 items-center justify-center rounded-full border border-ink px-6 text-[15px] font-medium transition-colors hover:bg-ink hover:text-paper"
        >
          Ver todos os produtos
        </Link>
      </div>
    </div>
  )
}