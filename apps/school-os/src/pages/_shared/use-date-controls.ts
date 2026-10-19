import { type Dispatch, type SetStateAction, useState } from 'react'

type DateRange = { start: string; end: string }
type CustomDateRangeValue = {
  start: { toString(): string }
  end: { toString(): string }
}

export const useDateControls = <Key extends string>(
  initialPreset: Key,
  setPage: Dispatch<SetStateAction<number>>
) => {
  const [datePreset, setDatePreset] = useState<Key>(initialPreset)
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [isCustomDateRangeOpen, setIsCustomDateRangeOpen] = useState(false)
  const [customDateRange, setCustomDateRange] = useState<DateRange | null>(null)

  const updateDateDropdownOpen = (open: boolean) => {
    setIsDateDropdownOpen(open)
    if (!open) setIsCustomDateRangeOpen(false)
  }

  const updateDatePreset = (key: Key) => {
    setDatePreset(key)
    setPage(1)

    if (key === 'custom') {
      setIsCustomDateRangeOpen(true)
      setIsDateDropdownOpen(true)
      window.setTimeout(() => {
        setIsCustomDateRangeOpen(true)
        setIsDateDropdownOpen(true)
      }, 0)
      return
    }

    setIsCustomDateRangeOpen(false)
    setIsDateDropdownOpen(false)
  }

  const updateCustomDateRange = (value: CustomDateRangeValue | null) => {
    setDatePreset('custom' as Key)
    setPage(1)

    if (!value?.start || !value?.end) {
      setCustomDateRange(null)
      return
    }

    setCustomDateRange({
      start: String(value.start),
      end: String(value.end)
    })
    setIsDateDropdownOpen(false)
    setIsCustomDateRangeOpen(false)
  }

  return {
    customDateRange,
    datePreset,
    isCustomDateRangeOpen,
    isDateDropdownOpen,
    setCustomDateRange,
    setDatePreset,
    setIsCustomDateRangeOpen,
    setIsDateDropdownOpen,
    updateCustomDateRange,
    updateDateDropdownOpen,
    updateDatePreset
  }
}
