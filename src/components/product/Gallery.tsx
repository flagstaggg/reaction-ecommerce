import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, type PointerEvent } from 'react'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import type { Product } from '@/types'

interface GalleryProps {
  product: Product
}

/**
 * Galeria: miniaturas verticais à esquerda no desktop, horizontais no mobile.
 * Zoom no hover (desktop) e swipe no mobile via scroll horizontal.
 */
export function Gallery({ product }: GalleryProps) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const images = product.images
  const current = images[active] ?? product.images[0]

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    event.currentTarget.style.setProperty('--zoom-x', `${x}%`)
    event.currentTarget.style.setProperty('--zoom-y', `${y}%`)
  }

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row lg:gap-4">
      {images.length > 1 && (
        <ul className="m-0 flex list-none gap-2 overflow-x-auto scroll-thin p-0 lg:w-[76px] lg:shrink-0 lg:flex-col lg:overflow-visible">
          {images.map((image, index) => (
            <li key={image} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Ver imagem ${index + 1} de ${product.name}`}
                aria-current={index === active}
                className={`block w-[60px] transition-opacity ${
                  index === active ? 'ring-1 ring-ink' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt=""
                  ratio="4 / 5"
                  className="w-full"
                  fallbackLabel={product.name}
                  imgClassName="h-full w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="min-w-0 flex-1">
        <div
          className="relative hidden overflow-hidden lg:block"
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          onPointerMove={onMove}
        >
          <ImageWithFallback
            key={current}
            src={current}
            alt={product.name}
            ratio="4 / 5"
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 50vw, 100vw"
            fallbackLabel={product.name}
            imgClassName="h-full w-full object-cover transition-transform duration-200"
          />

          {zoomed && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-no-repeat"
              style={{
                backgroundImage: `url(${current})`,
                backgroundPosition: 'var(--zoom-x, 50%) var(--zoom-y, 50%)',
                backgroundSize: '200%',
              }}
            />
          )}
        </div>

        {/* Mobile: carrossel horizontal nativo. */}
        <div className="lg:hidden">
          <div className="flex snap-x snap-mandatory overflow-x-auto scroll-thin">
            {images.map((image, index) => (
              <div key={image} className="w-full shrink-0 snap-center">
                <ImageWithFallback
                  src={image}
                  alt={index === 0 ? product.name : `${product.name} — imagem ${index + 1}`}
                  ratio="4 / 5"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  sizes="100vw"
                  fallbackLabel={product.name}
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Imagem anterior"
                onClick={() => setActive((index) => (index - 1 + images.length) % images.length)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line"
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    aria-label={`Ir para a imagem ${index + 1}`}
                    aria-current={index === active}
                    onClick={() => setActive(index)}
                    className={`h-1.5 rounded-full transition-all duration-150 ${
                      index === active ? 'w-4 bg-ink' : 'w-1.5 bg-ink/30'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Próxima imagem"
                onClick={() => setActive((index) => (index + 1) % images.length)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line"
              >
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}