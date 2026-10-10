import { useState, type CSSProperties } from 'react'

/** `CSSProperties` com suporte às custom properties (`--pos-mobile`, etc.). */
export type ImageStyle = CSSProperties & Record<`--${string}`, string | number>

interface ImageWithFallbackProps {
  src: string
  alt: string
  /** Classes do container (normalmente controla o `aspect-ratio`). */
  className?: string
  /** Classes aplicadas diretamente na `<img>`. */
  imgClassName?: string
  /** Texto exibido no lugar da foto quando ela falha. */
  fallbackLabel?: string
  /** Reserva a proporção da imagem para evitar salto de layout. */
  ratio?: string
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  sizes?: string
  width?: number
  height?: number
  /** Estilos extras aplicados na `<img>` (ex.: variáveis de object-position). */
  imgStyle?: ImageStyle
  onLoad?: () => void
}

/**
 * Imagem com reserva de proporção e fallback.
 * Nunca deixa uma imagem quebrada na tela: se o carregamento falhar,
 * mostra um bloco `surface` com o nome do produto.
 */
export function ImageWithFallback({
  src,
  alt,
  className = '',
  imgClassName = 'h-full w-full object-cover',
  fallbackLabel,
  ratio,
  loading = 'lazy',
  fetchPriority,
  sizes,
  width,
  height,
  imgStyle,
  onLoad,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`overflow-hidden bg-surface ${className}`}
      style={ratio ? ({ aspectRatio: ratio } as CSSProperties) : undefined}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-surface px-4 text-center">
          <span className="font-display text-lg tracking-[0.18em] text-muted">REACTION</span>
          {fallbackLabel && <span className="text-xs text-muted">{fallbackLabel}</span>}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          sizes={sizes}
          width={width}
          height={height}
          onError={() => setFailed(true)}
          onLoad={onLoad}
          style={imgStyle}
          className={imgClassName}
        />
      )}
    </div>
  )
}