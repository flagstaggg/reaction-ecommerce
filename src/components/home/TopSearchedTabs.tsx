import { useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { ProductCard } from '@/components/catalog/ProductCard'
import { discountPercent } from '@/lib/formatCurrency'
import { slugify } from '@/data/categories'
import { PRODUCTS, TOP_SEARCHED_TABS } from '@/data/products'
import type { Product } from '@/types'

const PER_TAB = 4

/** "Produtos mais buscados" — abas em texto que trocam um grid de 4 cards. */
export function TopSearchedTabs() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTab = TOP_SEARCHED_TABS[activeIndex]
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  /** Navegação por setas conforme o padrão WAI-ARIA de tablist. */
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = TOP_SEARCHED_TABS.length - 1
    let next: number | null = null

    switch (event.key) {
      case 'ArrowRight':
        next = activeIndex === last ? 0 : activeIndex + 1
        break
      case 'ArrowLeft':
        next = activeIndex === 0 ? last : activeIndex - 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = last
        break
      default:
        return
    }

    event.preventDefault()
    setActiveIndex(next)
    tabRefs.current[next]?.focus()
  }

  const products = useMemo<Product[]>(() => {
    const tab = TOP_SEARCHED_TABS[activeIndex]

    const matched = PRODUCTS.filter((product) => {
      if (tab.onlyOffers) return discountPercent(product.price, product.oldPrice) > 0
      if (!tab.categories) return true
      return tab.categories.includes(slugify(product.category))
    })

    return matched.slice(0, PER_TAB)
  }, [activeIndex])

  return (
    <section aria-labelledby="mais-buscados-titulo" className="shell py-12 md:py-16">
      <h2 id="mais-buscados-titulo" className="mb-4 text-2xl font-normal md:text-[28px]">
        Produtos mais buscados
      </h2>

      <div
        role="tablist"
        aria-label="Categorias mais buscadas"
        onKeyDown={onKeyDown}
        className="-mx-4 flex gap-1 overflow-x-auto scroll-thin px-4 md:mx-0 md:px-0"
      >
        {TOP_SEARCHED_TABS.map((tab, index) => (
          <button
            key={tab.label}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            type="button"
            role="tab"
            tabIndex={index === activeIndex ? 0 : -1}
            id={`tab-${slugify(tab.label)}`}
            aria-selected={index === activeIndex}
            aria-controls="painel-mais-buscados"
            onClick={() => setActiveIndex(index)}
            className={`relative shrink-0 whitespace-nowrap px-3 py-3 text-[15px] transition-colors ${
              index === activeIndex ? 'font-medium text-ink' : 'text-muted hover:text-ink'
            }`}
          >
            {tab.label}
            {index === activeIndex && (
              <span
                aria-hidden="true"
                className="absolute inset-x-3 bottom-0 h-px bg-ink"
              />
            )}
          </button>
        ))}
      </div>

      <div
        id="painel-mais-buscados"
        role="tabpanel"
        aria-labelledby={`tab-${slugify(activeTab.label)}`}
        tabIndex={0}
        className="pt-6 outline-none"
      >
        {products.length === 0 ? (
          <p className="m-0 text-sm text-muted">Nenhum produto nesta categoria no momento.</p>
        ) : (
          <ul className="m-0 grid list-none gap-cards p-0 grid-cols-2 md:grid-cols-4">
            {products.map((product) => (
              <li key={product.id} className="min-w-0">
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}