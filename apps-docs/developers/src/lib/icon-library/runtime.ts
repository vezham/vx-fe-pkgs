export const iconCdnUrl =
  'https://cdn.jsdelivr.net/npm/@vezham/icons@1.0.7/dist/cdn/vezham-icons.js'

type Runtime = {
  icons: string[]
  categories: string[]
  ready: Promise<unknown>
  preload: (names: string[]) => void
}
declare global {
  interface Window {
    VezhamIcons?: Runtime
  }
}
let pending: Promise<Runtime> | undefined

export const loadIconRuntime = (): Promise<Runtime> => {
  if (window.VezhamIcons)
    return window.VezhamIcons.ready.then(() => window.VezhamIcons as Runtime)
  if (pending) return pending
  pending = new Promise<Runtime>((resolve, reject) => {
    const script = document.createElement('script')
    script.id = 'vezham-icon-runtime'
    script.src = iconCdnUrl
    script.defer = true
    const timeout = window.setTimeout(() => fail(), 30_000)
    const fail = () => {
      clearTimeout(timeout)
      script.remove()
      pending = undefined
      reject(
        new Error(
          'The icon renderer could not load. Check your connection and try again.'
        )
      )
    }
    script.onerror = fail
    script.onload = () => {
      clearTimeout(timeout)
      const runtime = window.VezhamIcons
      if (!runtime) {
        fail()
        return
      }
      void runtime.ready.then(() => resolve(runtime), fail)
    }
    document.head.append(script)
  })
  return pending
}

// vx-bot/NOTE: The pinned runtime uses the primary paint for low-opacity duotone layers.
export const applyIconSecondaryColor = (svg: SVGSVGElement, weight: string) => {
  if (!weight.startsWith('duotone')) return
  for (const layer of svg.querySelectorAll(
    '[opacity], [fill-opacity], [stroke-opacity]'
  )) {
    const secondary = ['opacity', 'fill-opacity', 'stroke-opacity'].some(
      attribute => {
        const value = layer.getAttribute(attribute)
        return value !== null && Number(value) > 0 && Number(value) < 1
      }
    )
    if (!secondary) continue
    for (const element of [
      layer,
      ...layer.querySelectorAll('[fill], [stroke]')
    ]) {
      for (const attribute of ['fill', 'stroke']) {
        const paint = element.getAttribute(attribute)
        if (paint === 'currentColor' || paint === 'var(--vx-icon-primary)')
          element.setAttribute(attribute, 'var(--vx-icon-secondary)')
      }
    }
  }
}

export const getIconSvg = async (
  name: string,
  weight: string,
  size: number,
  color: string,
  secondaryColor: string
) => {
  await loadIconRuntime()
  const element = document.createElement('vx-icon')
  element.setAttribute('icon', name)
  element.setAttribute('weight', weight)
  element.setAttribute('size', String(size))
  element.setAttribute('color', color)
  element.setAttribute('secondary-color', secondaryColor)
  element.setAttribute('decorative', '')
  element.style.position = 'fixed'
  element.style.visibility = 'hidden'
  document.body.append(element)
  try {
    const svg = element.shadowRoot?.querySelector('svg')?.cloneNode(true) as
      SVGSVGElement | undefined
    if (!svg) throw new Error('This icon could not be exported.')
    applyIconSecondaryColor(svg, weight)
    svg.setAttribute('width', String(size))
    svg.setAttribute('height', String(size))
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    return svg.outerHTML
      .replace(/var\(--vx-icon-primary(?:,[^)]*)?\)/g, color)
      .replace(/var\(--vx-icon-secondary(?:,[^)]*)?\)/g, secondaryColor)
      .replace(/currentColor/g, color)
  } finally {
    element.remove()
  }
}
