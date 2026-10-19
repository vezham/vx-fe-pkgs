import type { SortDescriptor } from '@vezham/react-v3'

import type { OperationPageConfig } from './types'

export const makeOperationPageConfig = (
  config: Omit<OperationPageConfig, 'initialSort' | 'sortOptions'> & {
    initialColumn: string
  }
): OperationPageConfig => {
  const initialSort = {
    column: config.initialColumn,
    direction: 'ascending'
  } satisfies SortDescriptor

  return {
    ...config,
    initialSort,
    sortOptions: [
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
        key: 'recentlyAdded',
        label: 'Recently Added',
        descriptor: {
          column: 'createdAt',
          direction: 'descending'
        } satisfies SortDescriptor
      }
    ]
  }
}
