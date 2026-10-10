import { Clock, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { STORE_MAP_NOTE, STORES } from '@/data/stores'
import { useSeo } from '@/hooks/useSeo'

export default function Stores() {
  useSeo(
    'Encontre uma loja',
    'Loja Reaction em Criciúma, Santa Catarina. Endereço, horários e serviços — dados fictícios de demonstração.',
  )

  const store = STORES[0]

  return (
    <div className="shell py-8 md:py-12">
      <h1 className="m-0 text-2xl font-normal md:text-[32px]">Encontre uma loja</h1>
      <p className="mb-0 mt-2 max-w-2xl text-sm text-muted">
        A Reaction tem uma loja física em Criciúma, Santa Catarina. Retire pedidos online sem custo
        e experimente as peças no local.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-10">
        <section
          aria-labelledby="loja-titulo"
          className="border border-line p-6"
        >
          <h2 id="loja-titulo" className="m-0 text-lg font-semibold">
            {store.name}
          </h2>

          <dl className="m-0 mt-5 space-y-4 text-sm">
            <div className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
              <div>
                <dt className="font-medium">Endereço</dt>
                <dd className="m-0 text-muted">
                  {store.address}
                  <br />
                  {store.city} — {store.state}, CEP {store.zip}
                </dd>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
              <div>
                <dt className="font-medium">Horários</dt>
                <dd className="m-0 text-muted">
                  <ul className="m-0 list-none space-y-0.5 p-0">
                    {store.hours.map((hour) => (
                      <li key={hour}>{hour}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
              <div>
                <dt className="font-medium">Telefone</dt>
                <dd className="m-0 text-muted">{store.phone}</dd>
              </div>
            </div>
          </dl>

          <div className="mt-6 border-t border-line pt-5">
            <h3 className="m-0 mb-2 text-xs font-bold uppercase tracking-[0.1em]">Serviços</h3>
            <ul className="m-0 list-none space-y-1.5 p-0 text-sm text-muted">
              {store.services.map((service) => (
                <li key={service}>• {service}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/loja">Ver produtos</Button>
          </div>
        </section>

        <div>
          {/* Bloco visual no lugar do mapa — sem API externa. */}
          <div
            role="img"
            aria-label="Mapa ilustrativo indicando a loja Reaction no centro de Criciúma"
            className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-surface-2 sm:aspect-[16/10]"
          >
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
              {Array.from({ length: 24 }, (_, index) => (
                <span
                  key={index}
                  className={`border border-line/60 ${
                    index % 5 === 0 || index % 7 === 0 ? 'bg-surface' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            <div className="absolute left-[18%] top-0 h-full w-3 bg-paper/80" />
            <div className="absolute left-0 top-[42%] h-3 w-full bg-paper/80" />
            <div className="absolute right-[22%] top-0 h-full w-2 bg-paper/60" />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="relative flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-accent" />
              </span>
            </div>

            <div className="absolute bottom-3 left-3 bg-paper px-3 py-2 text-[11px] text-muted">
              {STORE_MAP_NOTE}
            </div>
          </div>

          <p className="mb-0 mt-3 text-xs text-muted">
            <span className="font-semibold text-ink">Dados fictícios.</span> Endereço, telefone,
            horários e o mapa acima foram criados apenas para a demonstração e não correspondem a
            uma loja real.
          </p>
        </div>
      </div>
    </div>
  )
}