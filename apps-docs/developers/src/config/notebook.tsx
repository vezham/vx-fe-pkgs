import { Brand } from '@vezham/react/components/brand'
import { localizedUrl } from '@vezham/start/runtime/docs'

import { ControlCenter } from '@components/docs/control-center'
import { UserControls } from '@components/docs/user-controls'
import { getBrandLinkProps } from '@config/brand'
import { baseOptions } from '@config/layout'
import { type Locale, vxI18n } from '@generated/vx'

export const notebookDrawerFooterProps = { controls: <ControlCenter /> }

export const getNotebookConfig = (locale: Locale) => ({
  baseOptions: baseOptions(locale),
  resolveUrl: (path: string) => localizedUrl(vxI18n, locale, path),
  headerProps: {
    brand: <Brand.Link {...getBrandLinkProps(locale)} />,
    controls: <ControlCenter />,
    userControls: <UserControls />
  },
  drawerHeaderProps: {
    brand: <Brand.Link {...getBrandLinkProps(locale)} logoSize={22} />
  },
  drawerFooterProps: notebookDrawerFooterProps
})
