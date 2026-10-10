import { Heart } from 'lucide-react'
import { useMemo } from 'react'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { Button } from '@/components/ui/Button'
import { PRODUCTS } from '@/data/products'
import { useSeo } from '@/hooks/useSeo'
import { useFavoritesStore } from '@/store/favoritesStore'

export default function Favorites() {
  useSeo(
    'Favoritos',
    'Seus produtos favoritos da Reaction, salvos neste navegador.',
  )

  const ids = useFavoritesStore((state) => state.ids)

  const favorites = useMemo(
    () => PRODUCTS.filter((product) => ids.includes(product.id)),
    [ids],
  )

  return (
    <div className="shell py-8 md:py-12">
      <h1 className="m-0 text-2xl font-normal md:text-[32px]">Favoritos</h1>
      <p className="mb-0 mt-2 text-sm text-muted">
        {favorites.length > 0
          ? `${favorites.length} ${favorites.length === 1 ? 'item salvo' : 'itens salvos'} neste navegador.`
          : 'Salve produtos com o coração para encontrar depois.'}
      </p>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-start gap-5 border border-line px-6 py-16 md:items-center md:text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-surface">
            <Heart aria-hidden="true" className="h-6 w-6 text-muted" />
          </span>
          <div>
            <h2 className="m-0 text-lg font-semibold">Você ainda não salvou nada</h2>
            <p className="mb-0 mt-2 max-w-sm text-sm text-muted">
              Toque no coração de qualquer produto para guardá-lo aqui. A lista fica salva mesmo que
              você feche o navegador.
            </p>
          </div>
          <Button to="/loja">Explorar produtos</Button>
        </div>
      ) : (
        <div className="mt-8">
          <ProductGrid products={favorites} columns={4} />
        </div>
      )}
    </div>
  )
}