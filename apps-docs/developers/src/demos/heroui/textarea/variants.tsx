// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { TextArea } from '@vezham/react-v3'

export function Variants() {
  return (
    <div className="flex w-[280px] flex-col gap-2">
      <TextArea fullWidth placeholder="Primary textarea" variant="primary" />
      <TextArea
        fullWidth
        placeholder="Secondary textarea"
        variant="secondary"
      />
    </div>
  )
}
