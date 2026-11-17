import {
  extractIllustrationPalette,
  recolorIllustration
} from './illustration-palette'

const artwork = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 30">
  <title>Red #f00 stays in this title</title>
  <defs><linearGradient id="gradient"><stop stop-color="blue" stop-opacity=".3"/><stop style="stop-color: #fff"/></linearGradient></defs>
  <style>.accent{fill:rgb(255, 0, 0) !important;stroke:blue}</style>
  <path id="red-shape" fill="#f00" opacity=".5" d="M0 0h10v10z"/>
  <path fill="rgba(255, 0, 0, .4)" style="stroke: #fff;fill-opacity:.7"/>
  <path class="accent" fill="url(#gradient)" stroke="none"/>
</svg>`

describe('illustration palette', () => {
  it('groups equivalent colors from fills, strokes, CSS, and gradient stops', () => {
    expect(extractIllustrationPalette(artwork)).toEqual([
      '#000000',
      '#0000ff',
      '#ffffff',
      '#ff0000'
    ])
  })

  it('recolors only paint declarations while retaining gradients, geometry, and opacity', () => {
    const result = recolorIllustration(artwork, {
      '#ff0000': '#22cc55',
      '#0000ff': '#ff0000'
    })
    const document = new DOMParser().parseFromString(result, 'image/svg+xml')
    expect(document.querySelector('title')?.textContent).toBe(
      'Red #f00 stays in this title'
    )
    expect(document.querySelector('#red-shape')?.getAttribute('d')).toBe(
      'M0 0h10v10z'
    )
    expect(document.querySelector('#red-shape')?.getAttribute('opacity')).toBe(
      '.5'
    )
    expect(document.querySelector('#red-shape')?.getAttribute('fill')).toBe(
      '#22cc55'
    )
    expect(document.querySelector('stop')?.getAttribute('stop-color')).toBe(
      '#ff0000'
    )
    expect(document.querySelector('stop')?.getAttribute('stop-opacity')).toBe(
      '.3'
    )
    expect(document.querySelector('style')?.textContent).toContain(
      'fill:#22cc55 !important;stroke:#ff0000'
    )
    expect(result).toContain('rgba(34, 204, 85, 0.4)')
    expect(result).toContain('fill="url(#gradient)"')
    expect(result).toContain('stroke="none"')
    expect(result).toContain('fill-opacity:.7')
  })

  it('preserves the exact original with no overrides and supports implicit black fills', () => {
    expect(recolorIllustration(artwork, {})).toBe(artwork)
    const implicit =
      '<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0h10v10z"/></svg>'
    expect(extractIllustrationPalette(implicit)).toEqual(['#000000'])
    expect(recolorIllustration(implicit, { '#000000': '#123456' })).toContain(
      'fill="#123456"'
    )
    expect(
      extractIllustrationPalette(
        '<svg xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="transparent"/></svg>'
      )
    ).toEqual([])
  })
})
