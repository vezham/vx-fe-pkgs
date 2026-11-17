const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><path d="M0 0h400v200H0z"/></svg>'

describe('asset SVG exports', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    vi.resetModules()
    vi.useRealTimers()
  })

  it('reads a CORS SVG without credentials and shares requests for the selected variant', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response(svg))
    vi.stubGlobal('fetch', fetch)
    const { fetchAssetSvg } = await import('./svg')
    const first = fetchAssetSvg(
      'https://logos.cdn.vezham.com/assets/react/original.svg'
    )
    expect(
      fetchAssetSvg('https://logos.cdn.vezham.com/assets/react/original.svg')
    ).toBe(first)
    expect(await first).toBe(svg)
    expect(fetch).toHaveBeenCalledOnce()
    expect(fetch).toHaveBeenCalledWith(
      'https://logos.cdn.vezham.com/assets/react/original.svg',
      expect.objectContaining({ mode: 'cors', credentials: 'omit' })
    )
  })

  it('reports blocked requests and permits a fresh retry after access is restored', async () => {
    const fetch = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValueOnce(new Response(svg))
    vi.stubGlobal('fetch', fetch)
    const { fetchAssetSvg } = await import('./svg')
    await expect(
      fetchAssetSvg('https://illustrations.cdn.vezham.com/assets/astronaut.svg')
    ).rejects.toThrow('use Open SVG')
    expect(
      await fetchAssetSvg(
        'https://illustrations.cdn.vezham.com/assets/astronaut.svg'
      )
    ).toBe(svg)
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it('rejects an HTML error page instead of downloading it as an SVG', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response('<html><body>Unavailable</body></html>')
        )
    )
    const { fetchAssetSvg } = await import('./svg')
    await expect(
      fetchAssetSvg('https://illustrations.cdn.vezham.com/assets/missing.svg')
    ).rejects.toThrow('valid SVG')
  })

  it('revokes the SVG download URL even when the download cannot start', async () => {
    vi.stubGlobal(
      'URL',
      class extends URL {
        static override createObjectURL = vi.fn(() => 'blob:failed-download')
        static override revokeObjectURL = vi.fn()
      }
    )
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {
      throw new Error('Download blocked')
    })
    const { downloadSvg } = await import('./svg')
    await expect(downloadSvg(svg, 'logo', 'svg', 32)).rejects.toThrow(
      'Download blocked'
    )
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:failed-download')
  })

  it('does not allocate a blob URL when image decoding fails', async () => {
    vi.stubGlobal(
      'Image',
      class {
        src = ''
        decode = () => Promise.reject(new Error('Decode failed'))
      }
    )
    vi.stubGlobal(
      'URL',
      class extends URL {
        static override createObjectURL = vi.fn(() => 'blob:failed-image')
        static override revokeObjectURL = vi.fn()
      }
    )
    const { downloadSvg } = await import('./svg')
    await expect(downloadSvg(svg, 'logo', 'png', 32)).rejects.toThrow(
      'Decode failed'
    )
    expect(URL.createObjectURL).not.toHaveBeenCalled()
  })

  it('fits a rectangular logo within a transparent square without stretching it', async () => {
    vi.useFakeTimers()
    vi.stubGlobal(
      'Image',
      class {
        naturalWidth = 400
        naturalHeight = 200
        src = ''
        decode = () => Promise.resolve()
      }
    )
    vi.stubGlobal(
      'URL',
      class extends URL {
        static override createObjectURL = vi.fn(() => 'blob:asset-export')
        static override revokeObjectURL = vi.fn()
      }
    )
    const drawImage = vi.fn()
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      drawImage
    } as unknown as CanvasRenderingContext2D)
    vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation(
      (callback, type) => callback(new Blob(['image'], { type }))
    )
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(
      () => undefined
    )
    const { downloadSvg } = await import('./svg')
    const exporting = downloadSvg(svg, 'logo', 'png', 256)
    await vi.advanceTimersByTimeAsync(1000)
    await exporting
    expect(drawImage).toHaveBeenCalledWith(expect.anything(), 0, 64, 256, 128)
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1)
  })
})
