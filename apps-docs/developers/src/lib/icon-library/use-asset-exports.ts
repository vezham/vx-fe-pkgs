import { useState } from 'react'

import { useCopyToClipboard } from '@vezham/hooks'

import { downloadSvg } from './svg'

type ExportFormat = 'svg' | 'png' | 'webp'

type Options = {
  loadSvg: () => Promise<string>
  getFilename: (format: ExportFormat) => string
  exportSize: string
}

export const useAssetExports = ({
  loadSvg,
  getFilename,
  exportSize
}: Options) => {
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const { copy } = useCopyToClipboard()
  const copySvg = async () => {
    setBusy(true)
    try {
      const copied = await copy(await loadSvg())
      setMessage(
        copied
          ? 'SVG copied to clipboard.'
          : 'Unable to copy. Use the SVG source tab and try again.'
      )
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Unable to copy. Use the SVG source tab and try again.'
      )
    } finally {
      setBusy(false)
    }
  }
  const exportFile = async (format: 'svg' | 'png' | 'webp') => {
    setBusy(true)
    try {
      const svg = await loadSvg()
      const filename = getFilename(format)
      await downloadSvg(svg, filename, format, Number(exportSize))
      setMessage(
        format === 'svg'
          ? 'SVG downloaded.'
          : `${format.toUpperCase()} exported at ${exportSize}px.`
      )
    } catch (error: unknown) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Export failed. Please try again.'
      )
    } finally {
      setBusy(false)
    }
  }
  return {
    busy,
    message,
    copySvg,
    exportFile,
    clearMessage: () => setMessage('')
  }
}
