import {
  AltArrowDown as AltArrowDownIcon,
  SliderVertical as SliderVerticalIcon
} from '@vezham/icons-react'
import { Button, Dropdown } from '@vezham/react-v3'

type ColumnOption<Key extends string> = { key: Key; label: string }

type Props<Key extends string> = {
  ariaLabel: string
  buttonLabel?: string
  labelClassName?: string
  options?: readonly ColumnOption<Key>[]
  columns?: readonly ColumnOption<Key>[]
  visibleColumns: Set<Key>
  onVisibleColumnsChange: (columns: Set<Key>) => void
}

export const ColumnsDropdown = <Key extends string>({
  ariaLabel,
  buttonLabel = 'Columns',
  labelClassName = 'flex w-full items-center justify-between',
  options,
  columns,
  visibleColumns,
  onVisibleColumnsChange
}: Props<Key>) => {
  const resolvedOptions = options ?? columns ?? []

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="outline">
          <SliderVerticalIcon size={16} aria-hidden="true" />
          {buttonLabel}
          <AltArrowDownIcon size={16} aria-hidden="true" />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu
          aria-label={ariaLabel}
          selectedKeys={visibleColumns}
          selectionMode="multiple"
          onSelectionChange={keys =>
            onVisibleColumnsChange(
              keys === 'all'
                ? new Set(resolvedOptions.map(option => option.key))
                : new Set(Array.from(keys) as Key[])
            )
          }>
          {resolvedOptions.map(option => (
            <Dropdown.Item
              key={option.key}
              id={option.key}
              textValue={option.label}>
              <span className={labelClassName}>
                {option.label}
                <Dropdown.ItemIndicator />
              </span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
