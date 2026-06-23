import { create } from 'zustand'

interface UIState {
  darkMode: boolean
  isFullscreen: boolean
  isGalleryOpen: boolean
  isMobileNavOpen: boolean
  scrollProgress: number
  isTouchDevice: boolean
  setDarkMode: (value: boolean) => void
  toggleDarkMode: () => void
  setIsFullscreen: (value: boolean) => void
  toggleFullscreen: () => void
  setGalleryOpen: (value: boolean) => void
  setMobileNavOpen: (value: boolean) => void
  toggleMobileNav: () => void
  setScrollProgress: (value: number) => void
  setIsTouchDevice: (value: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  darkMode: true,
  isFullscreen: false,
  isGalleryOpen: false,
  isMobileNavOpen: false,
  scrollProgress: 0,
  isTouchDevice: false,
  setDarkMode: (value) => set({ darkMode: value }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setIsFullscreen: (value) => set({ isFullscreen: value }),
  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
  setGalleryOpen: (value) => set({ isGalleryOpen: value }),
  setMobileNavOpen: (value) => set({ isMobileNavOpen: value }),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  setScrollProgress: (value) => set({ scrollProgress: value }),
  setIsTouchDevice: (value) => set({ isTouchDevice: value }),
}))
