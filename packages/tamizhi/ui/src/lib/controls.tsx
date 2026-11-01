import { useState } from 'react'

import { Bolt, Tuning } from '@vezham/icons-react'
import { Button, ListBox, Popover, Select, Switch } from '@vezham/react-v3'

import { permissionOptions } from './permission-picker'

interface Props {
  isFastMode: boolean
  onFastModeChange: (isFastMode: boolean) => void
  permission: string
  onPermissionChange: (permission: string) => void
}

export const ComposerControls = ({
  isFastMode,
  onFastModeChange,
  permission,
  onPermissionChange
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        type="button"
        aria-label="Composer controls"
        isIconOnly
        variant="ghost"
        size="sm"
        className="tamizhi-composer__controls-trigger">
        <span title="Composer controls">
          <Tuning size={24} aria-hidden="true" />
        </span>
      </Button>
      <Popover.Content
        placement="top start"
        className="w-72 max-w-[calc(100vw-2rem)]">
        <Popover.Dialog aria-label="Composer controls" className="p-2.5">
          <div className="flex flex-col gap-2">
            <Switch
              aria-label="Fast mode"
              isSelected={isFastMode}
              onChange={onFastModeChange}
              className="rounded-xl px-2 py-1.5">
              <Switch.Content className="flex w-full flex-row-reverse items-center justify-between gap-3">
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <Bolt size={16} aria-hidden="true" />
                    Fast mode
                  </span>
                </span>
              </Switch.Content>
            </Switch>
            <div className="border-separator border-t pt-2">
              <p className="text-muted px-2 pb-1.5 text-xs font-medium">
                Permissions
              </p>
              <Select
                aria-label="Tool permissions"
                className="w-full"
                value={permission}
                onChange={value => {
                  if (typeof value === 'string') onPermissionChange(value)
                }}
                variant="secondary">
                <Select.Trigger>
                  <Select.Value>{permission}</Select.Value>
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox aria-label="Permission levels">
                    {permissionOptions.map(({ label, description, Icon }) => (
                      <ListBox.Item
                        key={label}
                        id={label}
                        textValue={label}
                        className="gap-2 px-2 py-1.5">
                        <Icon
                          size={14}
                          aria-hidden="true"
                          className={`shrink-0 ${label === 'Full access' ? 'text-warning' : 'text-muted'}`}
                        />
                        <span className="min-w-0 flex-1 whitespace-normal">
                          <span
                            className={`block text-xs font-medium ${label === 'Full access' ? 'text-warning' : ''}`}>
                            {label}
                          </span>
                          <span className="text-muted block text-xs">
                            {description}
                          </span>
                        </span>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}
