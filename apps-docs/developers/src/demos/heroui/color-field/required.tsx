// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { ColorField, Description, Label } from '@vezham/react-v3'

export function Required() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField isRequired className="w-[280px]" name="color">
        <Label>Brand Color</Label>
        <ColorField.Group>
          <ColorField.Input placeholder="#000000" />
        </ColorField.Group>
      </ColorField>
      <ColorField isRequired className="w-[280px]" name="theme-color">
        <Label>Theme Color</Label>
        <ColorField.Group>
          <ColorField.Input placeholder="#000000" />
        </ColorField.Group>
        <Description>Required field</Description>
      </ColorField>
    </div>
  )
}
