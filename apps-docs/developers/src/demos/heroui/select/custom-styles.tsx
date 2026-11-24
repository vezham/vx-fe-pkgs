// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Label, ListBox, Select } from '@vezham/react-v3'

const itemClass =
  'rounded-lg data-[focused=true]:bg-accent/10 data-[selected=true]:text-foreground'

export function CustomStyles() {
  return (
    <Select className="w-56" placeholder="Pick a plan" variant="secondary">
      <Label className="text-foreground font-medium">Plan</Label>
      <Select.Trigger className="bg-default rounded-xl">
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="border-border bg-surface rounded-xl border p-1 shadow-lg">
        <ListBox>
          <ListBox.Item className={itemClass} id="free" textValue="Free">
            Free
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item className={itemClass} id="pro" textValue="Pro">
            Pro
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
