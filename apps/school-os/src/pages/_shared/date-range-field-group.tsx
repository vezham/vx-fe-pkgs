import { DateField, DateRangePicker } from '@vezham/react-v3'

export const DateRangeFieldGroup = () => (
  <DateField.Group fullWidth>
    <DateField.Input slot="start">
      {segment => <DateField.Segment segment={segment} />}
    </DateField.Input>
    <DateRangePicker.RangeSeparator />
    <DateField.Input slot="end">
      {segment => <DateField.Segment segment={segment} />}
    </DateField.Input>
    <DateField.Suffix>
      <DateRangePicker.Trigger>
        <DateRangePicker.TriggerIndicator />
      </DateRangePicker.Trigger>
    </DateField.Suffix>
  </DateField.Group>
)
