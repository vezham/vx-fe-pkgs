const TEXT_FILE_TYPE = 'text/plain;charset=utf-8'
const PRINT_FRAME_CLEANUP_DELAY = 60_000

/**
 * Download plain text as a `.txt` file generated in the browser.
 *
 * @param text - Exact text content to save.
 * @param filename - Suggested download filename.
 */
export const downloadTextFile = (text: string, filename: `${string}.txt`) => {
  const url = URL.createObjectURL(new Blob([text], { type: TEXT_FILE_TYPE }))
  const link = document.createElement('a')

  link.download = filename
  link.href = url
  link.hidden = true
  document.body.appendChild(link)
  link.click()
  link.remove()

  setTimeout(() => URL.revokeObjectURL(url), 0)
}

/**
 * Print plain text in an isolated, hidden frame.
 *
 * Loading a `text/plain` Blob keeps the print document limited to the exact
 * file contents instead of printing the surrounding application UI.
 *
 * @param text - Exact text content to print.
 */
export const printTextFile = async (text: string) => {
  const frame = document.createElement('iframe')
  frame.ariaHidden = 'true'
  frame.title = 'Print text file'
  frame.width = `${document.documentElement.clientWidth}px`
  frame.height = `${document.documentElement.clientHeight}px`
  frame.style.position = 'absolute'
  frame.style.top = `-${document.documentElement.clientHeight + 100}px`
  frame.style.left = `-${document.documentElement.clientWidth + 100}px`
  frame.style.border = '0'

  let cleanupTimeout: ReturnType<typeof setTimeout> | undefined
  let onPrinted: () => void = () => undefined
  const url = URL.createObjectURL(new Blob([text], { type: TEXT_FILE_TYPE }))

  try {
    await new Promise<void>(resolve => {
      onPrinted = resolve
      // vx-bot/NOTE: Bound the lifetime even when the frame never finishes loading.
      cleanupTimeout = setTimeout(resolve, PRINT_FRAME_CLEANUP_DELAY)
      frame.addEventListener('error', () => resolve(), { once: true })
      frame.addEventListener(
        'load',
        () => {
          const printWindow = frame.contentWindow
          if (!printWindow) {
            resolve()
            return
          }
          printWindow.addEventListener('afterprint', onPrinted, { once: true })
          try {
            printWindow.focus()
            printWindow.print()
          } catch {
            resolve()
          }
        },
        { once: true }
      )
      frame.src = url
      document.body.appendChild(frame)
    })
  } finally {
    clearTimeout(cleanupTimeout)
    frame.contentWindow?.removeEventListener('afterprint', onPrinted)
    frame.remove()
    URL.revokeObjectURL(url)
  }
}
