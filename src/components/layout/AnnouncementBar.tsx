import { BadgePercent, ChevronLeft, ChevronRight, Sparkles, Store, Truck } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ANNOUNCEMENTS } from '@/data/categories'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import type { Announcement } from '@/types'

const AUTOPLAY_MS = 5000

const ICONS: Record<Announcement['icon'], typeof Truck> = {
  Truck,
  BadgePercent,
  Store,
  Sparkles,
}

/**
 * Barra de avisos em carrossel — abaixo do header, fundo `surface` (~48px).
 * Troca automática a cada 5s, setas nas laterais, pausa com prefers-reduced-motion.
 */
export function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  const reduced = usePrefersReducedMotion()

  const go = useCallback((delta: number) => {
    setIndex((current) => (current + delta + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)
  }, [])

  useEffect(() => {
    if (reduced) return
    const timer = window.setInterval(() => go(1), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [go, reduced])

  const current = ANNOUNCEMENTS[index]
  const Icon = ICONS[current.icon]

  return (
    <div
      className="relative bg-surface"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Avisos da loja"
    >
      <div className="shell relative flex h-12 items-center justify-center">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Aviso anterior"
          className="absolute left-0 hidden h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper sm:inline-flex"
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
        </button>

        <p className="m-0 flex flex-wrap items-center justify-center gap-x-2 gap-y-0 text-center text-[13px]">
          <Icon aria-hidden="true" className="hidden h-4 w-4 shrink-0 sm:block" />
          <span className="font-bold uppercase">{current.title}</span>
          <span className="text-ink/80">{current.text}</span>
          <Link to={current.to} className="underline underline-offset-2 hover:text-muted">
            {current.linkLabel}
          </Link>
        </p>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Próximo aviso"
          className="absolute right-0 hidden h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper sm:inline-flex"
        >
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      {/* Dots — só no mobile, onde não há setas. */}
      <div className="flex items-center justify-center gap-1.5 pb-2 sm:hidden">
        {ANNOUNCEMENTS.map((announcement, dotIndex) => (
          <button
            key={announcement.title}
            type="button"
            onClick={() => setIndex(dotIndex)}
            aria-label={`Ver aviso: ${announcement.title}`}
            aria-current={dotIndex === index}
            className={`h-1.5 rounded-full transition-all duration-150 ${
              dotIndex === index ? 'w-4 bg-ink' : 'w-1.5 bg-ink/30'
            }`}
          />
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {current.title}: {current.text}
      </p>
    </div>
  )
}