// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Button, Dropdown, Label } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <Dropdown>
      <Button variant="secondary">Actions</Button>
      <Dropdown.Popover className="border-border/80 bg-surface rounded-xl border p-1 shadow-sm">
        <Dropdown.Menu>
          <Dropdown.Item
            className="data-[focused=true]:bg-default rounded-lg"
            id="rename"
            textValue="Rename">
            <Label>Rename</Label>
          </Dropdown.Item>
          <Dropdown.Item
            className="data-[focused=true]:bg-default rounded-lg"
            id="duplicate"
            textValue="Duplicate">
            <Label>Duplicate</Label>
          </Dropdown.Item>
          <Dropdown.Item
            className="data-[focused=true]:bg-danger-soft rounded-lg"
            id="delete"
            textValue="Delete"
            variant="danger">
            <Label>Delete</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
