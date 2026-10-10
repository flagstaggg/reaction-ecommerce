import { create } from 'zustand'

export type ToastTone = 'default' | 'success' | 'error'

export interface ToastState {
  id: number
  message: string
  tone: ToastTone
}

interface UIState {
  searchOpen: boolean
  mobileMenuOpen: boolean
  checkoutOpen: boolean
  toast: ToastState | null
  setSearchOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
  setCheckoutOpen: (open: boolean) => void
  showToast: (message: string, tone?: ToastTone) => void
  hideToast: () => void
}

/** Fecha qualquer overlay aberto — usado pelo clique no scrim e pelo Esc. */
export function closeAllOverlays(set: (partial: Partial<UIState>) => void): void {
  set({ searchOpen: false, mobileMenuOpen: false, checkoutOpen: false })
}

let toastId = 0

export const useUIStore = create<UIState>()((set) => ({
  searchOpen: false,
  mobileMenuOpen: false,
  checkoutOpen: false,
  toast: null,

  setSearchOpen: (searchOpen) => set({ searchOpen }),
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
  setCheckoutOpen: (checkoutOpen) => set({ checkoutOpen }),

  showToast: (message, tone = 'default') => {
    toastId += 1
    set({ toast: { id: toastId, message, tone } })
  },

  hideToast: () => set({ toast: null }),
}))