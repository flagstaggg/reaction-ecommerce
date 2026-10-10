import { Link } from 'react-router-dom'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'
import { styleCardImages } from '@/data/images'

const STYLES = [
  { name: 'Casual', to: '/loja?estilo=casual' },
  { name: 'Esportivo', to: '/loja?estilo=esportivo' },
  { name: 'Street', to: '/loja?estilo=street' },
]

/** "Compre por Estilo" — 3 cards 4:5 com o nome abaixo da imagem. */
export function ShopByStyle() {
  return (
    <section aria-labelledby="estilos-titulo" className="shell py-12 md:py-16">
      <h2 id="estilos-titulo" className="mb-6 text-2xl font-normal md:text-[28px]">
        Compre por Estilo
      </h2>

      <ul className="m-0 grid list-none gap-cards p-0 sm:grid-cols-3">
        {STYLES.map((style, index) => (
          <li key={style.name}>
            <Link to={style.to} className="group block">
              <ImageWithFallback
                src={styleCardImages[index].src}
                alt={styleCardImages[index].alt}
                ratio="4 / 5"
                sizes="(min-width: 640px) 33vw, 100vw"
                fallbackLabel={style.name}
                imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <p className="m-0 mt-3 text-base text-ink">{style.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}