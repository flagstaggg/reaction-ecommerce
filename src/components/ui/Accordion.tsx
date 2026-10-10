import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface AccordionItemProps {
  title: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  /** Oculta a divisória de 1px acima (útil em listas coladas). */
  flush?: boolean
}

export function AccordionItem({ title, children, defaultOpen = false, flush = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const buttonId = `${panelId}-button`
  const reduced = usePrefersReducedMotion()

  return (
    <div className={`border-b border-line ${flush ? 'border-b-0' : ''}`}>
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-ink"
        >
          <span className="flex-1">{title}</span>
          <Plus
            aria-hidden="true"
            className={`h-4 w-4 shrink-0 transition-transform duration-150 ${open ? 'rotate-45' : ''}`}
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.15, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface AccordionProps {
  children: ReactNode
  className?: string
}

/** Lista de `AccordionItem` com divisórias de 1px entre os itens. */
export function Accordion({ children, className = '' }: AccordionProps) {
  return <div className={className}>{children}</div>
}