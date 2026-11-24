// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NativeSelect } from '@vezham/react-pro-v3'
import { Label } from '@vezham/react-v3'

export function WithDisabledOptions() {
  return (
    <div className="w-[220px]">
      <NativeSelect fullWidth>
        <Label>Animal</Label>
        <NativeSelect.Trigger name="animal">
          <NativeSelect.Option value="">Select an animal</NativeSelect.Option>
          <NativeSelect.Option value="dog">Dog</NativeSelect.Option>
          <NativeSelect.Option disabled value="cat">
            Cat (unavailable)
          </NativeSelect.Option>
          <NativeSelect.Option value="bird">Bird</NativeSelect.Option>
          <NativeSelect.Option disabled value="kangaroo">
            Kangaroo (unavailable)
          </NativeSelect.Option>
          <NativeSelect.Option value="elephant">Elephant</NativeSelect.Option>
          <NativeSelect.Indicator />
        </NativeSelect.Trigger>
      </NativeSelect>
    </div>
  )
}
