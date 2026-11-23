// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { UsersGroupRounded, Widget } from '@vezham/icons-react'
import { Auth } from '@vezham/react/auth'

export const UserButtonLinksDemo = () => {
  return (
    <Auth.User.Button
      links={[
        {
          label: 'Dashboard',
          href: '#',
          icon: <Widget className="text-muted" />,
          visibility: 'authenticated'
        },
        {
          label: 'Team',
          href: '#',
          icon: <UsersGroupRounded className="text-muted" />
        }
      ]}
    />
  )
}
