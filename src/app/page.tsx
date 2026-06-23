'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Camera, Sparkles, ArrowDown, Download } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/layout/ScrollProgress'
import ImageUpload from '@/components/features/ImageUpload'
import FilterPreview from '@/components/features/FilterPreview'
import FilterGallery from '@/components/features/FilterGallery'
import CompareToggle from '@/components/features/CompareSlider'
import ExportPanel from '@/components/features/ExportPanel'
import IntensitySlider from '@/components/features/IntensitySlider'
import ShareButton from '@/components/features/ShareButton'
import Hero3D from '@/components/three/Hero3D'
import InfiniteGallery from '@/components/gallery/InfiniteGallery'
import MasonryGrid from '@/components/gallery/MasonryGrid'
import { useImageStore } from '@/store/imageStore'
import { useIsMobile } from '@/hooks/useMediaQuery'

function HeroSection() {
  const { scrollY } = useScroll()
  const isMobile = useIsMobile()
  const y = useTransform(scrollY, [0, 300], [0, 80])
  const opacity = useTransform(scrollY, [0, 250], [1, 0])

  return (
    <section className="relative min-h-[80dvh] md:min-h-dvh flex flex-col items-center justify-center px-4 md:px-6 pt-16 md:pt-20 pb-8 md:pb-10 overflow-hidden">
      <motion.div style={!isMobile ? { y, opacity } : undefined} className="relative z-10 text-center max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 md:mb-6"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs text-white/50"
          >
            <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#0071e3]" />
            iPhone Filters Studio
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[1.05] mb-3 md:mb-6 px-2"
        >
          <span className="text-white">Preview iPhone</span>
          <br />
          <span className="text-gradient-blue">Filters Instantly</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/40 max-w-2xl mx-auto mb-6 md:mb-10 leading-relaxed px-4"
        >
          Upload your photo and experience every Apple iPhone camera preset
          in real time. Cinematic filters, instant preview.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 px-4"
        >
          <a
            href="#upload"
            className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-[#0071e3] text-white font-medium text-sm md:text-base hover:bg-[#0077ed] transition-all shadow-lg shadow-[#0071e3]/25 active:scale-[0.97] min-h-[44px]"
          >
            <Camera className="w-4 h-4" />
            Start Editing
          </a>
          <a
            href="#filters"
            className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl glass text-white/70 text-sm md:text-base active:text-white md:hover:text-white md:hover:bg-white/10 transition-all active:scale-[0.97] min-h-[44px]"
          >
            View Filters
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 md:mt-16 flex items-center justify-center gap-4 md:gap-8 text-[10px] md:text-xs text-white/20 flex-wrap"
        >
          {['10 Filters', 'Real-time Preview', 'Full Resolution', 'Free'].map(
            (item) => (
              <span key={item} className="flex items-center gap-1.5 md:gap-2">
                <div className="w-1 h-1 rounded-full bg-[#0071e3]" />
                {item}
              </span>
            )
          )}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="w-4 h-4 md:w-5 md:h-5 text-white/20" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-[#0071e3]/5 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-purple-500/5 rounded-full blur-[80px] md:blur-[120px]" />
      </div>
    </section>
  )
}

function EditorSection() {
  const { originalImageUrl } = useImageStore()

  return (
    <section id="upload" className="relative py-10 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
            {originalImageUrl ? 'Edit Your Photo' : 'Upload Your Photo'}
          </h2>
          <p className="text-sm md:text-base text-white/40 mt-1 md:mt-2">
            {originalImageUrl
              ? 'Apply and customize iPhone filters below'
              : 'Drag and drop to get started'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
          <div className="lg:col-span-3">
            <ImageUpload />
            {originalImageUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 md:mt-6"
              >
                <FilterPreview />
              </motion.div>
            )}
          </div>

          {originalImageUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="lg:col-span-2 space-y-3 md:space-y-4"
            >
              <div className="glass rounded-xl md:rounded-2xl p-4 md:p-5 space-y-3 md:space-y-5">
                <h3 className="text-[10px] md:text-xs font-medium text-white/50 uppercase tracking-wider">
                  Controls
                </h3>
                <IntensitySlider />
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2 pt-3 md:pt-2 border-t border-white/5">
                  <CompareToggle />
                  <ShareButton />
                  <ExportPanel />
                </div>
              </div>

              <div className="glass rounded-xl md:rounded-2xl p-4 md:p-5">
                <FilterGallery />
              </div>

              <div className="glass rounded-xl md:rounded-2xl p-4 md:p-5 hidden md:block">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[10px] md:text-xs font-medium text-white/50 uppercase tracking-wider">
                    Quick Tips
                  </h3>
                </div>
                <ul className="space-y-2 text-[10px] md:text-xs text-white/40">
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#0071e3] mt-1.5 flex-shrink-0" />
                    Tap any filter to preview instantly
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#0071e3] mt-1.5 flex-shrink-0" />
                    Drag the intensity slider for custom strength
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#0071e3] mt-1.5 flex-shrink-0" />
                    Use Compare to see before/after
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#0071e3] mt-1.5 flex-shrink-0" />
                    Export in PNG or JPG full resolution
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <Hero3D />
        <EditorSection />

        <section id="gallery">
          <InfiniteGallery />
        </section>

        <section id="filters">
          <MasonryGrid />
        </section>

        <section className="relative py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Download className="w-8 h-8 md:w-10 md:h-10 text-[#0071e3] mx-auto mb-4 md:mb-6" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-3 md:mb-4 px-4">
                Ready to Create?
              </h2>
              <p className="text-sm md:text-base text-white/40 mb-6 md:mb-8 max-w-lg mx-auto px-4">
                Upload your photo and start exploring all iPhone filters in
                real time. No sign-up required.
              </p>
              <a
                href="#upload"
                className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-[#0071e3] text-white font-medium text-sm md:text-base hover:bg-[#0077ed] transition-all shadow-lg shadow-[#0071e3]/25 active:scale-[0.97] min-h-[44px]"
              >
                <Camera className="w-4 h-4" />
                Get Started
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
