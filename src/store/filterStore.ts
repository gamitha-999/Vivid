import { create } from 'zustand'
import { FilterName } from '@/lib/constants'

interface FilterState {
  activeFilter: FilterName
  intensity: number
  favoriteFilters: FilterName[]
  compareMode: boolean
  setActiveFilter: (filter: FilterName) => void
  setIntensity: (intensity: number) => void
  toggleFavorite: (filter: FilterName) => void
  setCompareMode: (value: boolean) => void
  reset: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  activeFilter: 'Original',
  intensity: 1,
  favoriteFilters: [],
  compareMode: false,
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setIntensity: (intensity) => set({ intensity }),
  toggleFavorite: (filter) =>
    set((state) => ({
      favoriteFilters: state.favoriteFilters.includes(filter)
        ? state.favoriteFilters.filter((f) => f !== filter)
        : [...state.favoriteFilters, filter],
    })),
  setCompareMode: (value) => set({ compareMode: value }),
  reset: () =>
    set({
      activeFilter: 'Original',
      intensity: 1,
      compareMode: false,
    }),
}))
