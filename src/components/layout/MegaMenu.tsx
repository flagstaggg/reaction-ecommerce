import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import type { NavLink as NavLinkType } from '@/types'

interface MegaMenuProps {
  link: NavLinkType
  /** Abre/fecha pelo hover no desktop. */
  open: boolean
  onOpen: () => void
  onClose: () => void
  /** Item do menu que abre este painel. */
  children: ReactNode
}

/** Mega menu de 4 colunas — abre no hover/foco de Masculino, Feminino e Infantil. */
export function MegaMenu({ link, open, onOpen, onClose, children }: MegaMenuProps) {
  const columns = link.mega ?? []
  const closeTimer = useRef<number | null>(null)
  const reduced = usePrefersReducedMotion()

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(onClose, 120)
  }

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = null
  }

  // Só limpa o timer ao desmontar. Fechar por navegação é responsabilidade
  // do Header (que já reseta `openMenu` quando o pathname muda) — um efeito
  // aqui rodaria a cada render, já que `onClose` é uma função nova.
  useEffect(() => () => cancelClose(), [])

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose()
        onOpen()
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => {
        cancelClose()
        onOpen()
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) onClose()
      }}
    >
      {/* Item do menu que dispara o painel. */}
      {children}

      {/* Âncora invisível mantém o painel aberto ao passar o mouse por cima. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mega"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.15, ease: 'easeOut' }}
            className="absolute left-1/2 top-full z-50 w-[min(960px,90vw)] -translate-x-1/2 pt-3"
          >
            <div className="border border-line bg-paper p-8">
              <div className="grid grid-cols-4 gap-6">
                {columns.map((column) => (
                  <div key={column.title}>
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-muted">
                      {column.title}
                    </p>
                    <ul className="m-0 list-none space-y-2.5 p-0">
                      {column.links.map((item) => (
                        <li key={`${column.title}-${item.label}`}>
                          <Link
                            to={item.to}
                            onClick={onClose}
                            className="text-[15px] text-ink transition-colors hover:text-muted"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}