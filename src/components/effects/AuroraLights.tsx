'use client'

import { useEffect, useRef } from 'react'

export default function AuroraLights() {
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
      time += 0.003
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const w = canvas.width
      const h = canvas.height

      for (let i = 0; i < 4; i++) {
        const offset = i * (Math.PI / 2)
        const x = w * (0.2 + Math.sin(time * 0.3 + offset) * 0.3 + 0.3)
        const y = h * (0.3 + Math.cos(time * 0.4 + offset) * 0.2 + 0.2)

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, w * 0.4)
        const hue = (time * 20 + i * 90) % 360
        gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, 0.04)`)
        gradient.addColorStop(0.5, `hsla(${(hue + 40) % 360}, 60%, 50%, 0.02)`)
        gradient.addColorStop(1, `hsla(${hue}, 50%, 40%, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
      }

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
