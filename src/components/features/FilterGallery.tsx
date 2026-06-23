'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useFilterStore } from '@/store/filterStore'
import { useImageStore } from '@/store/imageStore'
import { FILTER_NAMES, FILTER_PRESETS, FilterName } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Heart } from 'lucide-react'

export default function FilterGallery() {
  const { activeFilter, setActiveFilter, favoriteFilters, toggleFavorite } =
    useFilterStore()
  const { originalImage } = useImageStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [thumbnails, setThumbnails] = useState<Map<FilterName, string>>(new Map())

  useEffect(() => {
    if (!originalImage) return

    const generateThumbnails = async () => {
      const newThumbnails = new Map<FilterName, string>()
      const batchSize = 3

      for (let i = 0; i < FILTER_NAMES.length; i += batchSize) {
        const batch = FILTER_NAMES.slice(i, i + batchSize)
        await new Promise((r) => requestAnimationFrame(r))

        for (const filterName of batch) {
          const canvas = document.createElement('canvas')
          const maxSize = 120
          const scale = Math.min(maxSize / originalImage.naturalWidth, maxSize / originalImage.naturalHeight, 1)
          canvas.width = originalImage.naturalWidth * scale
          canvas.height = originalImage.naturalHeight * scale
          const ctx = canvas.getContext('2d')!
          ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height)

          const filter = FILTER_PRESETS.find((f) => f.name === filterName)
          if (filter && filter.css) {
            ctx.filter = filter.css
            ctx.drawImage(canvas, 0, 0)
            ctx.filter = 'none'
          }

          newThumbnails.set(filterName, canvas.toDataURL('image/jpeg', 0.7))
        }
      }

      setThumbnails(newThumbnails)
    }

    generateThumbnails()
  }, [originalImage])

  const handleFilterSelect = (name: FilterName) => {
    setActiveFilter(name)
    const el = document.getElementById(`filter-${name}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 md:mb-4 px-1">
        <h3 className="text-xs md:text-sm font-medium text-white/60 uppercase tracking-wider">
          Filters
        </h3>
        <span className="text-[10px] md:text-xs text-white/30">
          {FILTER_NAMES.length} presets
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-3 hide-scrollbar snap-scroll"
      >
        {FILTER_NAMES.map((name, index) => {
          const isActive = activeFilter === name
          const isFavorite = favoriteFilters.includes(name)
          const thumb = thumbnails.get(name)

          return (
            <motion.button
              key={name}
              id={`filter-${name}`}
              onClick={() => handleFilterSelect(name)}
              className={cn(
                'relative flex-shrink-0 snap-start group touch-callout-none select-none',
                'w-[90px] sm:w-[100px] md:w-[110px]',
                'rounded-xl md:rounded-2xl overflow-hidden transition-all duration-200',
                isActive
                  ? 'ring-2 ring-[#0071e3] ring-offset-1 md:ring-offset-2 ring-offset-black/80 scale-[1.02]'
                  : 'active:scale-[0.97] md:hover:scale-[1.02]'
              )}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-[4/3] bg-white/5 relative overflow-hidden rounded-t-xl md:rounded-t-2xl">
                {thumb ? (
                  <img
                    src={thumb}
                    alt={`${name} filter`}
                    className="w-full h-full object-cover"
                    draggable={false}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                  </div>
                )}

                {isActive && (
                  <motion.div
                    layoutId="activeFilterIndicator"
                    className="absolute inset-0 border-2 border-white/20"
                  />
                )}
              </div>

              <div className="p-1.5 md:p-2 bg-white/5">
                <p className="text-[10px] md:text-[11px] font-medium text-white/80 truncate text-center">
                  {name}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(name)
                }}
                className={cn(
                  'absolute top-1.5 right-1.5 p-1 rounded-full transition-all duration-200',
                  'opacity-0 md:group-hover:opacity-100',
                  isFavorite && 'opacity-100'
                )}
                style={{ minWidth: 28, minHeight: 28 }}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  className={cn(
                    'w-2.5 h-2.5 md:w-3 md:h-3 transition-colors',
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-white/60'
                  )}
                />
              </button>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
