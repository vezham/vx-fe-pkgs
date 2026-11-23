// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { Organization } from '@vezham/react/auth/plugins/organization'

import { OrganizationDemoWrapper } from './organization-demo-wrapper'

export const UserInvitationsDemo = () => {
  return (
    <OrganizationDemoWrapper>
      <Organization.UserInvitations />
    </OrganizationDemoWrapper>
  )
}
