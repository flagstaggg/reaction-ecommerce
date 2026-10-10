import { AnimatePresence, motion } from 'framer-motion'
import { Check, Info, X } from 'lucide-react'
import { useEffect } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useUIStore, type ToastTone } from '@/store/uiStore'

const TONE_STYLES: Record<ToastTone, string> = {
  default: 'bg-ink text-paper',
  success: 'bg-ink text-paper',
  error: 'bg-accent text-paper',
}

const TONE_ICONS: Record<ToastTone, typeof Info> = {
  default: Info,
  success: Check,
  error: X,
}

const DURATION = 3200

/** Aviso flutuante global (único na tela), disparado por `uiStore.showToast`. */
export function Toast() {
  const toast = useUIStore((state) => state.toast)
  const hideToast = useUIStore((state) => state.hideToast)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(hideToast, DURATION)
    return () => window.clearTimeout(timer)
  }, [toast, hideToast])

  const Icon = toast ? TONE_ICONS[toast.tone] : Info

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: reduced ? 0 : 0.18, ease: 'easeOut' }}
            className={`pointer-events-auto flex max-w-[92vw] items-center gap-3 rounded-full px-5 py-3 text-sm font-medium ${TONE_STYLES[toast.tone]}`}
          >
            <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span className="text-center">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}