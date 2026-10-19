import {
  AltArrowDown as AltArrowDownIcon,
  AltArrowLeft as AltArrowLeftIcon,
  CalendarDate as CalendarDateIcon,
  CheckRead as CheckReadIcon
} from '@vezham/icons-react'
import {
  Button,
  DateRangePicker,
  Dropdown,
  RangeCalendar,
  Surface
} from '@vezham/react-v3'

import { DateRangeFieldGroup } from '@pages/_shared/date-range-field-group'

type PickerDateValue = { toString(): string }
type CustomDateRangeValue = {
  start: PickerDateValue
  end: PickerDateValue
}
type DateOption<Key extends string> = { key: Key; label: string }
type DateRangeClasses = {
  customDatePanel: string
  dateOptionLabel: string
  datePopover: string
  fullWidth: string
}

type Props<Key extends string> = {
  activeDateLabel: string
  ariaLabel: string
  classes: DateRangeClasses
  dateOptions: readonly DateOption<Key>[]
  datePreset: Key
  isCustomDateRangeOpen: boolean
  isDateDropdownOpen: boolean
  closeCustomOnDismiss?: boolean
  onCustomDateRangeChange: (value: CustomDateRangeValue | null) => void
  onCustomDateRangeOpenChange: (isOpen: boolean) => void
  onDateDropdownOpenChange: (isOpen: boolean) => void
  onDatePresetChange: (key: Key) => void
}

export const createPageDateRangeDropdown = <Key extends string>(
  options: Pick<
    Props<Key>,
    'ariaLabel' | 'classes' | 'dateOptions' | 'closeCustomOnDismiss'
  >
) => {
  return (props: Omit<Props<Key>, keyof typeof options>) => (
    <PageDateRangeDropdown {...props} {...options} />
  )
}

export const PageDateRangeDropdown = <Key extends string>({
  activeDateLabel,
  ariaLabel,
  classes,
  dateOptions,
  datePreset,
  isCustomDateRangeOpen,
  isDateDropdownOpen,
  closeCustomOnDismiss = false,
  onCustomDateRangeChange,
  onCustomDateRangeOpenChange,
  onDateDropdownOpenChange,
  onDatePresetChange
}: Props<Key>) => (
  <Dropdown
    isOpen={isDateDropdownOpen}
    onOpenChange={open => {
      onDateDropdownOpenChange(open)
      if (!open && closeCustomOnDismiss) {
        onCustomDateRangeOpenChange(false)
      }
    }}>
    <Dropdown.Trigger>
      <Button variant="outline">
        <CalendarDateIcon size={16} aria-hidden="true" />
        {activeDateLabel}
        <AltArrowDownIcon size={16} aria-hidden="true" />
      </Button>
    </Dropdown.Trigger>
    <Dropdown.Popover>
      <Surface className={classes.datePopover}>
        {isCustomDateRangeOpen ? (
          <div className={classes.customDatePanel}>
            <Button
              variant="ghost"
              onPress={() => onCustomDateRangeOpenChange(false)}>
              <AltArrowLeftIcon size={16} aria-hidden="true" />
              Date presets
            </Button>
            <DateRangePicker
              defaultOpen
              aria-label={ariaLabel}
              className={classes.fullWidth}
              endName="endDate"
              startName="startDate"
              onChange={onCustomDateRangeChange}>
              <DateRangeFieldGroup />
              <DateRangePicker.Popover>
                <RangeCalendar aria-label={ariaLabel}>
                  <RangeCalendar.Header>
                    <RangeCalendar.Heading />
                    <RangeCalendar.NavButton slot="previous" />
                    <RangeCalendar.NavButton slot="next" />
                  </RangeCalendar.Header>
                  <RangeCalendar.Grid>
                    <RangeCalendar.GridHeader>
                      {day => (
                        <RangeCalendar.HeaderCell>
                          {day}
                        </RangeCalendar.HeaderCell>
                      )}
                    </RangeCalendar.GridHeader>
                    <RangeCalendar.GridBody>
                      {date => <RangeCalendar.Cell date={date} />}
                    </RangeCalendar.GridBody>
                  </RangeCalendar.Grid>
                </RangeCalendar>
              </DateRangePicker.Popover>
            </DateRangePicker>
          </div>
        ) : (
          <Dropdown.Menu aria-label="Date presets">
            {dateOptions.map(option => (
              <Dropdown.Item
                key={option.key}
                id={option.key}
                textValue={option.label}
                onPress={() => onDatePresetChange(option.key)}>
                <span className={classes.dateOptionLabel}>
                  {option.label}
                  {datePreset === option.key && (
                    <CheckReadIcon size={16} aria-hidden="true" />
                  )}
                </span>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
      </Surface>
    </Dropdown.Popover>
  </Dropdown>
)
