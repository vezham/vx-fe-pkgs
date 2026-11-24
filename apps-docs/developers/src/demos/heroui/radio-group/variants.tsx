// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Description, Radio, RadioGroup } from '@vezham/react-v3'

export function Variants() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">Primary variant</p>
        <RadioGroup
          defaultValue="option1"
          name="primary-plan"
          variant="primary">
          <Radio value="option1">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Option 1
            </Radio.Content>
            <Description>Standard styling with default background</Description>
          </Radio>
          <Radio value="option2">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Option 2
            </Radio.Content>
            <Description>Another option with primary styling</Description>
          </Radio>
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">Secondary variant</p>
        <RadioGroup
          defaultValue="option1"
          name="secondary-plan"
          variant="secondary">
          <Radio value="option1">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Option 1
            </Radio.Content>
            <Description>
              Lower emphasis variant for use in surfaces
            </Description>
          </Radio>
          <Radio value="option2">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Option 2
            </Radio.Content>
            <Description>Another option with secondary styling</Description>
          </Radio>
        </RadioGroup>
      </div>
    </div>
  )
}
