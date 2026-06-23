'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image as ImageIcon } from 'lucide-react'
import { useImageStore } from '@/store/imageStore'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { SUPPORTED_FORMATS, MAX_FILE_SIZE } from '@/lib/constants'

export default function ImageUpload() {
  const [isDragOver, setIsDragOver] = useState(false)
  const { setOriginalImage, originalImageUrl, setIsUploading, setError } =
    useImageStore()
  const isMobile = useIsMobile()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      if (!SUPPORTED_FORMATS.includes(file.type)) {
        setError('Unsupported format. Please upload JPG, PNG, or WEBP.')
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('File too large. Maximum size is 20MB.')
        return
      }

      setIsUploading(true)
      try {
        const url = URL.createObjectURL(file)
        const img = new Image()
        img.onload = () => {
          setOriginalImage(img, url)
          setIsUploading(false)
        }
        img.onerror = () => {
          setError('Failed to load image.')
          setIsUploading(false)
        }
        img.src = url
      } catch {
        setError('Failed to process image.')
        setIsUploading(false)
      }
    },
    [setOriginalImage, setIsUploading, setError]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
  })

  return (
    <AnimatePresence mode="wait">
      {originalImageUrl ? null : (
        <motion.div
          key="upload-area"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <div
            {...getRootProps()}
            className={`
              relative flex flex-col items-center justify-center w-full
              min-h-[200px] sm:min-h-[260px] md:min-h-[300px]
              rounded-2xl sm:rounded-3xl
              border-2 border-dashed transition-all duration-500
              active:scale-[0.99] touch-callout-none select-none
              ${
                isDragActive || isDragOver
                  ? 'border-[#0071e3] bg-[#0071e3]/5'
                  : 'border-white/10 active:border-white/25 md:hover:border-white/25 bg-white/[0.03]'
              }
            `}
          >
            <input {...getInputProps()} aria-label="Upload image" />
            <motion.div
              className="flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-8 md:p-12 text-center"
              animate={{ scale: isDragActive ? 1.03 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="relative"
                animate={{ y: isDragActive ? -6 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.06] flex items-center justify-center border border-white/10">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white/40" />
                </div>
                <motion.div
                  className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0071e3] flex items-center justify-center"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ImageIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </motion.div>
              </motion.div>

              <div>
                <p className="text-base sm:text-lg font-medium text-white/80 mb-0.5">
                  {isMobile ? 'Tap to upload' : 'Drop your image here'}
                </p>
                <p className="text-xs sm:text-sm text-white/40">
                  or click to browse &mdash; JPG, PNG, WEBP up to 20MB
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-3 text-xs text-white/30">
                <span>No account needed</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>100% private</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>Client-side only</span>
              </div>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none hidden sm:block">
              <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-white/5 rounded-tl-2xl" />
              <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-white/5 rounded-tr-2xl" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-white/5 rounded-bl-2xl" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-white/5 rounded-br-2xl" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
