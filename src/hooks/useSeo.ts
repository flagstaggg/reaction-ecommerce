import { useEffect } from 'react'

const SITE_NAME = 'Reaction'

/**
 * Atualiza `<title>` e a meta description a cada página.
 * Também sincroniza o `document.title` no primeiro render.
 */
export function useSeo(title: string, description: string): void {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    document.title = fullTitle

    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', description)
    } else {
      const created = document.createElement('meta')
      created.setAttribute('name', 'description')
      created.setAttribute('content', description)
      document.head.appendChild(created)
    }
  }, [title, description])
}