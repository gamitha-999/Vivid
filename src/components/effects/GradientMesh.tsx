'use client'

import { useEffect, useRef } from 'react'

export default function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      time += 0.002
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const w = canvas.width
      const h = canvas.height

      const gradient1 = ctx.createRadialGradient(
        w * (0.3 + Math.sin(time) * 0.1),
        h * (0.3 + Math.cos(time * 0.7) * 0.1),
        0,
        w * (0.3 + Math.sin(time) * 0.1),
        h * (0.3 + Math.cos(time * 0.7) * 0.1),
        w * 0.6
      )
      gradient1.addColorStop(0, 'rgba(0, 113, 227, 0.08)')
      gradient1.addColorStop(0.5, 'rgba(100, 50, 200, 0.04)')
      gradient1.addColorStop(1, 'rgba(0, 113, 227, 0)')

      const gradient2 = ctx.createRadialGradient(
        w * (0.7 + Math.cos(time * 0.5) * 0.1),
        h * (0.6 + Math.sin(time * 0.8) * 0.1),
        0,
        w * (0.7 + Math.cos(time * 0.5) * 0.1),
        h * (0.6 + Math.sin(time * 0.8) * 0.1),
        w * 0.5
      )
      gradient2.addColorStop(0, 'rgba(200, 50, 150, 0.06)')
      gradient2.addColorStop(0.5, 'rgba(150, 50, 200, 0.03)')
      gradient2.addColorStop(1, 'rgba(200, 50, 150, 0)')

      const gradient3 = ctx.createRadialGradient(
        w * (0.5 + Math.sin(time * 0.3) * 0.15),
        h * (0.8 + Math.cos(time * 0.6) * 0.1),
        0,
        w * (0.5 + Math.sin(time * 0.3) * 0.15),
        h * (0.8 + Math.cos(time * 0.6) * 0.1),
        w * 0.4
      )
      gradient3.addColorStop(0, 'rgba(0, 200, 255, 0.05)')
      gradient3.addColorStop(1, 'rgba(0, 200, 255, 0)')

      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = gradient3
      ctx.fillRect(0, 0, w, h)

      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  )
}
