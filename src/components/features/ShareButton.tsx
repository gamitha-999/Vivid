'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import { useImageStore } from '@/store/imageStore'
import { useFilterStore } from '@/store/filterStore'

export default function ShareButton() {
  const { originalImageUrl } = useImageStore()
  const { activeFilter } = useFilterStore()
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    if (!originalImageUrl) return

    if (navigator.share) {
      try {
        const response = await fetch(originalImageUrl)
        const blob = await response.blob()
        const file = new File([blob], `iphone-filter-${activeFilter}.jpg`, {
          type: 'image/jpeg',
        })
        await navigator.share({
          title: `iPhone ${activeFilter} Filter`,
          text: `Check out this photo with the ${activeFilter} iPhone filter!`,
          files: [file],
        })
      } catch {
        try {
          await navigator.clipboard.writeText(
            `Created with iPhone Filters Studio - ${activeFilter} filter`
          )
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch {
          // ignore
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `Created with iPhone Filters Studio - ${activeFilter} filter`
        )
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // ignore
      }
    }
  }

  if (!originalImageUrl) return null

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-2 rounded-xl glass text-xs md:text-sm text-white/70 active:text-white md:hover:text-white transition-all active:scale-[0.97] min-h-[44px] touch-callout-none select-none"
      aria-label="Share image"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-400" />
      ) : (
        <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
      )}
      <span>{copied ? 'Copied!' : 'Share'}</span>
    </button>
  )
}
