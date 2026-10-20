import type { ComponentType } from 'react'

import type { SortDescriptor } from '@vezham/react-v3'

import { ColumnsDropdown } from '@pages/academic/shared/columns-dropdown'
import type { CustomDateRangeValue } from '@pages/academic/shared/entity-types'
import { AcademicToolbar } from '@pages/academic/shared/toolbar-layout'

type EntityToolbarProps<
  Filters,
  Column extends string,
  DateKey extends string
> = {
  activeDateLabel: string
  activeSortLabel: string
  datePreset: DateKey
  draftFilters: Filters
  isCustomDateRangeOpen: boolean
  isDateDropdownOpen: boolean
  searchQuery: string
  visibleColumns: Set<Column>
  setDraftFilters: (filters: Filters) => void
  sortField: SortDescriptor['column']
  sortDirection: SortDescriptor['direction']
  onVisibleColumnsChange: (columns: Set<Column>) => void
  onApplyFilters: () => void
  onCustomDateRangeChange: (value: CustomDateRangeValue | null) => void
  onCustomDateRangeOpenChange: (isOpen: boolean) => void
  onDateDropdownOpenChange: (isOpen: boolean) => void
  onDatePresetChange: (key: DateKey) => void
  onResetFilters: () => void
  onSearchChange: (value: string) => void
  onSortFieldChange: (column: SortDescriptor['column']) => void
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
}

type ToolbarDateProps<DateKey extends string> = Pick<
  EntityToolbarProps<unknown, string, DateKey>,
  | 'activeDateLabel'
  | 'datePreset'
  | 'isCustomDateRangeOpen'
  | 'isDateDropdownOpen'
  | 'onCustomDateRangeChange'
  | 'onCustomDateRangeOpenChange'
  | 'onDateDropdownOpenChange'
  | 'onDatePresetChange'
>

type ToolbarSortProps = Pick<
  EntityToolbarProps<unknown, string, string>,
  | 'activeSortLabel'
  | 'sortField'
  | 'sortDirection'
  | 'onSortFieldChange'
  | 'onSortDirectionChange'
>

type ToolbarFilterProps<Filters> = {
  draftFilters: Filters
  setDraftFilters: (filters: Filters) => void
  onApply: () => void
  onReset: () => void
}

type ToolbarOptions<Filters, Column extends string, DateKey extends string> = {
  classNames: Parameters<typeof AcademicToolbar>[0]['classNames']
  columns?: readonly { key: string; label: string }[]
  columnsAriaLabel?: string
  columnsLabelClassName?: string
  columnsDropdown?: ComponentType<{
    visibleColumns: Set<Column>
    onVisibleColumnsChange: (columns: Set<Column>) => void
  }>
  dateDropdown: ComponentType<ToolbarDateProps<DateKey>>
  filterDropdown: ComponentType<ToolbarFilterProps<Filters>>
  sortDropdown: ComponentType<ToolbarSortProps>
  title: string
  eyebrow?: string
  searchAriaLabel?: string
}

export const createEntityToolbar = <
  Filters,
  Column extends string,
  DateKey extends string
>({
  classNames,
  columns,
  columnsAriaLabel,
  columnsLabelClassName,
  columnsDropdown: CustomColumnsDropdown,
  dateDropdown: DateDropdown,
  filterDropdown: FilterDropdown,
  sortDropdown: SortDropdown,
  title,
  eyebrow,
  searchAriaLabel = 'Search schedules'
}: ToolbarOptions<Filters, Column, DateKey>) => {
  return (props: EntityToolbarProps<Filters, Column, DateKey>) => (
    <AcademicToolbar
      classNames={classNames}
      controls={
        <>
          <DateDropdown {...props} />
          <FilterDropdown
            draftFilters={props.draftFilters}
            setDraftFilters={props.setDraftFilters}
            onApply={props.onApplyFilters}
            onReset={props.onResetFilters}
          />
          {CustomColumnsDropdown ? (
            <CustomColumnsDropdown
              visibleColumns={props.visibleColumns}
              onVisibleColumnsChange={props.onVisibleColumnsChange}
            />
          ) : (
            <ColumnsDropdown
              ariaLabel={columnsAriaLabel ?? 'Show or hide columns'}
              columns={columns ?? []}
              labelClassName={columnsLabelClassName}
              visibleColumns={props.visibleColumns as Set<string>}
              onVisibleColumnsChange={keys =>
                props.onVisibleColumnsChange(
                  new Set(Array.from(keys) as Column[])
                )
              }
            />
          )}
          <SortDropdown {...props} />
        </>
      }
      eyebrow={eyebrow}
      searchAriaLabel={searchAriaLabel}
      searchQuery={props.searchQuery}
      title={title}
      onSearchChange={props.onSearchChange}
    />
  )
}
