import { Heart, ShoppingBag } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb } from '@/components/catalog/Breadcrumb'
import { PriceTag } from '@/components/catalog/PriceTag'
import { Rating } from '@/components/catalog/Rating'
import { ColorSwatches } from '@/components/product/ColorSwatches'
import { Gallery } from '@/components/product/Gallery'
import { ProductAccordion } from '@/components/product/ProductAccordion'
import { RelatedProducts } from '@/components/product/RelatedProducts'
import { ShippingSimulator } from '@/components/product/ShippingSimulator'
import { SizeSelector } from '@/components/product/SizeSelector'
import { Button } from '@/components/ui/Button'
import { findProductBySlug, PRODUCTS } from '@/data/products'
import { useSeo } from '@/hooks/useSeo'
import { installment } from '@/lib/formatCurrency'
import { categorySlug } from '@/lib/filters'
import { useCartStore } from '@/store/cartStore'
import { useFavoritesStore, useIsFavorite } from '@/store/favoritesStore'
import { useUIStore } from '@/store/uiStore'
import NotFound from './NotFound'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = findProductBySlug(slug)

  useSeo(
    product?.name ?? 'Produto não encontrado',
    product
      ? `${product.name} — ${product.description} Reaction, Criciúma (SC).`
      : 'Produto não encontrado na Reaction.',
  )

  const addItem = useCartStore((state) => state.addItem)
  const toggleFavorite = useFavoritesStore((state) => state.toggle)
  const showToast = useUIStore((state) => state.showToast)

  const [color, setColor] = useState(product?.colors[0]?.name ?? '')
  const [size, setSize] = useState<string | null>(null)
  const [sizeError, setSizeError] = useState(false)
  const [lastProductId, setLastProductId] = useState(product?.id)

  // Resele as variações ao trocar de produto (ajuste durante o render).
  if (product && lastProductId !== product.id) {
    setLastProductId(product.id)
    setColor(product.colors[0]?.name ?? '')
    setSize(null)
    setSizeError(false)
  }

  const isFavorite = useIsFavorite(product?.id ?? '')

  const related = useMemo(() => {
    if (!product) return []
    const productCategory = categorySlug(product)
    return PRODUCTS.filter(
      (item) =>
        item.id !== product.id &&
        (categorySlug(item) === productCategory || item.type === product.type),
    ).slice(0, 8)
  }, [product])

  if (!product) return <NotFound />

  const onAddToCart = () => {
    if (!size) {
      setSizeError(true)
      showToast('Escolha um tamanho para continuar.')
      return
    }

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      color,
      size,
      price: product.price,
    })
    showToast(`${product.name} adicionado à sacola.`)
  }

  const onToggleFavorite = () => {
    const added = toggleFavorite(product.id)
    showToast(
      added ? `${product.name} salvo nos favoritos.` : `${product.name} removido dos favoritos.`,
    )
  }

  return (
    <div className="shell py-6 md:py-8">
      <Breadcrumb
        className="mb-5"
        items={[
          { label: 'Página Inicial', to: '/' },
          { label: product.category, to: `/loja?categoria=${categorySlug(product)}` },
          { label: product.name },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-3">
          <Gallery product={product} />
        </div>

        <div className="lg:col-span-2">
          <p className="m-0 text-xs font-bold uppercase tracking-[0.1em] text-muted">
            {product.category}
          </p>
          <h1 className="mb-0 mt-2 text-xl font-semibold leading-tight md:text-2xl">
            {product.name}
          </h1>

          <div className="mt-3">
            <Rating value={product.rating} reviewCount={product.reviewCount} size="md" />
          </div>

          <div className="mt-5">
            <PriceTag price={product.price} oldPrice={product.oldPrice} size="lg" />
            <p className="m-0 mt-1 text-sm text-muted">ou {installment(product.price)}</p>
          </div>

          {product.coupon && (
            <p className="m-0 mt-3 text-sm font-medium text-success">
              Cupom {product.coupon} — 15% off no Pix
            </p>
          )}

          <div className="mt-7">
            <ColorSwatches colors={product.colors} value={color} onChange={setColor} />
          </div>

          <div className="mt-7">
            <SizeSelector
              sizes={product.sizes}
              value={size}
              onChange={(label) => {
                setSize(label)
                setSizeError(false)
              }}
            />

            {sizeError && (
              <p role="alert" className="mb-0 mt-3 text-sm text-accent">
                Escolha um tamanho antes de adicionar à sacola.
              </p>
            )}
          </div>

          <div className="mt-7 flex flex-col gap-3">
            <Button
              fullWidth
              size="lg"
              aria-disabled={!size}
              onClick={onAddToCart}
              className={!size ? 'opacity-60' : ''}
            >
              <ShoppingBag aria-hidden="true" className="h-4 w-4" />
              Adicionar à sacola
            </Button>

            <Button fullWidth size="lg" variant="outline" onClick={onToggleFavorite}>
              <Heart
                aria-hidden="true"
                className={`h-4 w-4 ${isFavorite ? 'fill-ink' : ''}`}
                strokeWidth={1.75}
              />
              {isFavorite ? 'Salvo nos favoritos' : 'Favoritar'}
            </Button>
          </div>

          <div className="mt-7">
            <ShippingSimulator price={product.price} />
          </div>

          <div className="mt-8">
            <ProductAccordion product={product} />
          </div>
        </div>
      </div>

      <div className="mt-14">
        <RelatedProducts products={related} />
      </div>

      <p className="mb-0 mt-10 text-xs text-muted">
        Loja de demonstração — os produtos, preços e imagens são fictícios.{' '}
        <Link to="/loja" className="underline underline-offset-2">
          Ver toda a coleção
        </Link>
        .
      </p>
    </div>
  )
}