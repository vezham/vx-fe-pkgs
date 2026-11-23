import { multiSessionPlugin } from '@vezham/auth-ui-core/plugins/multi-session'
import { useAuth, useAuthPlugin, useSession } from '@vezham/auth-ui-react'
import { TransferHorizontal as ArrowRightArrowLeft } from '@vezham/icons-react'
import { Dropdown, Label } from '@vezham/react-v3'

import { SwitchAccountSubmenuContent } from './switch-account-submenu-content'

export type SwitchAccountSubmenuProps = {
  className?: string
  hideSubtitle?: boolean
}

/**
 * Render a dropdown submenu for switching between multiple authenticated sessions.
 *
 * This component renders as a submenu trigger that opens the switch account menu.
 * It should be rendered inside a Dropdown.Menu.
 *
 * @param className - Optional additional CSS class names
 * @returns The switch account submenu as a JSX element
 */
export const SwitchAccountSubmenu = ({
  className,
  hideSubtitle
}: SwitchAccountSubmenuProps) => {
  const { authClient } = useAuth()
  const { data: session } = useSession(authClient)
  const { localization: multiSessionLocalization } =
    useAuthPlugin(multiSessionPlugin)

  if (!session) {
    return null
  }

  return (
    <Dropdown.SubmenuTrigger>
      <Dropdown.Item
        className={className}
        textValue={multiSessionLocalization.switchAccount}>
        <ArrowRightArrowLeft size={16} className="text-muted" />

        <Label>{multiSessionLocalization.switchAccount}</Label>

        <Dropdown.SubmenuIndicator />
      </Dropdown.Item>

      <Dropdown.Popover className="max-w-[48svw] min-w-40 md:min-w-56">
        <SwitchAccountSubmenuContent hideSubtitle={hideSubtitle} />
      </Dropdown.Popover>
    </Dropdown.SubmenuTrigger>
  )
}
