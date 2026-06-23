'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Menu, X, Home, Image, Info, Upload } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useUIStore } from '@/store/uiStore'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Home', href: '#', icon: Home },
  { label: 'Filters', href: '#filters', icon: Image },
  { label: 'Upload', href: '#upload', icon: Upload },
  { label: 'About', href: '#about', icon: Info },
]

function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="glass rounded-t-3xl border-b-0 border-t border-white/10 px-2 py-1">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px] min-h-[44px] rounded-xl text-white/40 hover:text-white/80 transition-colors active:text-white"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[9px] font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

function MobileMenu() {
  const { isMobileNavOpen, toggleMobileNav } = useUIStore()

  return (
    <AnimatePresence>
      {isMobileNavOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 md:hidden"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={toggleMobileNav} />
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-3/4 max-w-xs glass rounded-l-3xl p-6 pt-safe flex flex-col"
          >
            <button
              onClick={toggleMobileNav}
              className="self-end mb-8 p-2 rounded-xl hover:bg-white/5 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-white/60" />
            </button>

            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={toggleMobileNav}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all active:scale-[0.98]"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-white/5">
              <div className="flex items-center justify-between px-4">
                <span className="text-xs text-white/30">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Header() {
  const { toggleMobileNav } = useUIStore()
  const isMobile = useIsMobile()

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="mx-auto px-3 md:px-8 py-1.5 md:py-3">
          <div
            className={cn(
              'glass rounded-2xl px-4 md:px-5 py-2.5 md:py-3 flex items-center justify-between max-w-7xl mx-auto',
              !isMobile && 'rounded-2xl'
            )}
          >
            <motion.a
              href="/"
              className="flex items-center gap-2 md:gap-3 min-h-[44px]"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-[#0071e3] to-[#40a9ff] flex items-center justify-center shadow-lg flex-shrink-0">
                <Camera className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-sm font-semibold text-white tracking-tight">
                  iPhone Filters
                </span>
                <span className="text-[10px] text-white/40 block -mt-0.5">
                  Studio
                </span>
              </div>
            </motion.a>

            <nav className="hidden md:flex items-center gap-6">
              {['Filters', 'Gallery', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-xs text-white/50 hover:text-white/90 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <span className="hidden md:block">
                <ThemeToggle />
              </span>
              <button
                onClick={toggleMobileNav}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl glass active:scale-95 transition-transform"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-white/70" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu />
      <BottomNav />
    </>
  )
}
