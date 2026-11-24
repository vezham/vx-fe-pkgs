// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { InputOTP, Label, Link } from '@vezham/react-v3'

const slotClass =
  'rounded-lg border-border/80 bg-default data-[active=true]:border-accent/40 data-[active=true]:bg-accent-soft'

export function CustomStyles() {
  return (
    <div className="flex w-72 flex-col gap-2">
      <Label>Verify account</Label>
      <InputOTP maxLength={6}>
        <InputOTP.Group>
          <InputOTP.Slot className={slotClass} index={0} />
          <InputOTP.Slot className={slotClass} index={1} />
          <InputOTP.Slot className={slotClass} index={2} />
        </InputOTP.Group>
        <InputOTP.Separator className="bg-border" />
        <InputOTP.Group>
          <InputOTP.Slot className={slotClass} index={3} />
          <InputOTP.Slot className={slotClass} index={4} />
          <InputOTP.Slot className={slotClass} index={5} />
        </InputOTP.Group>
      </InputOTP>
      <Link className="text-link text-sm" href="#">
        Resend code
      </Link>
    </div>
  )
}
