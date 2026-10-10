/**
 * Verifica se todas as URLs de imagem declaradas em `src/data/images.ts`
 * respondem 200. Uso: node scripts/check-images.mjs
 *
 * Não faz parte do bundle — é só uma ferramenta de QA do projeto.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const source = readFileSync(join(here, '../src/data/images.ts'), 'utf8')

const ids = new Set()
const base = 'https://images.unsplash.com/'

for (const match of source.matchAll(/unsplash\(\s*'([^']+)'/g)) ids.add(match[1])
for (const match of source.matchAll(/u\(\s*'([^']+)'\s*\)/g)) ids.add(match[1])

const urls = [...ids].map((id) => `${base}${id}?auto=format&fit=crop&w=200&q=60`)

console.log(`Verificando ${urls.length} URLs do Unsplash…\n`)

const results = await Promise.all(
  urls.map(async (url) => {
    const id = url.slice(base.length, url.indexOf('?'))
    try {
      const response = await fetch(url, { redirect: 'follow' })
      return { id, status: response.status, ok: response.ok }
    } catch (error) {
      return { id, status: String(error.cause?.code ?? error.message), ok: false }
    }
  }),
)

const broken = results.filter((r) => !r.ok)

for (const result of results) {
  if (!result.ok) console.log(`  FALHOU  ${result.status}  ${result.id}`)
}

console.log(`\n${results.length - broken.length}/${results.length} imagens OK.`)

if (broken.length) {
  console.log('\nIDs com problema:')
  console.log(broken.map((b) => b.id).join('\n'))
  process.exitCode = 1
} else {
  console.log('Nenhuma imagem quebrada.')
}