import { useEffect, useState } from 'react'

/**
 * `true` quando a página já saiu do topo.
 * O estado inicial é lido na montagem e só muda por evento de scroll,
 * evitando `setState` dentro de efeito.
 */
export function useScrolledPast(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > threshold,
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}