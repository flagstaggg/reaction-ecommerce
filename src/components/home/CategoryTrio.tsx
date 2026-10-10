import { Link } from 'react-router-dom'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { categoryTrioImages } from '@/data/images'

const CATEGORIES = [
  { name: 'Camisetas', to: '/loja?categoria=camisetas' },
  { name: 'Moletons', to: '/loja?categoria=moletons' },
  { name: 'Calças', to: '/loja?categoria=calcas' },
]

/** Trio de categorias: cards verticais 4:5 com nome numa pílula sobre a foto. */
export function CategoryTrio() {
  return (
    <section aria-labelledby="categorias-titulo" className="shell py-12 md:py-16">
      <h2 id="categorias-titulo" className="mb-6 text-2xl font-normal md:text-[28px]">
        Categorias
      </h2>

      <ul className="m-0 grid list-none gap-cards p-0 sm:grid-cols-3">
        {CATEGORIES.map((category, index) => {
          const image = categoryTrioImages[index]
          return (
            <li key={category.name}>
              <Link
                to={category.to}
                aria-label={`Ver ${category.name}`}
                className="group relative block overflow-hidden bg-surface"
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  ratio="4 / 5"
                  sizes="(min-width: 640px) 33vw, 100vw"
                  fallbackLabel={category.name}
                  imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                <span className="absolute bottom-3 left-3 rounded-full bg-paper px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-ink">
                  {category.name}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}