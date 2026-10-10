import { useCallback, useSyncExternalStore } from 'react'

/**
 * `useMediaQuery('(min-width: 768px)')`.
 *
 * Usa `useSyncExternalStore` para ler a media query sem estado duplicado:
 * o valor é sempre o do navegador, sem `setState` dentro de efeito.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onStoreChange)
      return () => media.removeEventListener('change', onStoreChange)
    },
    [query],
  )

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])
  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** `true` em telas a partir de `lg` (1024px). */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)')
}