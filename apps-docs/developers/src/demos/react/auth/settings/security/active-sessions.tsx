// vx-bot/INFO: Adapted from Better Auth UI; see the Auth demos LICENSE.
import { Auth } from '@vezham/react/auth'

export const ActiveSessionsDemo = () => {
  return (
    <div className="w-full">
      <Auth.Settings.Security.Sessions />
    </div>
  )
}
