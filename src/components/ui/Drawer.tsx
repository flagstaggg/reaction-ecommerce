import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export type DrawerVariant = 'right' | 'left' | 'bottom'

interface DrawerProps {
  open: boolean
  onClose: () => void
  variant?: DrawerVariant
  title: string
  /** `sr-only` quando o drawer já tem um cabeçalho próprio. */
  hideTitle?: boolean
  children: ReactNode
  footer?: ReactNode
}

const PANEL: Record<DrawerVariant, string> = {
  right: 'inset-y-0 right-0 h-full w-full max-w-[420px]',
  left: 'inset-y-0 left-0 h-full w-full max-w-[360px]',
  bottom: 'inset-x-0 bottom-0 max-h-[88vh] w-full',
}

type MotionState = { x?: number | string; y?: number | string }

const MOTION: Record<
  DrawerVariant,
  { initial: MotionState; animate: MotionState; exit: MotionState }
> = {
  right: { initial: { x: '100%' }, animate: { x: 0, y: 0 }, exit: { x: '100%' } },
  left: { initial: { x: '-100%' }, animate: { x: 0, y: 0 }, exit: { x: '-100%' } },
  bottom: { initial: { y: '100%' }, animate: { x: 0, y: 0 }, exit: { y: '100%' } },
}

/**
 * Painel lateral (ou folha inferior no mobile) com scrim, foco preso,
 * fechamento por Esc e trava de scroll do body.
 */
export function Drawer({
  open,
  onClose,
  variant = 'right',
  title,
  hideTitle = false,
  children,
  footer,
}: DrawerProps) {
  const panelRef = useFocusTrap<HTMLDivElement>(open)
  const reduced = usePrefersReducedMotion()

  useLockBodyScroll(open)
  useEscapeKey(open, onClose)

  // Mantém os overlays menores acima dos maiores.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.zIndex
    document.body.style.zIndex = '10'
    return () => {
      document.body.style.zIndex = previous
    }
  }, [open])

  if (typeof document === 'undefined') return null

  const motionProps = MOTION[variant]

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <motion.button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={onClose}
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
            aria-label={title}
            tabIndex={-1}
            initial={reduced ? false : motionProps.initial}
            animate={motionProps.animate}
            exit={motionProps.exit}
            transition={{ duration: reduced ? 0 : 0.22, ease: [0.32, 0.72, 0, 1] }}
            className={`absolute flex flex-col bg-paper outline-none ${PANEL[variant]}`}
          >
            {hideTitle ? (
              <h2 className="sr-only">{title}</h2>
            ) : (
              <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
                <h2 className="m-0 text-sm font-semibold uppercase tracking-[0.08em]">{title}</h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fechar painel"
                  className="-mr-1 inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-surface"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>

            {footer && <div className="shrink-0 border-t border-line bg-paper">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}