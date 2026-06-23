'use client'

import { type ReactNode, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  intensity?: 'light' | 'medium' | 'heavy'
  hover?: boolean
  glow?: boolean
}

export default function GlassCard({
  children,
  className,
  intensity = 'medium',
  hover = true,
  glow = false,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const intensityStyles = {
    light: 'bg-white/5 backdrop-blur-2xl border border-white/10',
    medium: 'bg-white/[0.06] backdrop-blur-[40px] saturate-[1.4] border border-white/[0.08]',
    heavy: 'bg-white/10 backdrop-blur-[60px] saturate-[1.6] border border-white/[0.12]',
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'rounded-2xl',
        intensityStyles[intensity],
        hover && 'transition-all duration-500',
        glow && 'shadow-[0_0_40px_-10px_rgba(0,113,227,0.3)]',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={
        hover
          ? {
              y: -4,
              transition: { duration: 0.3, ease: 'easeOut' },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  )
}
