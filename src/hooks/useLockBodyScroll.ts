import { useEffect } from 'react'

/**
 * Trava o scroll do body enquanto um overlay está aberto, compensando a
 * largura da barra de rolagem para o layout não "pular".
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`
    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [locked])
}