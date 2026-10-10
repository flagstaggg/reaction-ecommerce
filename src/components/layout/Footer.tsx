import { Link } from 'react-router-dom'
import { NewsletterForm } from '@/components/home/Newsletter'
import { Wordmark } from '@/components/ui/Logo'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/components/ui/SocialIcons'

interface FooterColumn {
  title: string
  links: { label: string; to?: string }[]
}

const HELP_LINKS: FooterColumn = {
  title: 'Ajuda',
  links: [
    { label: 'Dúvidas gerais' },
    { label: 'Entregas' },
    { label: 'Pedidos' },
    { label: 'Devoluções' },
    { label: 'Pagamentos' },
    { label: 'Fale conosco' },
  ],
}

const ABOUT_LINKS: FooterColumn = {
  title: 'Sobre a Reaction',
  links: [{ label: 'Propósito' }, { label: 'Sustentabilidade' }, { label: 'Trabalhe conosco' }],
}

const LEGAL_LINKS = [
  { label: 'Política de privacidade' },
  { label: 'Cookies' },
  { label: 'Termos de uso' },
]

const SOCIALS = [
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'YouTube', Icon: YouTubeIcon },
]

export function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-paper">
      <div className="shell py-12 md:py-14">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          <FooterList column={HELP_LINKS} />
          <FooterList column={ABOUT_LINKS} />

          <div>
            <h3 className="m-0 mb-4 text-xs font-bold uppercase tracking-[0.1em]">Lojas</h3>
            <ul className="m-0 list-none space-y-2.5 p-0">
              <li>
                <Link to="/lojas" className="text-sm text-ink transition-colors hover:text-muted">
                  Criciúma, SC
                </Link>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-1">
              {SOCIALS.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  onClick={(event) => event.preventDefault()}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-surface"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="m-0 mb-4 text-xs font-bold uppercase tracking-[0.1em]">Newsletter</h3>
            <p className="mb-4 mt-0 text-sm text-muted">
              Novidades e convidentes de ações da Reaction, direto no seu e-mail.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <Wordmark size={20} />
          <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  className="cursor-default text-xs text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mb-0 mt-6 text-xs text-muted">
          © Reaction. Loja fictícia criada para fins de demonstração. Criciúma, Santa Catarina.
        </p>
      </div>
    </footer>
  )
}

function FooterList({ column }: { column: FooterColumn }) {
  return (
    <div>
      <h3 className="m-0 mb-4 text-xs font-bold uppercase tracking-[0.1em]">{column.title}</h3>
      <ul className="m-0 list-none space-y-2.5 p-0">
        {column.links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link to={link.to} className="text-sm text-ink transition-colors hover:text-muted">
                {link.label}
              </Link>
            ) : (
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                className="cursor-default text-sm text-ink transition-colors hover:text-muted"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}