// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NativeSelect } from '@vezham/react-pro-v3'
import { Label } from '@vezham/react-v3'

export function CustomIndicator() {
  return (
    <div className="w-[220px]">
      <NativeSelect fullWidth>
        <Label>Priority</Label>
        <NativeSelect.Trigger name="priority">
          <NativeSelect.Option value="">Select priority</NativeSelect.Option>
          <NativeSelect.Option value="low">Low</NativeSelect.Option>
          <NativeSelect.Option value="medium">Medium</NativeSelect.Option>
          <NativeSelect.Option value="high">High</NativeSelect.Option>
          <NativeSelect.Option value="critical">Critical</NativeSelect.Option>
          <NativeSelect.Indicator>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="m7 15 5 5 5-5" />
              <path d="m7 9 5-5 5 5" />
            </svg>
          </NativeSelect.Indicator>
        </NativeSelect.Trigger>
      </NativeSelect>
    </div>
  )
}
