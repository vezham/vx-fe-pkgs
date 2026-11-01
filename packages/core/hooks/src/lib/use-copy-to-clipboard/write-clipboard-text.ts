export const writeClipboardText = async (text: string) => {
  if (
    typeof navigator !== 'undefined' &&
    typeof navigator.clipboard?.writeText === 'function'
  ) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // vx-bot/NOTE: Permission failures fall through to selection copy.
    }
  }

  if (typeof document === 'undefined' || !document.body) {
    throw new Error('Clipboard copy is unavailable')
  }

  const input = document.createElement('textarea')
  input.value = text
  input.setAttribute('readonly', '')
  input.setAttribute('aria-hidden', 'true')
  input.tabIndex = -1
  input.style.position = 'fixed'
  input.style.top = '0'
  input.style.left = '-9999px'
  input.style.fontSize = '16px'
  document.body.appendChild(input)
  input.focus()
  input.select()
  input.setSelectionRange(0, text.length)
  const copied = document.execCommand('copy')
  input.remove()

  if (!copied) throw new Error('Clipboard copy is unavailable')
}
