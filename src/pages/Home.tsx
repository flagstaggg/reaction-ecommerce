import { CategoryTrio } from '@/components/home/CategoryTrio'
import { HeroCarousel } from '@/components/home/HeroCarousel'
import { IconsSection } from '@/components/home/IconsSection'
import { Newsletter } from '@/components/home/Newsletter'
import { ShopByStyle } from '@/components/home/ShopByStyle'
import { SplitBanners } from '@/components/home/SplitBanners'
import { TopSearchedTabs } from '@/components/home/TopSearchedTabs'
import { useSeo } from '@/hooks/useSeo'

export default function Home() {
  useSeo(
    'Moda esportiva e streetwear em Criciúma',
    'Reaction — camisetas, moletons, calças, jaquetas e acessórios em Criciúma, Santa Catarina. Frete grátis acima de R$ 299. Loja de demonstração.',
  )

  return (
    <>
      <HeroCarousel />
      <SplitBanners />
      <CategoryTrio />
      <IconsSection />
      <ShopByStyle />
      <TopSearchedTabs />
      <Newsletter />
    </>
  )
}