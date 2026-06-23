'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface ParallaxOptions {
  speed?: number
  reverse?: boolean
  axis?: 'x' | 'y' | 'both'
}

export function useParallax<T extends HTMLElement>({
  speed = 0.1,
  reverse = false,
  axis = 'both',
}: ParallaxOptions = {}) {
  const targetRef = useRef<T>(null!)

  useEffect(() => {
    const element = targetRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const factor = reverse ? -speed : speed
      const x = (e.clientX - window.innerWidth / 2) * factor
      const y = (e.clientY - window.innerHeight / 2) * factor

      gsap.to(element, {
        x: axis === 'both' || axis === 'x' ? x : 0,
        y: axis === 'both' || axis === 'y' ? y : 0,
        duration: 1,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [speed, reverse, axis])

  return targetRef
}
