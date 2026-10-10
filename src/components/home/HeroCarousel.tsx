import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Autoplay, A11y, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { Button } from '@/components/ui/Button'
import { heroImages } from '@/data/images'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useUIStore } from '@/store/uiStore'

const AUTOPLAY_MS = 6000

interface Slide {
  eyebrow: string
  title: string
  subtitle: string
  action: 'shop' | 'notify'
}

/** Copy fixa da demonstração — troque pelos banners reais quando houver. */
const SLIDES: Slide[] = [
  {
    eyebrow: '',
    title: 'Nova coleção verão',
    subtitle: 'Peças leves para os dias que pedem movimento.',
    action: 'shop',
  },
  {
    eyebrow: '',
    title: 'Básicos que duram',
    subtitle: 'Malhas que atravessam estações sem pedir substituição.',
    action: 'shop',
  },
  {
    eyebrow: 'Em breve',
    title: 'Linha Tech',
    subtitle: 'Tecidos técnicos pensados para quem não para.',
    action: 'notify',
  },
]

const SLIDE_LINKS = ['/lancamentos', '/loja?colecao=Essentials', '/lancamentos']

/**
 * Hero em carrossel: tela cheia, autoplay 6s (pausa no hover e desativado com
 * prefers-reduced-motion), barras de progresso, setas e navegação por teclado.
 */
export function HeroCarousel() {
  const reduced = usePrefersReducedMotion()
  const showToast = useUIStore((state) => state.showToast)
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  const onNotify = () => {
    showToast('Aviso registrado! Avisaremos sobre o lançamento da Linha Tech.')
  }

  return (
    <section
      aria-label="Destaques"
      aria-roledescription="carrossel"
      className="relative h-[calc(100svh-7rem)] min-h-[480px] w-full overflow-hidden bg-ink lg:h-[calc(100vh-3.5rem)]"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination, A11y, Keyboard]}
        onSwiper={setSwiper}
        autoplay={reduced ? false : { delay: AUTOPLAY_MS, disableOnInteraction: false }}
        speed={reduced ? 0 : 600}
        navigation={{ prevEl: '#hero-prev', nextEl: '#hero-next' }}
        pagination={{ el: '#hero-pagination', clickable: true }}
        keyboard={{ enabled: true }}
        a11y={{ enabled: true }}
        watchSlidesProgress
        onMouseEnter={() => swiper?.autoplay?.stop()}
        onMouseLeave={() => {
          if (!reduced) swiper?.autoplay?.start()
        }}
        className="h-full w-full [&_.swiper-slide]:h-full"
      >
        {SLIDES.map((slide, index) => {
          const image = heroImages[index]
          return (
            <SwiperSlide key={slide.title}>
              <div className="relative h-full w-full">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  loading="eager"
                  fetchPriority="high"
                  fallbackLabel="Reaction"
                  className="absolute inset-0 h-full w-full"
                  imgClassName="h-full w-full object-cover object-position-hero"
                  imgStyle={{
                    '--pos-mobile': image.positionMobile,
                    '--pos-desktop': image.positionDesktop,
                  }}
                />

                {/* Overlay sutil apenas para garantir contraste do texto. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-ink/20"
                />

                <div className="absolute inset-x-0 bottom-0 pb-20 md:pb-24">
                  <div className="shell text-center text-paper">
                    {slide.eyebrow && (
                      <p className="m-0 mb-2 text-xs font-bold uppercase tracking-[0.18em]">
                        {slide.eyebrow}
                      </p>
                    )}

                    <h1 className="m-0 font-display uppercase text-[clamp(48px,11vw,120px)]">
                      {slide.title}
                    </h1>

                    <p className="mx-auto mb-0 mt-4 max-w-md text-base text-paper/90">
                      {slide.subtitle}
                    </p>

                    <div className="mt-7">
                      {slide.action === 'shop' ? (
                        <Button to={SLIDE_LINKS[index]} variant="onPhoto" size="lg">
                          Comprar
                        </Button>
                      ) : (
                        <Button variant="onPhoto" size="lg" onClick={onNotify}>
                          Avise-me
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <button
        id="hero-prev"
        type="button"
        aria-label="Slide anterior"
        className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink transition-colors hover:bg-paper md:inline-flex"
      >
        <ChevronLeft aria-hidden="true" className="h-5 w-5" />
      </button>

      <button
        id="hero-next"
        type="button"
        aria-label="Próximo slide"
        className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink transition-colors hover:bg-paper md:inline-flex"
      >
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-4">
        <div id="hero-pagination" className="pointer-events-auto flex items-center gap-2" />

        <div className="flex items-center gap-2 text-paper">
          <ChevronDown aria-hidden="true" className="h-4 w-4 animate-bounce opacity-70" />
          <span className="text-[11px] uppercase tracking-[0.18em]">Role para ver mais</span>
        </div>
      </div>
    </section>
  )
}