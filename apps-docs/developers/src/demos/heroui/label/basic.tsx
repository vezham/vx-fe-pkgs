// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Input, Label } from '@vezham/react-v3'

export function Basic() {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="name">Name</Label>
      <Input
        className="w-64"
        id="name"
        placeholder="Enter your name"
        type="text"
      />
    </div>
  )
}
