'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/useMediaQuery'

interface GlassButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  icon?: ReactNode
}

export default function GlassButton({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
}: GlassButtonProps) {
  const isMobile = useIsMobile()

  const sizeStyles = {
    sm: 'px-3 md:px-4 py-2 md:py-2 text-[10px] md:text-xs gap-1 md:gap-1.5 min-h-[36px]',
    md: 'px-4 md:px-6 py-2.5 md:py-3 text-xs md:text-sm gap-1.5 md:gap-2 min-h-[44px]',
    lg: 'px-6 md:px-8 py-3 md:py-4 text-sm md:text-base gap-2 md:gap-2.5 min-h-[48px]',
  }

  const variantStyles = {
    primary:
      'bg-white/10 backdrop-blur-xl border border-white/20 text-white active:bg-white/20 md:hover:bg-white/20 shadow-lg',
    secondary:
      'bg-white/5 backdrop-blur-xl border border-white/10 text-white/80 active:bg-white/10 active:text-white md:hover:bg-white/10 md:hover:text-white',
    ghost:
      'bg-transparent border border-transparent text-white/60 active:text-white active:bg-white/5 md:hover:text-white md:hover:bg-white/5',
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl font-medium',
        'overflow-hidden select-none touch-callout-none',
        'transition-colors duration-200',
        'active:scale-[0.97]',
        sizeStyles[size],
        variantStyles[variant],
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
      whileHover={!isMobile ? { scale: 1.02 } : undefined}
      whileTap={!isMobile ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {!isMobile && (
        <motion.span
          className="absolute inset-0 rounded-xl bg-white/5"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}
