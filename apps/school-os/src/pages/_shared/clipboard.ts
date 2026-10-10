export const copyToClipboard = async (value: string) => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(value)
    return
  }

  const textarea = document.createElement('textarea')

  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)

  try {
    textarea.select()
    document.execCommand('copy')
  } finally {
    textarea.remove()
  }
}

export const copyRecordValue = (
  value: string,
  label: 'ID' | 'URL',
  onResult: (result: { message: string; status: 'success' | 'danger' }) => void
) => {
  void copyToClipboard(value)
    .then(() => onResult({ message: `${label} copied`, status: 'success' }))
    .catch(() =>
      onResult({ message: `Unable to copy ${label}`, status: 'danger' })
    )
}
