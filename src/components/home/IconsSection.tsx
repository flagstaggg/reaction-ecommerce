import { Link } from 'react-router-dom'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { iconsSectionImages } from '@/data/images'
import { ICON_PRODUCT_SLUGS, findProductBySlug } from '@/data/products'
import { formatCurrency } from '@/lib/formatCurrency'

/**
 * "Ícones Reaction" — grade de 4 no desktop, carrossel no mobile,
 * cada tile com fundo `surface-2` e o nome do produto abaixo.
 */
export function IconsSection() {
  const products = ICON_PRODUCT_SLUGS.map((slug) => findProductBySlug(slug)).filter(
    (product) => product !== undefined,
  )

  if (products.length === 0) return null

  const tiles = products.map((product, index) => (
    <li key={product.id} className="shrink-0 basis-[78%] sm:basis-[46%] lg:basis-auto lg:shrink">
      <Link to={`/produto/${product.slug}`} className="group block">
        <div className="overflow-hidden bg-surface-2">
          <ImageWithFallback
            src={iconsSectionImages[index].src}
            alt={iconsSectionImages[index].alt}
            ratio="1 / 1"
            sizes="(min-width: 1024px) 25vw, 78vw"
            fallbackLabel={product.name}
            imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <p className="m-0 mt-3 text-sm font-medium">{product.name}</p>
        <p className="m-0 mt-0.5 text-sm font-semibold">{formatCurrency(product.price)}</p>
      </Link>
    </li>
  ))

  return (
    <section aria-labelledby="icones-titulo" className="shell py-12 md:py-16">
      <h2 id="icones-titulo" className="mb-6 text-2xl font-normal md:text-[28px]">
        Ícones Reaction
      </h2>

      {/* Mobile: carrossel horizontal com scroll nativo (leve e acessível). */}
      <ul className="-mx-4 m-0 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto scroll-thin px-4 pb-2 lg:mx-0 lg:hidden">
        {tiles}
      </ul>

      {/* Desktop: grade de 4. */}
      <ul className="m-0 hidden list-none gap-cards p-0 lg:grid lg:grid-cols-4">{tiles}</ul>
    </section>
  )
}