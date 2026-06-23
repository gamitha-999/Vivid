'use client'

import { motion } from 'framer-motion'
import { FILTER_NAMES } from '@/lib/constants'

const FILTER_COLORS: Record<string, string> = {
  Original: 'from-blue-500/20 to-purple-500/20',
  Vivid: 'from-green-500/20 to-teal-500/20',
  'Vivid Warm': 'from-orange-500/20 to-yellow-500/20',
  'Vivid Cool': 'from-cyan-500/20 to-blue-500/20',
  Dramatic: 'from-red-500/20 to-orange-500/20',
  'Dramatic Warm': 'from-amber-500/20 to-red-500/20',
  'Dramatic Cool': 'from-indigo-500/20 to-blue-500/20',
  Mono: 'from-gray-500/20 to-zinc-500/20',
  Silvertone: 'from-slate-500/20 to-gray-500/20',
  Noir: 'from-neutral-500/20 to-stone-500/20',
}

const FILTER_DESCRIPTIONS: Record<string, string> = {
  Original: 'True-to-life colors, natural look',
  Vivid: 'Enhanced saturation and contrast',
  'Vivid Warm': 'Golden tones, warm glow',
  'Vivid Cool': 'Blue undertones, crisp feel',
  Dramatic: 'Deep shadows, rich contrast',
  'Dramatic Warm': 'Amber drama, moody warmth',
  'Dramatic Cool': 'Cool intensity, stark mood',
  Mono: 'Smooth grayscale, classic',
  Silvertone: 'Silver sheen, subtle sepia',
  Noir: 'Film noir, stark blacks',
}

export default function MasonryGrid() {
  return (
    <section className="relative w-full py-10 md:py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
            All Filters
          </h2>
          <p className="text-sm md:text-base text-white/40 mt-1 md:mt-2">
            Explore every iPhone camera preset
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
          {FILTER_NAMES.map((name, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03, duration: 0.4 }}
              className="group relative active:scale-[0.97] transition-transform"
            >
              <div className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${FILTER_COLORS[name]} opacity-50 md:group-hover:opacity-70 transition-opacity duration-500`}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 md:p-6 text-center">
                  <h3
                    className={`text-sm md:text-lg font-semibold mb-1 md:mb-2 ${
                      name === 'Original'
                        ? 'text-white'
                        : 'text-white/90'
                    }`}
                  >
                    {name}
                  </h3>
                  <p className="hidden md:block text-[10px] md:text-xs text-white/40 leading-relaxed">
                    {FILTER_DESCRIPTIONS[name]}
                  </p>
                </div>

                <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                      <span className="text-xs text-white/60">
                        {index === 0 ? 'Default' : 'Adjustable'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
