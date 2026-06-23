'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useImageStore } from '@/store/imageStore'
import { useFilterStore } from '@/store/filterStore'
import { FILTER_PRESETS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Maximize2, Minimize2 } from 'lucide-react'

export default function FilterPreview() {
  const { originalImage, originalImageUrl } = useImageStore()
  const { activeFilter, intensity, compareMode } = useFilterStore()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [splitPos, setSplitPos] = useState(50)
  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !imageRef.current) return
      const rect = imageRef.current.getBoundingClientRect()
      const x = ((clientX - rect.left) / rect.width) * 100
      setSplitPos(Math.min(Math.max(x, 5), 95))
    },
    [isDragging]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handleMove(e.clientX),
    [handleMove]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isDragging && e.touches[0]) {
        e.preventDefault()
        handleMove(e.touches[0].clientX)
      }
    },
    [isDragging, handleMove]
  )

  useEffect(() => {
    if (!isFullscreen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isFullscreen])

  if (!originalImage || !originalImageUrl) return null

  const activeFilterConfig = FILTER_PRESETS.find((f) => f.name === activeFilter)
  const cssFilter = activeFilterConfig?.css
    ? activeFilterConfig.css
        .split(' ')
        .map((part) => {
          const [func, val] = part.split('(')
          if (func && val) {
            const numVal = parseFloat(val.replace(')', ''))
            if (!isNaN(numVal)) {
              const applied =
                activeFilter === 'Original' ? 0 : intensity * numVal
              if (func === 'brightness') return `brightness(${applied})`
              if (func === 'contrast') return `contrast(${applied})`
              if (func === 'saturate') return `saturate(${applied})`
              if (func === 'sepia') return `sepia(${applied})`
              if (func === 'grayscale') return `grayscale(${Math.min(applied, 1)})`
              if (func === 'hue-rotate') return `hue-rotate(${applied}deg)`
            }
          }
          return part
        })
        .join(' ')
    : ''

  return (
    <div className="relative w-full">
      <motion.div
        ref={imageRef}
        className={cn(
          'relative w-full overflow-hidden bg-black/40 border border-white/5',
          'rounded-2xl md:rounded-3xl',
          isFullscreen && 'fixed inset-0 md:inset-4 z-50 rounded-none md:rounded-2xl'
        )}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter + intensity}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <img
              src={originalImageUrl}
              alt="Filter preview"
              className="w-full h-full object-contain max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] select-none"
              draggable={false}
              style={{ filter: cssFilter || undefined }}
            />

            {compareMode && activeFilter !== 'Original' && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - splitPos}% 0 0)` }}
              >
                <img
                  src={originalImageUrl}
                  alt="Original"
                  className="w-full h-full object-contain max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] select-none"
                  draggable={false}
                />
                <div
                  className="absolute top-0 bottom-0"
                  style={{ left: `${splitPos}%`, width: '2px' }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/80 shadow-lg flex items-center justify-center cursor-ew-resize">
                    <div className="w-4 h-0.5 bg-black/40 rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {compareMode && activeFilter !== 'Original' && (
          <div
            className="absolute inset-0 cursor-ew-resize z-10 touch-none"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
          />
        )}

        <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 active:bg-white/20 md:hover:bg-white/10 transition-all"
            style={{ minWidth: 36, minHeight: 36 }}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/70" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/70" />
            )}
          </button>
        </div>

        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4">
          <span className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs text-white/60">
            {activeFilter}
            {intensity < 1 && ` (${Math.round(intensity * 100)}%)`}
          </span>
        </div>

        {compareMode && activeFilter !== 'Original' && (
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 flex gap-1 text-[10px] sm:text-xs">
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-white/10 text-white/60">Filtered</span>
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-white/10 text-white/60">Original</span>
          </div>
        )}
      </motion.div>
    </div>
  )
}
