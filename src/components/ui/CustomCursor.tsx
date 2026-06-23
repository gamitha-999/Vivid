'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useUIStore } from '@/store/uiStore'
import { useIsMobile } from '@/hooks/useMediaQuery'

export default function CustomCursor() {
  const cursorVariant = useUIStore((s) => s.cursorVariant)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  const trailX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const trailY = useSpring(mouseY, { stiffness: 80, damping: 20 })

  const createParticle = useCallback((x: number, y: number) => {
    const particle = document.createElement('div')
    particle.className = 'fixed pointer-events-none rounded-full bg-white/30 w-1 h-1 z-[9998]'
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    document.body.appendChild(particle)

    const angle = Math.random() * Math.PI * 2
    const velocity = 2 + Math.random() * 3
    const dx = Math.cos(angle) * velocity
    const dy = Math.sin(angle) * velocity
    let opacity = 0.8
    let life = 0

    const animate = () => {
      life++
      opacity -= 0.04
      particle.style.transform = `translate(${dx * life}px, ${dy * life}px)`
      particle.style.opacity = String(Math.max(0, opacity))
      if (opacity <= 0) {
        particle.remove()
      } else {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handlePointerMove = (e: PointerEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handlePointerDown = (e: PointerEvent) => {
      for (let i = 0; i < 3; i++) {
        createParticle(e.clientX, e.clientY)
      }
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isMobile, mouseX, mouseY, createParticle])

  useEffect(() => {
    if (isMobile) return

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      const tag = target.tagName.toLowerCase()
      if (['a', 'button', 'input', 'textarea', 'select'].includes(tag)) {
        useUIStore.getState().setCursorVariant('pointer')
      } else {
        useUIStore.getState().setCursorVariant('default')
      }
    }

    window.addEventListener('mouseover', handleMouseOver)
    return () => window.removeEventListener('mouseover', handleMouseOver)
  }, [isMobile])

  if (isMobile) return null

  const variants: Record<string, React.CSSProperties> = {
    default: { width: 12, height: 12, background: 'rgba(255,255,255,0.5)', mixBlendMode: 'difference' as const },
    pointer: { width: 32, height: 32, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', mixBlendMode: 'difference' as const },
    text: { width: 6, height: 24, background: 'rgba(255,255,255,0.6)', borderRadius: '3px', mixBlendMode: 'difference' as const },
    magnetic: { width: 48, height: 48, background: 'rgba(0,113,227,0.15)', border: '1px solid rgba(0,113,227,0.4)' },
    hidden: { width: 0, height: 0, opacity: 0 },
  }

  const currentVariant = variants[cursorVariant] || variants.default

  return (
    <>
      <motion.div
        ref={trailRef}
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          left: trailX,
          top: trailY,
          x: '-50%',
          y: '-50%',
          width: 24,
          height: 24,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      />
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        style={{
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          ...currentVariant,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      />
    </>
  )
}
