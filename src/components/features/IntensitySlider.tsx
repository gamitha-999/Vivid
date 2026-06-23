'use client'

import { motion } from 'framer-motion'
import { useFilterStore } from '@/store/filterStore'
import { Sliders } from 'lucide-react'

export default function IntensitySlider() {
  const { intensity, setIntensity, activeFilter } = useFilterStore()

  if (activeFilter === 'Original') return null

  return (
    <div className="flex items-center gap-2 md:gap-3 py-1">
      <Sliders className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/40 flex-shrink-0" />
      <div className="flex-1 relative">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={intensity}
          onChange={(e) => setIntensity(parseFloat(e.target.value))}
          className="w-full h-1.5 md:h-1 appearance-none bg-white/10 rounded-full outline-none
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:md:w-4 [&::-webkit-slider-thumb]:md:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150
            [&::-webkit-slider-thumb]:active:scale-110
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:md:w-4 [&::-moz-range-thumb]:md:h-4
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:border-0"
          aria-label="Filter intensity"
        />
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-white/30 to-white/50 pointer-events-none"
          style={{ width: `${intensity * 100}%` }}
        />
      </div>
      <span className="text-[11px] md:text-xs text-white/40 w-8 text-right tabular-nums tabular-nums">
        {Math.round(intensity * 100)}%
      </span>
    </div>
  )
}
