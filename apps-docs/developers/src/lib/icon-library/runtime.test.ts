describe('icon CDN runtime', () => {
  afterEach(() => {
    document.querySelector('#vezham-icon-runtime')?.remove()
    delete window.VezhamIcons
    vi.resetModules()
  })
  it('shares one deferred script and waits for the runtime to become ready', async () => {
    const { loadIconRuntime, iconCdnUrl } = await import('./runtime')
    const first = loadIconRuntime()
    const second = loadIconRuntime()
    expect(first).toBe(second)
    expect(document.querySelectorAll('#vezham-icon-runtime')).toHaveLength(1)
    const script = document.querySelector<HTMLScriptElement>(
      '#vezham-icon-runtime'
    )
    expect(script?.src).toBe(iconCdnUrl)
    expect(script?.defer).toBe(true)
    window.VezhamIcons = {
      icons: ['home'],
      categories: ['building'],
      ready: Promise.resolve(),
      preload: vi.fn()
    }
    script?.dispatchEvent(new Event('load'))
    expect((await first).icons).toEqual(['home'])
  })
  it('can retry after a failed script load', async () => {
    const { loadIconRuntime } = await import('./runtime')
    const pending = loadIconRuntime()
    const failure = expect(pending).rejects.toThrow(
      'icon renderer could not load'
    )
    document
      .querySelector('#vezham-icon-runtime')
      ?.dispatchEvent(new Event('error'))
    await failure
    expect(document.querySelector('#vezham-icon-runtime')).toBeNull()
    const retry = loadIconRuntime()
    window.VezhamIcons = {
      icons: ['home'],
      categories: [],
      ready: Promise.resolve(),
      preload: vi.fn()
    }
    document
      .querySelector('#vezham-icon-runtime')
      ?.dispatchEvent(new Event('load'))
    expect((await retry).icons).toEqual(['home'])
  })

  it('passes both colors to the renderer before exporting a duotone SVG', async () => {
    customElements.define(
      'vx-icon',
      class extends HTMLElement {
        connectedCallback() {
          const shadow = this.attachShadow({ mode: 'open' })
          shadow.innerHTML = `<svg viewBox="0 0 24 24"><path fill="${this.getAttribute('color') ?? 'currentColor'}"/><g opacity="0.5"><path fill="currentColor"/></g></svg>`
        }
      }
    )
    window.VezhamIcons = {
      icons: ['home'],
      categories: [],
      ready: Promise.resolve(),
      preload: vi.fn()
    }
    const { getIconSvg } = await import('./runtime')
    const svg = await getIconSvg(
      'home',
      'duotone-filled',
      16,
      '#123456',
      '#abcdef'
    )
    expect(svg).toContain('width="16"')
    expect(svg).toContain('height="16"')
    expect(svg).toContain('fill="#123456"')
    expect(svg).toContain('fill="#abcdef"')
    expect(document.querySelector('vx-icon')).toBeNull()
  })
})
