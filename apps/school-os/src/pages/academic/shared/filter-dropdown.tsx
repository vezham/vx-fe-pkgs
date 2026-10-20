import { RecordFilterDropdown } from '@pages/_shared/record-filter-dropdown'

type FilterClasses = {
  filterActions: string
  filterPanel: string
  filterTitle: string
}

type FilterOption<Field extends string> = {
  ariaLabel: string
  field: Field
  label: string
  options: readonly string[]
  placeholder: string
}

type Props<Draft extends Record<string, string | null>> = {
  classes: FilterClasses
  draftFilters: Draft
  filters: readonly FilterOption<Extract<keyof Draft, string>>[]
  setDraftFilters: (filters: Draft) => void
  onApply: () => void
  onReset: () => void
}

export const AcademicFilterDropdown = <
  Draft extends Record<string, string | null>
>({
  filters,
  ...props
}: Props<Draft>) => (
  <RecordFilterDropdown
    {...props}
    showChevron
    filters={filters.map(filter => ({
      key: filter.field,
      label: filter.label,
      values: filter.options,
      ariaLabel: filter.ariaLabel,
      placeholder: filter.placeholder
    }))}
  />
)
