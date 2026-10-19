import { Label, ListBox, Select } from '@vezham/react-v3'

type Props = {
  className: string
  options: readonly string[]
  value: string
  onChange: (value: string) => void
}

export const RowCountControl = ({
  className,
  options,
  value,
  onChange
}: Props) => (
  <div className={className}>
    <Label>Row Per Page</Label>
    <Select
      aria-label="Rows per page"
      value={value}
      onChange={nextValue => onChange(nextValue ? String(nextValue) : '10')}>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map(option => (
            <ListBox.Item key={option} id={option} textValue={option}>
              {option}
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
    <Label>Entries</Label>
  </div>
)
