'use client'

import { motion } from 'framer-motion'
import { useFilterStore } from '@/store/filterStore'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CompareToggle() {
  const { compareMode, setCompareMode, activeFilter } = useFilterStore()

  if (activeFilter === 'Original') return null

  return (
    <motion.button
      onClick={() => setCompareMode(!compareMode)}
      className={cn(
        'flex items-center justify-center gap-1.5 md:gap-2',
        'px-3 md:px-4 py-2.5 md:py-2',
        'rounded-xl glass text-xs md:text-sm text-white/70',
        'active:text-white md:hover:text-white transition-all',
        'active:scale-[0.97] touch-callout-none select-none',
        'min-h-[44px]'
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={compareMode ? 'Disable compare mode' : 'Enable compare mode'}
      aria-pressed={compareMode}
    >
      {compareMode ? (
        <EyeOff className="w-3.5 h-3.5 md:w-4 md:h-4" />
      ) : (
        <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
      )}
      <span className="hidden sm:inline">
        {compareMode ? 'Hide Original' : 'Compare'}
      </span>
      <span className="sm:hidden">
        {compareMode ? 'Original' : 'Compare'}
      </span>
    </motion.button>
  )
}
