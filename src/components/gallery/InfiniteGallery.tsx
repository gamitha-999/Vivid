'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useMediaQuery'

const SAMPLE_IMAGES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  url: `/api/placeholder/${800 + i * 10}/${600 + i * 5}`,
  title: `Photo ${i + 1}`,
  filter: ['Vivid', 'Dramatic', 'Mono', 'Noir', 'Silvertone', 'Vivid Warm', 'Dramatic Cool', 'Vivid Cool'][i % 8],
}))

export default function InfiniteGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const duplicatedImages = [...SAMPLE_IMAGES, ...SAMPLE_IMAGES, ...SAMPLE_IMAGES]

  return (
    <section className="relative w-full overflow-hidden py-10 md:py-16">
      <div className="mb-6 md:mb-8 px-4 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white"
        >
          Filter Gallery
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm md:text-base text-white/40 mt-1 md:mt-2"
        >
          Scroll through the collection
        </motion.p>
      </div>

      <div
        ref={containerRef}
        className="flex gap-3 md:gap-6 overflow-x-auto px-4 md:px-12 pb-4 md:pb-8 hide-scrollbar snap-scroll"
      >
        {duplicatedImages.map((img, index) => (
          <motion.div
            key={`${img.id}-${index}`}
            className="flex-shrink-0 snap-start w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] group active:scale-[0.98] transition-transform touch-callout-none"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 12) * 0.03, duration: 0.4 }}
          >
            <div className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                {isMobile ? (
                  <div className="text-center px-4">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                      <span className="text-white/40 text-base font-medium">{img.id + 1}</span>
                    </div>
                    <p className="text-white/30 text-[10px]">{img.filter}</p>
                  </div>
                ) : (
                  <motion.div
                    className="w-full h-full flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                        <span className="text-white/40 text-lg font-medium">{img.id + 1}</span>
                      </div>
                      <p className="text-white/30 text-xs">{img.filter}</p>
                    </div>
                  </motion.div>
                )}

                <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-white text-xs font-medium">{img.filter}</span>
                    <span className="text-white/60 text-xs">#{img.id + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </section>
  )
}
