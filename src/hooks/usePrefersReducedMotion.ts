import { useCallback, useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const subscribe = (onStoreChange: () => void) => {
  const media = window.matchMedia(QUERY)
  media.addEventListener('change', onStoreChange)
  return () => media.removeEventListener('change', onStoreChange)
}

const getSnapshot = () => window.matchMedia(QUERY).matches

/**
 * Respeita a preferência do sistema por menos movimento.
 * Usada para desligar autoplay de carrosséis e transições longas.
 */
export function usePrefersReducedMotion(): boolean {
  const getServerSnapshot = useCallback(() => false, [])
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}