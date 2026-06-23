'use client'

import { Camera } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-16 md:mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Camera className="w-4 h-4 md:w-5 md:h-5 text-[#0071e3]" />
              <span className="text-xs md:text-sm font-semibold text-white">iPhone Filters Studio</span>
            </div>
            <p className="text-[10px] md:text-xs text-white/30 leading-relaxed max-w-xs">
              Preview Apple iPhone camera filters in real time. Upload your photos and explore every preset.
            </p>
          </div>

          {[
            {
              title: 'Product',
              links: ['Filters', 'Gallery', 'Upload', 'Export'],
            },
            {
              title: 'Resources',
              links: ['Documentation', 'API', 'Changelog', 'Status'],
            },
            {
              title: 'Company',
              links: ['About', 'Blog', 'Privacy', 'Contact'],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-[10px] md:text-xs font-medium text-white/50 uppercase tracking-wider mb-3 md:mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2 md:space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[10px] md:text-xs text-white/30 active:text-white/70 md:hover:text-white/70 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-[10px] md:text-xs text-white/20 text-center sm:text-left">
            &copy; {new Date().getFullYear()} iPhone Filters Studio. Not affiliated with Apple Inc.
          </p>
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href="#"
              className="text-white/20 active:text-white/50 md:hover:text-white/50 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a
              href="#"
              className="text-white/20 active:text-white/50 md:hover:text-white/50 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
