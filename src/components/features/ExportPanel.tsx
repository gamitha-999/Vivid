'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { useImageStore } from '@/store/imageStore'
import { useFilterStore } from '@/store/filterStore'
import { FILTER_PRESETS } from '@/lib/constants'
import { generateFilename } from '@/lib/utils'
import GlassButton from '@/components/ui/GlassButton'

export default function ExportPanel() {
  const { originalImage, originalImageUrl } = useImageStore()
  const { activeFilter } = useFilterStore()
  const [isExporting, setIsExporting] = useState(false)
  const [format, setFormat] = useState<'png' | 'jpg'>('png')

  const handleExport = async () => {
    if (!originalImage || !originalImageUrl) return
    setIsExporting(true)

    try {
      const canvas = document.createElement('canvas')
      canvas.width = originalImage.naturalWidth
      canvas.height = originalImage.naturalHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(originalImage, 0, 0)

      const filterConfig = FILTER_PRESETS.find((f) => f.name === activeFilter)
      if (filterConfig?.css && activeFilter !== 'Original') {
        ctx.filter = filterConfig.css
        ctx.drawImage(canvas, 0, 0)
        ctx.filter = 'none'
      }

      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg'
      const quality = format === 'jpg' ? 0.95 : undefined
      const dataUrl = canvas.toDataURL(mimeType, quality)

      const link = document.createElement('a')
      link.download = generateFilename(activeFilter, format)
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setIsExporting(false)
    }
  }

  if (!originalImage) return null

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <div className="flex rounded-xl border border-white/10 overflow-hidden">
        <button
          onClick={() => setFormat('png')}
          className={`px-2.5 md:px-3 py-2 md:py-1.5 text-[10px] md:text-xs font-medium transition-all min-h-[36px] ${
            format === 'png'
              ? 'bg-white/15 text-white'
              : 'text-white/40 active:text-white/60 md:hover:text-white/60'
          }`}
        >
          PNG
        </button>
        <button
          onClick={() => setFormat('jpg')}
          className={`px-2.5 md:px-3 py-2 md:py-1.5 text-[10px] md:text-xs font-medium transition-all min-h-[36px] ${
            format === 'jpg'
              ? 'bg-white/15 text-white'
              : 'text-white/40 active:text-white/60 md:hover:text-white/60'
          }`}
        >
          JPG
        </button>
      </div>

      <GlassButton
        onClick={handleExport}
        disabled={isExporting}
        icon={
          isExporting ? (
            <Loader2 className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
          )
        }
        size="sm"
      >
        {isExporting ? 'Exporting...' : 'Export'}
      </GlassButton>
    </div>
  )
}
