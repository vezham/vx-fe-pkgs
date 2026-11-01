export const readTextAttachments = async (files: readonly File[]) => {
  if (
    files.length > 4 ||
    files.some(file => !/\.(txt|md|csv|json)$/i.test(file.name))
  )
    throw new Error('Attach up to four TXT, Markdown, CSV, or JSON files.')
  if (files.reduce((size, file) => size + file.size, 0) > 20_000)
    throw new Error('Attached files must total 20 KB or less.')
  return Promise.all(
    files.map(async file => `File: ${file.name}\n${await file.text()}`)
  )
}
