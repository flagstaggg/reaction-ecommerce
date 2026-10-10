import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Search, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { PRODUCTS } from '@/data/products'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { formatCurrency } from '@/lib/formatCurrency'
import { popularSearches, searchProducts } from '@/lib/filters'
import { useUIStore } from '@/store/uiStore'

const MAX_RESULTS = 6

/** Busca em tela cheia: campo, sugestões e resultados em tempo real. */
export function SearchOverlay() {
  const open = useUIStore((state) => state.searchOpen)
  const setOpen = useUIStore((state) => state.setSearchOpen)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useFocusTrap<HTMLDivElement>(open)
  const reduced = usePrefersReducedMotion()

  useLockBodyScroll(open)

  const close = useCallback(() => {
    setQuery('')
    setOpen(false)
  }, [setOpen])

  useEscapeKey(open, close)

  // Foca o campo assim que o painel monta.
  useEffect(() => {
    if (!open) return
    const raf = window.requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }))
    return () => window.cancelAnimationFrame(raf)
  }, [open])

  const results = useMemo(() => searchProducts(PRODUCTS, query, MAX_RESULTS), [query])
  const hasQuery = query.trim().length > 0

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[62]">
          <motion.button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => close()}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.15 }}
            className="absolute inset-0 cursor-default bg-ink/40"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Buscar produtos"
            tabIndex={-1}
            initial={reduced ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reduced ? 0 : 0.18, ease: 'easeOut' }}
            className="relative flex max-h-[88vh] flex-col overflow-hidden bg-paper outline-none"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-4 md:px-10">
              <Search aria-hidden="true" className="h-5 w-5 shrink-0" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="O que você procura?"
                aria-label="Buscar produtos"
                className="h-10 flex-1 bg-transparent text-lg outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={() => close()}
                aria-label="Fechar busca"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-surface"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-5 md:px-10">
              {!hasQuery ? (
                <div>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-muted">
                    Buscas frequentes
                  </p>
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {popularSearches().map((term) => (
                      <li key={term}>
                        <button
                          type="button"
                          onClick={() => setQuery(term)}
                          className="h-9 rounded-full border border-ink px-4 text-sm font-medium transition-colors hover:bg-surface"
                        >
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : results.length === 0 ? (
                <p className="text-sm text-muted">
                  Nenhum resultado para <span className="text-ink">“{query}”</span>. Tente outro termo.
                </p>
              ) : (
                <div>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-muted">
                    Resultados
                  </p>
                  <ul className="m-0 list-none space-y-4 p-0">
                    {results.map((product) => (
                      <li key={product.id}>
                        <Link
                          to={`/produto/${product.slug}`}
                          onClick={() => close()}
                          className="flex items-center gap-4 transition-opacity hover:opacity-70"
                        >
                          <ImageWithFallback
                            src={product.images[0]}
                            alt={product.name}
                            ratio="1 / 1"
                            className="w-16 shrink-0"
                            fallbackLabel={product.name}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium">{product.name}</span>
                            <span className="block text-xs text-muted">{product.category}</span>
                          </span>
                          <span className="shrink-0 text-sm font-semibold">
                            {formatCurrency(product.price)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/loja?busca=${encodeURIComponent(query.trim())}`}
                    onClick={() => close()}
                    className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-[#333333]"
                  >
                    Ver todos os resultados
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}