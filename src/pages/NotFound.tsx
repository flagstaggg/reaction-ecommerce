import { Button } from '@/components/ui/Button'
import { useSeo } from '@/hooks/useSeo'

export default function NotFound() {
  useSeo('Página não encontrada', 'A página que você procura não existe na Reaction.')

  return (
    <section className="shell flex flex-col items-start justify-center gap-6 py-24 md:py-32">
      <p className="m-0 font-display text-[clamp(64px,16vw,160px)] leading-[0.85]">404</p>

      <div className="max-w-md">
        <h1 className="m-0 text-2xl font-normal md:text-[28px]">Não encontramos esta página</h1>
        <p className="mb-0 mt-3 text-sm text-muted">
          O link pode ter mudado ou não existe mais. Volte para a página inicial ou veja a coleção
          completa.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button to="/">Voltar para a home</Button>
        <Button to="/loja" variant="outline">
          Ver produtos
        </Button>
      </div>
    </section>
  )
}