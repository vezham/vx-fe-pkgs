import { numericDateFormatter, shortDateFormatter } from '@src/utils/intl'

type DatePresetKey =
  'today' | 'yesterday' | 'last7' | 'last30' | 'thisYear' | 'nextYear'

type DateRange = {
  start: string
  end: string
}

export const getPresetDateRange = (preset: DatePresetKey): DateRange => {
  const today = startOfDay(new Date())

  if (preset === 'today') {
    return { start: toISODate(today), end: toISODate(today) }
  }

  if (preset === 'yesterday') {
    const yesterday = addDays(today, -1)
    return { start: toISODate(yesterday), end: toISODate(yesterday) }
  }

  if (preset === 'last7') {
    return { start: toISODate(addDays(today, -6)), end: toISODate(today) }
  }

  if (preset === 'last30') {
    return { start: toISODate(addDays(today, -29)), end: toISODate(today) }
  }

  if (preset === 'thisYear') {
    const year = today.getFullYear()
    return { start: `${year}-01-01`, end: `${year}-12-31` }
  }

  const nextYear = today.getFullYear() + 1
  return { start: `${nextYear}-01-01`, end: `${nextYear}-12-31` }
}

export const isISODateInRange = (date: string, start: string, end: string) => {
  return date >= start && date <= end
}

export const toISODate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const formatDisplayDate = (value: string) => {
  return shortDateFormatter.format(toLocalDate(value))
}

export const formatDateRangeLabel = (range: DateRange) => {
  return `${numericDateFormatter.format(toLocalDate(range.start))} - ${numericDateFormatter.format(toLocalDate(range.end))}`
}

const startOfDay = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

const addDays = (date: Date, days: number) => {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

const toLocalDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}
