import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const FAVORITES_STORAGE_KEY = 'reaction:favoritos'

interface FavoritesState {
  /** Ids de produtos favoritados. */
  ids: string[]
  toggle: (id: string) => boolean
  remove: (id: string) => void
  clear: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],

      /** Retorna `true` quando o item passou a estar favoritado. */
      toggle: (id) => {
        const wasFavorite = get().ids.includes(id)
        set((state) => ({
          ids: wasFavorite ? state.ids.filter((item) => item !== id) : [...state.ids, id],
        }))
        return !wasFavorite
      },

      remove: (id) => set((state) => ({ ids: state.ids.filter((item) => item !== id) })),
      clear: () => set({ ids: [] }),
    }),
    {
      name: FAVORITES_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ ids: state.ids }),
    },
  ),
)

/** `true` se o produto está favoritado. */
export const useIsFavorite = (id: string): boolean =>
  useFavoritesStore((state) => state.ids.includes(id))

export const selectFavoriteCount = (state: FavoritesState): number => state.ids.length