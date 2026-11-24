// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Avatar, Description, Label, ListBox } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <ListBox
      aria-label="Assignee"
      className="border-border/80 bg-surface w-56 rounded-xl border p-1 shadow-sm"
      selectionMode="single">
      <ListBox.Item
        className="data-[focused=true]:bg-accent/10 data-[selected=true]:bg-accent/5 rounded-lg"
        id="1"
        textValue="Bob">
        <Avatar size="sm">
          <Avatar.Image
            alt="Bob"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
          />
          <Avatar.Fallback>B</Avatar.Fallback>
        </Avatar>
        <div className="flex flex-col">
          <Label>Bob</Label>
          <Description>bob@heroui.com</Description>
        </div>
        <ListBox.ItemIndicator />
      </ListBox.Item>
      <ListBox.Item
        className="data-[focused=true]:bg-accent/10 data-[selected=true]:bg-accent/5 rounded-lg"
        id="2"
        textValue="Fred">
        <Avatar size="sm">
          <Avatar.Image
            alt="Fred"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
          />
          <Avatar.Fallback>F</Avatar.Fallback>
        </Avatar>
        <div className="flex flex-col">
          <Label>Fred</Label>
          <Description>fred@heroui.com</Description>
        </div>
        <ListBox.ItemIndicator />
      </ListBox.Item>
    </ListBox>
  )
}
