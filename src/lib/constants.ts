export const APP_NAME = 'iPhone Filters Studio'
export const APP_DESCRIPTION = 'Preview Apple iPhone camera filters in real time'

export const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_FILE_SIZE = 20 * 1024 * 1024

export const FILTER_NAMES = [
  'Original',
  'Vivid',
  'Vivid Warm',
  'Vivid Cool',
  'Dramatic',
  'Dramatic Warm',
  'Dramatic Cool',
  'Mono',
  'Silvertone',
  'Noir',
] as const

export type FilterName = (typeof FILTER_NAMES)[number]

export interface FilterConfig {
  name: FilterName
  css: string
  description: string
}

export const FILTER_PRESETS: FilterConfig[] = [
  {
    name: 'Original',
    css: '',
    description: 'Natural and true-to-life colors',
  },
  {
    name: 'Vivid',
    css: 'brightness(1.05) contrast(1.1) saturate(1.4)',
    description: 'Rich, vibrant colors with enhanced saturation',
  },
  {
    name: 'Vivid Warm',
    css: 'brightness(1.05) contrast(1.1) saturate(1.3) sepia(0.15)',
    description: 'Vibrant colors with warm golden tones',
  },
  {
    name: 'Vivid Cool',
    css: 'brightness(1.05) contrast(1.1) saturate(1.3) hue-rotate(-10deg)',
    description: 'Vibrant colors with cool blue undertones',
  },
  {
    name: 'Dramatic',
    css: 'brightness(0.9) contrast(1.4) saturate(1.2)',
    description: 'High contrast with deep shadows and rich colors',
  },
  {
    name: 'Dramatic Warm',
    css: 'brightness(0.9) contrast(1.4) saturate(1.1) sepia(0.2)',
    description: 'Dramatic contrast with warm amber tones',
  },
  {
    name: 'Dramatic Cool',
    css: 'brightness(0.9) contrast(1.4) saturate(1.1) hue-rotate(-15deg)',
    description: 'Dramatic contrast with cool blue tones',
  },
  {
    name: 'Mono',
    css: 'grayscale(1) brightness(1.05) contrast(1.1)',
    description: 'Classic black and white with smooth grays',
  },
  {
    name: 'Silvertone',
    css: 'grayscale(1) brightness(1.15) contrast(0.95) sepia(0.1)',
    description: 'Silver-toned monochrome with subtle warmth',
  },
  {
    name: 'Noir',
    css: 'grayscale(1) brightness(0.85) contrast(1.5)',
    description: 'Film noir style with deep blacks and stark whites',
  },
]
