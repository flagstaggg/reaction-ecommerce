import type { StoreLocation } from '@/types'

/**
 * Dados fictícios da loja física. Substitua pelo cadastro real quando houver.
 */
export const STORES: StoreLocation[] = [
  {
    id: 'reaction-criciuma-centro',
    name: 'Reaction Criciúma — Centro',
    address: 'Av. das Fashion, 1234 — Centro',
    city: 'Criciúma',
    state: 'SC',
    zip: '88800-000',
    hours: [
      'Segunda a sexta: 10h às 19h',
      'Sábado: 10h às 18h',
      'Domingo e feriados: fechado',
    ],
    phone: '(48) 3000-0000',
    services: [
      'Retirada de pedidos online',
      'Troca e devolução no local',
      'Prova de calçados',
      'Estacionamento gratuito na rua ao lado',
    ],
  },
]

export const STORE_MAP_NOTE =
  'Mapa ilustrativo — dados fictícios criados apenas para a demonstração.'