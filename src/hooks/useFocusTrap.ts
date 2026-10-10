import { useEffect, useRef } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function isVisible(element: HTMLElement): boolean {
  return element.offsetParent !== null || element === document.activeElement
}

/**
 * Prende o foco dentro do container enquanto `active` for `true` e devolve
 * o foco ao elemento que abriu o overlay ao fechar.
 *
 * O elemento retornado precisa de `tabIndex={-1}` para ser focável quando
 * não há nada focável dentro dele.
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T | null>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return
    const container = ref.current
    if (!container) return

    restoreRef.current = document.activeElement as HTMLElement | null

    const focusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(isVisible)

    const [first] = focusables()
    ;(first ?? container).focus({ preventScroll: true })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const items = focusables()
      if (items.length === 0) {
        event.preventDefault()
        container.focus()
        return
      }

      const firstEl = items[0]
      const lastEl = items[items.length - 1]
      const activeEl = document.activeElement

      if (event.shiftKey && (activeEl === firstEl || activeEl === container)) {
        event.preventDefault()
        lastEl.focus()
      } else if (!event.shiftKey && activeEl === lastEl) {
        event.preventDefault()
        firstEl.focus()
      }
    }

    container.addEventListener('keydown', onKeyDown)
    return () => {
      container.removeEventListener('keydown', onKeyDown)
      restoreRef.current?.focus?.({ preventScroll: true })
    }
  }, [active])

  return ref
}