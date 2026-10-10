import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  /** `true` para modais de confirmação pequenos e centralizados. */
  size?: 'sm' | 'md'
}

/** Diálogo modal com scrim, foco preso, Esc e trava de scroll. */
export function Modal({ open, onClose, title, children, footer, size = 'sm' }: ModalProps) {
  const panelRef = useFocusTrap<HTMLDivElement>(open)
  const reduced = usePrefersReducedMotion()

  useLockBodyScroll(open)
  useEscapeKey(open, onClose)

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[65] flex items-center justify-center p-4">
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
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: reduced ? 0 : 0.18, ease: 'easeOut' }}
            className={`relative flex max-h-[90vh] w-full flex-col bg-paper outline-none ${
              size === 'sm' ? 'max-w-[440px]' : 'max-w-[640px]'
            }`}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 px-6 pb-4 pt-6">
              <h2 className="m-0 text-lg font-semibold">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="-mr-2 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-surface"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">{children}</div>

            {footer && (
              <div className="flex shrink-0 flex-col gap-2 border-t border-line px-6 py-4 sm:flex-row sm:justify-end">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}