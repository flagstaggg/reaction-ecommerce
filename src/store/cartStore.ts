import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { CartItem } from '@/types'

export const CART_STORAGE_KEY = 'reaction:carrinho'

export type AddToCartInput = Omit<CartItem, 'key' | 'quantity'> & { quantity?: number }

interface CartState {
  items: CartItem[]
  isOpen: boolean
  /** Abre o drawer e adiciona o item (usado pelo ProductCard e pela PDP). */
  addItem: (input: AddToCartInput) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  clear: () => void
  open: () => void
  close: () => void
  setOpen: (isOpen: boolean) => void
}

function cartItemKey(input: AddToCartInput): string {
  return `${input.productId}|${input.color}|${input.size}`
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (input) =>
        set((state) => {
          const key = cartItemKey(input)
          const quantity = input.quantity ?? 1
          const existing = state.items.find((item) => item.key === key)

          const items = existing
            ? state.items.map((item) =>
                item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
              )
            : [
                ...state.items,
                {
                  productId: input.productId,
                  slug: input.slug,
                  name: input.name,
                  image: input.image,
                  color: input.color,
                  size: input.size,
                  price: input.price,
                  key,
                  quantity,
                },
              ]

          return { items, isOpen: true }
        }),

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((item) => item.key !== key) })),

      updateQuantity: (key, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.key !== key)
              : state.items.map((item) => (item.key === key ? { ...item, quantity } : item)),
        })),

      clear: () => set({ items: [] }),

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Só os itens são persistidos — o estado do drawer é sempre da sessão.
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

/* ---------------------------- Selectors ---------------------------- */

export const selectItemCount = (state: CartState): number =>
  state.items.reduce((total, item) => total + item.quantity, 0)

export const selectSubtotal = (state: CartState): number =>
  state.items.reduce((total, item) => total + item.quantity * item.price, 0)

/** Valor que falta para liberar o frete grátis. */
export const selectMissingForFreeShipping = (state: CartState, threshold: number): number =>
  Math.max(0, threshold - selectSubtotal(state))