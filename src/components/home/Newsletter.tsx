import { Check } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

interface NewsletterFormProps {
  /** `inline` deixa o campo e o botão na mesma linha (rodapé). */
  layout?: 'inline' | 'stacked'
  tone?: 'light' | 'dark'
}

type Status = 'idle' | 'error' | 'success'

/** Formulário de newsletter com validação de e-mail (sem back-end). */
export function NewsletterForm({ layout = 'inline', tone = 'dark' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus(EMAIL_PATTERN.test(email.trim()) ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className={`flex items-center gap-2 text-sm font-medium ${
          tone === 'dark' ? 'text-success' : 'text-paper'
        }`}
      >
        <Check aria-hidden="true" className="h-4 w-4" />
        Cadastro confirmado. Até já!
      </div>
    )
  }

  const dark = tone === 'dark'
  const fieldClass = `h-11 w-full border-b bg-transparent text-sm outline-none transition-colors placeholder:text-muted focus:border-ink ${
    dark ? 'border-ink' : 'border-paper/60 placeholder:text-paper/70 focus:border-paper'
  }`

  return (
    <form onSubmit={onSubmit} noValidate>
      <div
        className={`flex ${layout === 'inline' ? 'items-end gap-3' : 'flex-col gap-3 sm:flex-row sm:items-end'}`}
      >
        <div className="min-w-0 flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Seu e-mail
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (status === 'error') setStatus('idle')
            }}
            placeholder="Digite seu e-mail"
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
            className={fieldClass}
          />
        </div>
        <Button type="submit" variant={dark ? 'primary' : 'onPhoto'} className="shrink-0">
          Cadastrar
        </Button>
      </div>

      {status === 'error' && (
        <p id="newsletter-error" role="alert" className="mt-2 text-xs text-accent">
          Digite um e-mail válido para continuar.
        </p>
      )}
    </form>
  )
}

/** Seção de newsletter da home. */
export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-title" className="shell py-12 md:py-16">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-md">
          <h2
            id="newsletter-title"
            className="m-0 text-2xl font-normal text-ink md:text-[28px]"
          >
            Cadastre-se para receber novidades
          </h2>
          <p className="mb-0 mt-2 text-sm text-muted">
            Lançamentos, ofertas e convites para ações da Reaction em Criciúma.
          </p>
        </div>

        <div className="w-full max-w-md">
          <NewsletterForm />
        </div>
      </div>
    </section>
  )
}