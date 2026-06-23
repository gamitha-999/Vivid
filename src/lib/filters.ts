import { FilterName } from './constants'

export interface PixelData {
  r: number
  g: number
  b: number
  a: number
}

function clampPixel(value: number): number {
  return Math.min(255, Math.max(0, Math.round(value)))
}

function applyVivid(r: number, g: number, b: number): PixelData {
  const factor = 1.4
  const contrast = 1.1
  const brightness = 1.05
  return {
    r: clampPixel(((r / 255 - 0.5) * contrast + 0.5) * 255 * brightness * ((r / 255) * (factor - 1) + 1)),
    g: clampPixel(((g / 255 - 0.5) * contrast + 0.5) * 255 * brightness * ((g / 255) * (factor - 1) + 1)),
    b: clampPixel(((b / 255 - 0.5) * contrast + 0.5) * 255 * brightness * ((b / 255) * (factor - 1) + 1)),
    a: 255,
  }
}

function applyVividWarm(r: number, g: number, b: number): PixelData {
  const { r: vr, g: vg, b: vb } = applyVivid(r, g, b)
  return {
    r: clampPixel(vr + 20),
    g: clampPixel(vg + 8),
    b: clampPixel(vb - 10),
    a: 255,
  }
}

function applyVividCool(r: number, g: number, b: number): PixelData {
  const { r: vr, g: vg, b: vb } = applyVivid(r, g, b)
  return {
    r: clampPixel(vr - 8),
    g: clampPixel(vg + 5),
    b: clampPixel(vb + 20),
    a: 255,
  }
}

function applyDramatic(r: number, g: number, b: number): PixelData {
  const contrast = 1.4
  const brightness = 0.9
  const saturate = 1.2
  const gray = (r + g + b) / 3
  return {
    r: clampPixel((((r / 255 - 0.5) * contrast + 0.5) * 255 * brightness + (r - gray) * (saturate - 1))),
    g: clampPixel((((g / 255 - 0.5) * contrast + 0.5) * 255 * brightness + (g - gray) * (saturate - 1))),
    b: clampPixel((((b / 255 - 0.5) * contrast + 0.5) * 255 * brightness + (b - gray) * (saturate - 1))),
    a: 255,
  }
}

function applyDramaticWarm(r: number, g: number, b: number): PixelData {
  const { r: dr, g: dg, b: db } = applyDramatic(r, g, b)
  return {
    r: clampPixel(dr + 18),
    g: clampPixel(dg + 6),
    b: clampPixel(db - 12),
    a: 255,
  }
}

function applyDramaticCool(r: number, g: number, b: number): PixelData {
  const { r: dr, g: dg, b: db } = applyDramatic(r, g, b)
  return {
    r: clampPixel(dr - 10),
    g: clampPixel(dg + 3),
    b: clampPixel(db + 18),
    a: 255,
  }
}

function applyMono(r: number, g: number, b: number): PixelData {
  const gray = r * 0.299 + g * 0.587 + b * 0.114
  const contrast = 1.1
  const brightness = 1.05
  const adjusted = clampPixel(((gray / 255 - 0.5) * contrast + 0.5) * 255 * brightness)
  return { r: adjusted, g: adjusted, b: adjusted, a: 255 }
}

function applySilvertone(r: number, g: number, b: number): PixelData {
  const gray = r * 0.299 + g * 0.587 + b * 0.114
  const brightness = 1.15
  const contrast = 0.95
  const adjusted = clampPixel(((gray / 255 - 0.5) * contrast + 0.5) * 255 * brightness)
  const warmth = 0.1
  return {
    r: clampPixel(adjusted + 30 * warmth),
    g: clampPixel(adjusted + 15 * warmth),
    b: clampPixel(adjusted - 10 * warmth),
    a: 255,
  }
}

function applyNoir(r: number, g: number, b: number): PixelData {
  const gray = r * 0.299 + g * 0.587 + b * 0.114
  const contrast = 1.5
  const brightness = 0.85
  const adjusted = clampPixel(((gray / 255 - 0.5) * contrast + 0.5) * 255 * brightness)
  return { r: adjusted, g: adjusted, b: adjusted, a: 255 }
}

const filterFunctions: Record<FilterName, (r: number, g: number, b: number) => PixelData> = {
  Original: (r, g, b) => ({ r: clampPixel(r), g: clampPixel(g), b: clampPixel(b), a: 255 }),
  Vivid: applyVivid,
  'Vivid Warm': applyVividWarm,
  'Vivid Cool': applyVividCool,
  Dramatic: applyDramatic,
  'Dramatic Warm': applyDramaticWarm,
  'Dramatic Cool': applyDramaticCool,
  Mono: applyMono,
  Silvertone: applySilvertone,
  Noir: applyNoir,
}

export function applyCanvasFilter(
  imageData: ImageData,
  filterName: FilterName,
  intensity: number = 1
): ImageData {
  const data = imageData.data
  const filterFn = filterFunctions[filterName]
  if (!filterFn || filterName === 'Original') return imageData

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const filtered = filterFn(r, g, b)
    data[i] = clampPixel(r + (filtered.r - r) * intensity)
    data[i + 1] = clampPixel(g + (filtered.g - g) * intensity)
    data[i + 2] = clampPixel(b + (filtered.b - b) * intensity)
  }
  return imageData
}

export function applyFilterToCanvas(
  canvas: HTMLCanvasElement,
  filterName: FilterName,
  intensity: number = 1
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  applyCanvasFilter(imageData, filterName, intensity)
  ctx.putImageData(imageData, 0, 0)
}

export function getFilterSVGFilter(filterName: FilterName): string | undefined {
  const filters: Record<string, string> = {
    Vivid: `<filter id="vivid"><feColorMatrix type="matrix" values="1.4 0 0 0 0 0 1.4 0 0 0 0 0 1.4 0 0 0 0 0 1 0"/><feComponentTransfer><feFuncR type="linear" slope="1.05"/><feFuncG type="linear" slope="1.05"/><feFuncB type="linear" slope="1.05"/></feComponentTransfer><feComponentTransfer><feFuncR type="linear" slope="1.1" intercept="-0.05"/><feFuncG type="linear" slope="1.1" intercept="-0.05"/><feFuncB type="linear" slope="1.1" intercept="-0.05"/></feComponentTransfer></filter>`,
    Mono: `<filter id="mono"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope="1.05"/><feFuncG type="linear" slope="1.05"/><feFuncB type="linear" slope="1.05"/></feComponentTransfer><feComponentTransfer><feFuncR type="linear" slope="1.1" intercept="-0.05"/><feFuncG type="linear" slope="1.1" intercept="-0.05"/><feFuncB type="linear" slope="1.1" intercept="-0.05"/></feComponentTransfer></filter>`,
    Noir: `<filter id="noir"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope="0.85"/><feFuncG type="linear" slope="0.85"/><feFuncB type="linear" slope="0.85"/></feComponentTransfer><feComponentTransfer><feFuncR type="linear" slope="1.5" intercept="-0.25"/><feFuncG type="linear" slope="1.5" intercept="-0.25"/><feFuncB type="linear" slope="1.5" intercept="-0.25"/></feComponentTransfer></filter>`,
  }
  return filters[filterName]
}
