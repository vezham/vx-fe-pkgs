const formatterCache = new Map<string, Intl.DateTimeFormat>()

export type FormatLocaleDateOptions = Intl.DateTimeFormatOptions

/** Format a date with a fixed timezone so server and browser output match. */
export const formatLocaleDate = (
  value: Date | number | string,
  locale: string,
  options: FormatLocaleDateOptions = {}
) => {
  const resolvedOptions = { timeZone: 'UTC', ...options }
  const cacheKey = JSON.stringify([locale, resolvedOptions])
  let formatter = formatterCache.get(cacheKey)

  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, resolvedOptions)
    formatterCache.set(cacheKey, formatter)
  }

  return formatter.format(value instanceof Date ? value : new Date(value))
}
