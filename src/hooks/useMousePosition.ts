'use client'

import { useState, useEffect, useCallback } from 'react'

interface MousePosition {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
  velocity: number
}

export function useMousePosition() {
  const [mousePos, setMousePos] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    velocity: 0,
  })

  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const dx = e.clientX - lastPos.x
      const dy = e.clientY - lastPos.y
      const velocity = Math.sqrt(dx * dx + dy * dy)

      setMousePos({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: (e.clientY / window.innerHeight) * 2 - 1,
        velocity,
      })
      setLastPos({ x: e.clientX, y: e.clientY })
    },
    [lastPos]
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return mousePos
}
