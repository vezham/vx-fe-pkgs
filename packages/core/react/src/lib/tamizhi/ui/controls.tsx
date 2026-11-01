import { useState } from 'react'

import { Bolt, SliderHorizontal } from '@vezham/icons-react'
import { Button, Popover, Radio, RadioGroup, Switch } from '@vezham/react-v3'

import { permissionOptions } from '../../components/panel/footer/ai/permission-picker'

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
        variant="ghost"
        size="sm"
        className="tamizhi-composer__controls-trigger">
        <SliderHorizontal size={18} aria-hidden="true" />
        <span>Controls</span>
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
                  <span className="text-muted text-xs">Simulated</span>
                </span>
              </Switch.Content>
            </Switch>
            <div className="border-separator border-t pt-2">
              <p className="text-muted px-2 pb-1.5 text-xs font-medium">
                Permissions
              </p>
              <RadioGroup
                aria-label="Tool permissions"
                value={permission}
                onChange={onPermissionChange}
                className="flex flex-col gap-0.5">
                {permissionOptions.map(({ label, description, Icon }) => (
                  <Radio
                    key={label}
                    value={label}
                    className="rounded-lg px-2 py-1.5">
                    <Radio.Content className="flex w-full items-start gap-2">
                      <Radio.Control className="mt-0.5">
                        <Radio.Indicator />
                      </Radio.Control>
                      <span className="flex min-w-0 flex-1 items-start gap-2">
                        <Icon
                          size={14}
                          aria-hidden="true"
                          className={`mt-0.5 shrink-0 ${label === 'Full access' ? 'text-warning' : 'text-muted'}`}
                        />
                        <span className="min-w-0">
                          <span
                            className={`block text-xs font-medium ${label === 'Full access' ? 'text-warning' : ''}`}>
                            {label}
                          </span>
                          <span className="text-muted block text-xs whitespace-normal">
                            {description}
                          </span>
                        </span>
                      </span>
                    </Radio.Content>
                  </Radio>
                ))}
              </RadioGroup>
              <p className="text-muted px-2 pt-1.5 text-[0.6875rem]">
                Preview only · No files or internet access is granted.
              </p>
            </div>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}
