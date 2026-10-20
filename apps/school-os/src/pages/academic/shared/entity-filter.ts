import { isISODateInRange } from './date'

type DateRange = {
  start: string
  end: string
}

type FilterOptions<
  Row extends { createdAt: string },
  Filters extends object
> = {
  data: Row[]
  dateRange: DateRange | null
  filters: Filters
  filterKeys: readonly (keyof Row & keyof Filters)[]
  searchKeys: readonly (keyof Row)[]
  searchQuery: string
  extraSearchValues?: (row: Row) => readonly (string | null | undefined)[]
  matchesFilter?: (
    key: keyof Row & keyof Filters,
    rowValue: Row[keyof Row & keyof Filters],
    filterValue: Filters[keyof Row & keyof Filters]
  ) => boolean
}

export const filterEntityRows = <
  Row extends { createdAt: string },
  Filters extends object
>({
  data,
  dateRange,
  filters,
  filterKeys,
  searchKeys,
  searchQuery,
  extraSearchValues,
  matchesFilter
}: FilterOptions<Row, Filters>) => {
  const query = searchQuery.trim().toLowerCase()

  return data.filter(row => {
    const matchesSearchKey = searchKeys.some(key =>
      String(row[key] ?? '')
        .toLowerCase()
        .includes(query)
    )
    const matchesExtraValue = extraSearchValues?.(row).some(value =>
      String(value ?? '')
        .toLowerCase()
        .includes(query)
    )

    if (query && !matchesSearchKey && !matchesExtraValue) {
      return false
    }

    if (
      dateRange &&
      !isISODateInRange(row.createdAt, dateRange.start, dateRange.end)
    ) {
      return false
    }

    return filterKeys.every(key => {
      const filterValue = filters[key]
      return (
        !filterValue ||
        (matchesFilter
          ? matchesFilter(key, row[key], filterValue)
          : Object.is(row[key], filterValue))
      )
    })
  })
}
