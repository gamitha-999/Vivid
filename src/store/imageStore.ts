import { create } from 'zustand'

interface ImageState {
  originalImage: HTMLImageElement | null
  originalImageUrl: string | null
  processedImageUrl: string | null
  isUploading: boolean
  error: string | null
  setOriginalImage: (img: HTMLImageElement, url: string) => void
  setProcessedImageUrl: (url: string | null) => void
  setIsUploading: (value: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useImageStore = create<ImageState>((set) => ({
  originalImage: null,
  originalImageUrl: null,
  processedImageUrl: null,
  isUploading: false,
  error: null,
  setOriginalImage: (img, url) =>
    set({ originalImage: img, originalImageUrl: url, error: null }),
  setProcessedImageUrl: (url) => set({ processedImageUrl: url }),
  setIsUploading: (value) => set({ isUploading: value }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      originalImage: null,
      originalImageUrl: null,
      processedImageUrl: null,
      isUploading: false,
      error: null,
    }),
}))
