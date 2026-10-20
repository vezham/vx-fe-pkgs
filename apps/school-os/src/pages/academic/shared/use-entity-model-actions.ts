import { useCallback, useMemo } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import type { SortDescriptor } from '@vezham/react-v3'

import type { ToastState } from '@pages/academic/shared/entity-types'

export const useEntitySortDescriptor = (
  sortField: SortDescriptor['column'],
  sortDirection: SortDescriptor['direction']
) =>
  useMemo<SortDescriptor>(
    () => ({ column: sortField, direction: sortDirection }),
    [sortDirection, sortField]
  )

export const useEntityToast = (
  setToast: Dispatch<SetStateAction<ToastState | null>>
) =>
  useCallback(
    (message: string, status: ToastState['status'] = 'success') => {
      setToast({ message, status })
    },
    [setToast]
  )
