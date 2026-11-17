import { parseColor } from '@vezham/react-v3'

const paintAttributes = [
  'fill',
  'stroke',
  'stop-color',
  'flood-color',
  'lighting-color',
  'color'
]
const declarations =
  /(^|[;{]\s*)(fill|stroke|stop-color|flood-color|lighting-color|color)(\s*:\s*)([^;}]+)/gi
const parseSvg = (svg: string) => {
  const document = new DOMParser().parseFromString(svg, 'image/svg+xml')
  if (
    document.documentElement.localName !== 'svg' ||
    document.querySelector('parsererror')
  )
    throw new Error('This file does not contain a valid SVG.')
  const shapes = document.querySelectorAll(
    'path, rect, circle, ellipse, polygon, polyline, text'
  )
  const implicitFill =
    !document.querySelector('style') &&
    [...shapes].some(shape => {
      let element: Element | null = shape
      while (element) {
        if (
          element.hasAttribute('fill') ||
          /(?:^|;)\s*fill\s*:/i.test(element.getAttribute('style') ?? '')
        )
          return false
        element = element.parentElement
      }
      return true
    })
  if (implicitFill) document.documentElement.setAttribute('fill', '#000000')
  return document
}

const paintEditor = () => {
  const probe = document.createElement('span')
  probe.hidden = true
  document.body.append(probe)
  const colors = new Map<string, ReturnType<typeof parseColor> | null>()
  const parse = (paint: string) => {
    const value = paint.trim().replace(/\s*!important\s*$/i, '')
    if (colors.has(value)) return colors.get(value) ?? null
    let color: ReturnType<typeof parseColor> | null = null
    if (
      !/^(none|transparent|inherit|initial|unset|revert|context-fill|context-stroke|url\(|var\()/i.test(
        value
      )
    ) {
      try {
        if (value.toLowerCase() === 'currentcolor')
          color = parseColor('#000000')
        else {
          probe.style.color = ''
          probe.style.color = value
          if (probe.style.color)
            color = parseColor(getComputedStyle(probe).color)
        }
        if (color?.getChannelValue('alpha') === 0) color = null
      } catch {
        color = null
      }
    }
    colors.set(value, color)
    return color
  }
  return { parse, dispose: () => probe.remove() }
}

const visitPaints = (
  document: Document,
  transform: (paint: string) => string
) => {
  const root = document.documentElement
  for (const element of [root, ...root.querySelectorAll('*')]) {
    for (const attribute of paintAttributes) {
      const value = element.getAttribute(attribute)
      if (value !== null) element.setAttribute(attribute, transform(value))
    }
    const style = element.getAttribute('style')
    if (style)
      element.setAttribute(
        'style',
        style.replace(
          declarations,
          (_, prefix, property, separator, paint: string) =>
            `${prefix}${property}${separator}${transform(paint)}`
        )
      )
    if (element.localName === 'style' && element.textContent)
      element.textContent = element.textContent.replace(
        declarations,
        (_, prefix, property, separator, paint: string) =>
          `${prefix}${property}${separator}${transform(paint)}`
      )
  }
}

export const extractIllustrationPalette = (svg: string): string[] => {
  if (!svg) return []
  const document = parseSvg(svg)
  const editor = paintEditor()
  const palette = new Set<string>()
  try {
    visitPaints(document, paint => {
      const color = editor.parse(paint)
      if (color) palette.add(color.toString('hex').toLowerCase())
      return paint
    })
    return [...palette]
  } finally {
    editor.dispose()
  }
}

export const recolorIllustration = (
  svg: string,
  overrides: Readonly<Record<string, string>>
) => {
  if (!Object.keys(overrides).length) return svg
  const document = parseSvg(svg)
  const editor = paintEditor()
  try {
    visitPaints(document, paint => {
      const color = editor.parse(paint)
      const replacement =
        color && overrides[color.toString('hex').toLowerCase()]
      if (!color || !replacement) return paint
      const alpha = color.getChannelValue('alpha')
      const changed =
        alpha === 1
          ? replacement
          : parseColor(replacement)
              .withChannelValue('alpha', alpha)
              .toString('css')
      return `${changed}${/!important/i.test(paint) ? ' !important' : ''}`
    })
    return new XMLSerializer().serializeToString(document)
  } finally {
    editor.dispose()
  }
}
