import { useNavigate } from '@tanstack/react-router'
import { Fragment, useState } from 'react'

import { AltArrowDown } from '@vezham/icons-react'
import {
  Chip,
  Description,
  Dropdown,
  Header,
  Label,
  Separator
} from '@vezham/react-v3'
import { localizedUrl } from '@vezham/start/runtime/docs'

import { i18n } from '@app/docs'
import { versionSelectorVariants } from '@components/docs/navigation.variants'
import {
  type UiLibrary,
  getUiLibrary,
  getUiLibrarySelectorTitle,
  uiLibrarySections
} from '@config/ui-libraries'
import type { Locale } from '@generated/vx'

const styles = versionSelectorVariants()

export const LibrarySelector = ({
  library,
  locale
}: {
  library: UiLibrary
  locale: Locale
}) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <Dropdown isOpen={open} onOpenChange={setOpen}>
      <Dropdown.Trigger className={styles.trigger()}>
        <span className={styles.label({ className: 'max-w-none' })}>
          {getUiLibrarySelectorTitle(library)}
        </span>
        <AltArrowDown size={12} className={styles.chevron({ open })} />
      </Dropdown.Trigger>
      <Dropdown.Popover
        className="w-max max-w-[calc(100vw-2rem)]"
        placement="bottom start">
        <Dropdown.Menu
          selectedKeys={[library]}
          selectionMode="single"
          onAction={key => {
            const id = uiLibrarySections
              .flatMap(section => section.items)
              .find(id => id === key)
            if (!id || getUiLibrary(id).disabled) return
            void navigate({
              to: localizedUrl(i18n, locale, getUiLibrary(id).routeBase)
            })
          }}>
          {uiLibrarySections.map((section, index) => (
            <Fragment key={section.id}>
              {index > 0 && <Separator />}
              <Dropdown.Section aria-label={section.title ?? section.id}>
                {section.title && <Header>{section.title}</Header>}
                {section.items.map(id => {
                  const option = getUiLibrary(id)
                  const title = getUiLibrarySelectorTitle(id)
                  return (
                    <Dropdown.Item
                      key={id}
                      className="group/library data-[selected=true]:bg-accent-soft py-2 ps-3 pe-10"
                      id={id}
                      isDisabled={option.disabled}
                      textValue={title}>
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <Label className="group-data-[selected=true]/library:text-accent-soft-foreground">
                            {title}
                          </Label>
                          {option.badge && (
                            <Chip size="sm" variant="soft">
                              {option.badge}
                            </Chip>
                          )}
                        </div>
                        {option.description && (
                          <Description>{option.description}</Description>
                        )}
                      </div>
                      {!option.disabled && (
                        <Dropdown.ItemIndicator className="group-data-[selected=true]/library:text-accent-soft-foreground start-auto end-3" />
                      )}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown.Section>
            </Fragment>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
