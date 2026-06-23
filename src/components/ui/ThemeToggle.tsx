'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useUIStore()

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full glass active:scale-95 transition-transform"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 0 : 180 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {darkMode ? (
          <Sun className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/80" />
        ) : (
          <Moon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/80" />
        )}
      </motion.div>
    </motion.button>
  )
}
