import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { AltArrowDown } from '@vezham/icons-react'
import {
  Button,
  Chip,
  Label,
  ListBox,
  Select,
  Sheet,
  useMediaQuery
} from '@vezham/react-v3'
import { localizedUrl } from '@vezham/start/runtime/docs'

import { i18n } from '@app/docs'
import {
  getAvailableDocsPackages,
  packagesDocsRuntime
} from '@components/docs/packages-docs'
import {
  type DocsPackage,
  docsPackages,
  getDocsPackage,
  getPackageDocsPath
} from '@config/packages'
import type { Locale } from '@generated/vx'
import { getContentPage } from '@src/lib/docs/content-navigation'

type Props = {
  packageId: DocsPackage
  locale: Locale
  page: string
}

const usePackageNavigation = ({ locale, page }: Props) => {
  const navigate = useNavigate()
  return (key: string) => {
    const id = getDocsPackage(key)
    const target =
      id &&
      getContentPage(packagesDocsRuntime.source, page, {
        locale,
        prefix: id
      })
    if (id && target !== undefined)
      void navigate({
        to: localizedUrl(i18n, locale, getPackageDocsPath(id, target))
      })
  }
}

const packageItems = (locale: Locale) =>
  getAvailableDocsPackages(locale).map(id => (
    <ListBox.Item key={id} id={id} textValue={docsPackages[id].name}>
      {docsPackages[id].name}
      <ListBox.ItemIndicator />
    </ListBox.Item>
  ))

const PackageSelect = (props: Props) => {
  const selectPackage = usePackageNavigation(props)
  return (
    <Select
      aria-label="Choose package"
      value={props.packageId}
      onChange={key => selectPackage(String(key))}>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover placement="bottom end">
        <ListBox aria-label="Packages">{packageItems(props.locale)}</ListBox>
      </Select.Popover>
    </Select>
  )
}

const PackageSheetSelector = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectPackage = usePackageNavigation(props)
  return (
    <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <Sheet.Trigger>
        <Button aria-label="Choose package" variant="secondary">
          {docsPackages[props.packageId].name}
          <AltArrowDown size={12} aria-hidden="true" />
        </Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Choose package</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <ListBox
                aria-label="Packages"
                selectionMode="single"
                disallowEmptySelection
                selectedKeys={[props.packageId]}
                onSelectionChange={keys => {
                  if (keys === 'all') return
                  const key = [...keys][0]
                  if (key !== undefined) {
                    setIsOpen(false)
                    selectPackage(String(key))
                  }
                }}>
                {packageItems(props.locale)}
              </ListBox>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  )
}

export const PackageSelector = (props: Props) => {
  const isMobile = useMediaQuery('(width < 768px)', {
    initializeWithValue: false
  })
  return isMobile ? (
    <PackageSheetSelector {...props} />
  ) : (
    <PackageSelect {...props} />
  )
}

export const PackageVersionSelector = ({
  packageId
}: {
  packageId: DocsPackage
}) => {
  const { version } = docsPackages[packageId]
  return (
    <Select aria-label="Package version" value={version}>
      <Select.Trigger>
        <Select.Value>v{version}</Select.Value>
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover placement="bottom start">
        <ListBox aria-label="Documented package versions">
          <ListBox.Item id={version} textValue={`v${version}`}>
            <Label>v{version}</Label>
            <Chip size="sm" variant="soft" color="accent">
              <Chip.Label>Latest</Chip.Label>
            </Chip>
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
