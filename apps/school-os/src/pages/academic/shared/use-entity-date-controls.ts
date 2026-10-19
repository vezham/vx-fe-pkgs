import { type Dispatch, type SetStateAction, useMemo } from 'react'

import { useDateControls } from '@pages/_shared/use-date-controls'
import {
  formatDateRangeLabel,
  getPresetDateRange
} from '@pages/academic/shared/date'
import type { AcademicDatePresetKey } from '@store/useAcademic/options'

export const useEntityDateControls = (
  setPage: Dispatch<SetStateAction<number>>
) => {
  const {
    customDateRange,
    datePreset,
    isCustomDateRangeOpen,
    isDateDropdownOpen,
    setIsCustomDateRangeOpen,
    setIsDateDropdownOpen,
    updateCustomDateRange,
    updateDateDropdownOpen,
    updateDatePreset
  } = useDateControls<AcademicDatePresetKey>('thisYear', setPage)

  const activeDateRange = useMemo(() => {
    if (datePreset === 'custom') return customDateRange
    return getPresetDateRange(datePreset)
  }, [customDateRange, datePreset])

  const activeDateLabel =
    datePreset === 'custom'
      ? customDateRange
        ? formatDateRangeLabel(customDateRange)
        : 'Custom Range'
      : formatDateRangeLabel(getPresetDateRange(datePreset))

  return {
    activeDateLabel,
    activeDateRange,
    customDateRange,
    datePreset,
    isCustomDateRangeOpen,
    isDateDropdownOpen,
    setIsCustomDateRangeOpen,
    setIsDateDropdownOpen,
    updateCustomDateRange,
    updateDateDropdownOpen,
    updateDatePreset
  }
}
