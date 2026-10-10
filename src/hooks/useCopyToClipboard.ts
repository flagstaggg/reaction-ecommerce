import { useCallback, useState } from 'react'

/**
 * Copia texto para a área de transferência com fallback para navegadores
 * sem `navigator.clipboard`. Retorna `true` quando conseguiu copiar.
 */
export function useCopyToClipboard(): {
  copied: boolean
  copy: (text: string) => Promise<boolean>
} {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (text: string) => {
    let success = false
    try {
      await navigator.clipboard.writeText(text)
      success = true
    } catch {
      // Fallback para o método antigo (contextos não seguros / http).
      try {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        success = document.execCommand('copy')
        document.body.removeChild(textarea)
      } catch {
        success = false
      }
    }

    setCopied(success)
    return success
  }, [])

  return { copied, copy }
}