import type { SortDescriptor } from '@vezham/react-v3'

import type { AttendancePageConfig, FilterOption } from './types'

export const reportFilterOption = (
  key: string,
  label: string,
  values: string[]
): FilterOption => ({ key, label, values })

type AttendanceConfigInput = Omit<
  AttendancePageConfig,
  'initialSort' | 'sortOptions'
> & {
  initialColumn: string
}

export const makeAttendancePageConfig = <Config extends AttendanceConfigInput>(
  config: Config
) => {
  const initialSort = {
    column: config.initialColumn,
    direction: 'ascending'
  } satisfies SortDescriptor

  const sortOptions = [
    { key: 'ascending', label: 'Ascending', descriptor: initialSort },
    {
      key: 'descending',
      label: 'Descending',
      descriptor: {
        column: config.initialColumn,
        direction: 'descending'
      } satisfies SortDescriptor
    },
    {
      key: 'recentlyViewed',
      label: 'Recently Viewed',
      descriptor: {
        column: 'viewedAt',
        direction: 'descending'
      } satisfies SortDescriptor
    },
    {
      key: 'recentlyAdded',
      label: 'Recently Added',
      descriptor: {
        column: 'createdAt',
        direction: 'descending'
      } satisfies SortDescriptor
    }
  ]

  return { ...config, initialSort, sortOptions }
}
