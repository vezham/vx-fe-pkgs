// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { ColorField, Description, Label, Surface } from '@vezham/react-v3'

export function OnSurface() {
  return (
    <Surface className="w-[320px] p-4">
      <ColorField defaultValue="#3B82F6" name="color">
        <Label>Theme Color</Label>
        <ColorField.Group variant="secondary">
          <ColorField.Input />
        </ColorField.Group>
        <Description>Select your theme color</Description>
      </ColorField>
    </Surface>
  )
}
