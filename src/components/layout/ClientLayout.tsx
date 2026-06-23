'use client'

import { useEffect, type ReactNode } from 'react'
import { useUIStore } from '@/store/uiStore'
import { useIsMobile } from '@/hooks/useMediaQuery'
import CustomCursor from '@/components/ui/CustomCursor'
import NoiseOverlay from '@/components/effects/NoiseOverlay'
import Particles from '@/components/effects/Particles'
import GradientMesh from '@/components/effects/GradientMesh'
import AuroraLights from '@/components/effects/AuroraLights'

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { darkMode, setDarkMode, setIsTouchDevice } = useUIStore()
  const isMobile = useIsMobile()

  useEffect(() => {
    setIsTouchDevice(isMobile)
  }, [isMobile, setIsTouchDevice])

  useEffect(() => {
    const html = document.documentElement
    if (darkMode) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    setDarkMode(true)
  }, [setDarkMode])

  return (
    <>
      {!isMobile && <GradientMesh />}
      {!isMobile && <AuroraLights />}
      <Particles />
      <NoiseOverlay />
      {!isMobile && <CustomCursor />}
      {children}
    </>
  )
}
