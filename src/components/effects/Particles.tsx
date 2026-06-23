'use client'

import { useEffect, useRef } from 'react'
import { useIsMobile } from '@/hooks/useMediaQuery'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
}

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animRef = useRef<number>(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let running = true
    const particleCount = 40

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouse)

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2 - 0.05,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.2 + 0.05,
      life: 0,
      maxLife: 400 + Math.random() * 400,
    })

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle())
    }

    const animate = () => {
      if (!running) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x: mx, y: my } = mouseRef.current

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i]
        p.life++
        if (p.life > p.maxLife) {
          particlesRef.current[i] = createParticle()
          continue
        }

        p.x += p.vx
        p.y += p.vy

        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.015
          p.vx -= dx * force
          p.vy -= dy * force
        }

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        const fadeIn = Math.min(p.life / 60, 1)
        const fadeOut = Math.max(1 - (p.life - p.maxLife + 60) / 60, 0)
        const totalOpacity = p.opacity * fadeIn * fadeOut

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${totalOpacity})`
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      running = false
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      particlesRef.current = []
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
