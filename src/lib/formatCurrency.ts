/** Formatação de moeda no padrão brasileiro (R$ 1.234,50). */
const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** Número simples, sem símbolo de moeda. */
const DECIMAL = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/**
 * `formatCurrency(78.84)` → `"R$ 78,84"`.
 * O espaço fino do Intl é trocado por um espaço comum para evitar
 * diferenças de renderização entre navegadores.
 */
export function formatCurrency(value: number): string {
  return BRL.format(value).replace(/\u00a0/g, ' ')
}

/** `78.84` → `"78,84"` (para campos de entrada de preço). */
export function formatDecimal(value: number): string {
  return DECIMAL.format(value).replace(/\u00a0/g, ' ')
}

/**
 * "ou 3x de R$ 39,42 sem juros" — parcelamento fictício de 3 vezes.
 */
export function installment(value: number, times = 3): string {
  return `${times}x de ${formatCurrency(value / times)} sem juros`
}

/** Percentual de desconto entre o preço antigo e o atual. `0` se não houver. */
export function discountPercent(price: number, oldPrice?: number): number {
  if (!oldPrice || oldPrice <= price) return 0
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}