import {
  AltArrowDown as AltArrowDownIcon,
  Filter as FilterIcon
} from '@vezham/icons-react'
import {
  Button,
  Dropdown,
  Label,
  ListBox,
  Select,
  Surface
} from '@vezham/react-v3'

type FilterDraft = Record<string, string | null>

type Props<Draft extends FilterDraft> = {
  classes: { filterPanel: string; filterTitle: string; filterActions: string }
  draftFilters: Draft
  filters: readonly {
    key: Extract<keyof Draft, string>
    label: string
    values: readonly string[]
    ariaLabel?: string
    placeholder?: string
  }[]
  onApply: () => void
  onReset: () => void
  setDraftFilters: (filters: Draft) => void
  showChevron?: boolean
  showPlaceholder?: boolean
}

export const RecordFilterDropdown = <Draft extends FilterDraft>({
  classes,
  draftFilters,
  filters,
  onApply,
  onReset,
  setDraftFilters,
  showChevron = false,
  showPlaceholder = false
}: Props<Draft>) => (
  <Dropdown>
    <Dropdown.Trigger>
      <Button variant="outline">
        <FilterIcon size={16} aria-hidden="true" />
        Filter
        {showChevron && <AltArrowDownIcon size={16} aria-hidden="true" />}
      </Button>
    </Dropdown.Trigger>
    <Dropdown.Popover>
      <Surface className={classes.filterPanel}>
        <h2 className={classes.filterTitle}>Filter</h2>
        {filters.map(filter => (
          <Select
            key={filter.key}
            fullWidth
            aria-label={filter.ariaLabel ?? `Filter by ${filter.label}`}
            placeholder={
              filter.placeholder ??
              (showPlaceholder
                ? `Select ${filter.label.toLowerCase()}`
                : undefined)
            }
            value={draftFilters[filter.key]}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                [filter.key]: value ? String(value) : null
              } as Draft)
            }>
            <Label>{filter.label}</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {filter.values.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        ))}
        <div className={classes.filterActions}>
          <Button variant="secondary" onPress={onReset}>
            Reset
          </Button>
          <Button onPress={onApply}>Apply</Button>
        </div>
      </Surface>
    </Dropdown.Popover>
  </Dropdown>
)
