import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { Button } from '@/components/ui/Button'
import { splitBannerImages } from '@/data/images'

const BANNERS = [
  {
    label: 'Linha Urban',
    title: 'Peças versáteis para o dia a dia.',
    to: '/loja?colecao=Urban',
    positionMobile: '55% 40%',
    positionDesktop: '50% 45%',
  },
  {
    label: 'Linha Tech',
    title: 'Tecidos leves para quem não para.',
    to: '/loja?colecao=Tech',
    positionMobile: '50% 30%',
    positionDesktop: '50% 35%',
  },
]

/** Banners 50/50 de ponta a ponta; empilham no mobile. */
export function SplitBanners() {
  return (
    <section aria-label="Linhas em destaque" className="grid md:grid-cols-2">
      {BANNERS.map((banner, index) => {
        const image = splitBannerImages[index]
        return (
          <div
            key={banner.label}
            className="group relative flex min-h-[70vh] flex-col justify-end overflow-hidden bg-ink md:min-h-[85vh]"
          >
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              ratio="4 / 5"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full"
              imgClassName="h-full w-full object-cover object-position-hero transition-transform duration-500 group-hover:scale-[1.03]"
              imgStyle={{
                '--pos-mobile': banner.positionMobile,
                '--pos-desktop': banner.positionDesktop,
              }}
              fallbackLabel={banner.label}
            />

            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/60 to-ink/10" />

            <div className="relative p-6 md:p-10">
              <p className="m-0 text-[11px] font-bold uppercase tracking-[0.18em] text-paper/80">
                {banner.label}
              </p>
              <h2 className="m-0 mt-3 max-w-sm text-[26px] font-normal leading-tight text-paper md:text-[28px]">
                {banner.title}
              </h2>
              <div className="mt-6">
                <Button to={banner.to} variant="onPhoto">
                  Comprar
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}