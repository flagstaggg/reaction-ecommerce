import { ChevronLeft, ChevronRight } from 'lucide-react'
import { A11y, FreeMode, Keyboard, Mousewheel, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ProductCard } from '@/components/catalog/ProductCard'
import type { Product } from '@/types'

interface RelatedProductsProps {
  products: Product[]
  title?: string
}

/** Carrossel "Você também pode gostar". */
export function RelatedProducts({
  products,
  title = 'Você também pode gostar',
}: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section aria-labelledby="relacionados-titulo" className="border-t border-line pt-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 id="relacionados-titulo" className="m-0 text-xl font-normal md:text-[28px]">
          {title}
        </h2>

        <div className="hidden items-center gap-2 md:flex">
          <button
            id="relacionados-prev"
            type="button"
            aria-label="Produtos anteriores"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors hover:bg-surface"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <button
            id="relacionados-next"
            type="button"
            aria-label="Próximos produtos"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors hover:bg-surface"
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, A11y, Keyboard, Mousewheel, FreeMode]}
        navigation={{ prevEl: '#relacionados-prev', nextEl: '#relacionados-next' }}
        keyboard={{ enabled: true }}
        a11y={{ enabled: true }}
        freeMode={{ enabled: true }}
        mousewheel={{ forceToAxis: true }}
        slidesPerView={2}
        spaceBetween={14}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="overflow-hidden"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}