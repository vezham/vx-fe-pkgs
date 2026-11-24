// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NativeSelect } from '@vezham/react-pro-v3'
import { Description, Label } from '@vezham/react-v3'

export function WithLabel() {
  return (
    <div className="w-[220px]">
      <NativeSelect fullWidth>
        <Label>Status</Label>
        <NativeSelect.Trigger name="status">
          <NativeSelect.Option value="">Select status</NativeSelect.Option>
          <NativeSelect.Option value="todo">Todo</NativeSelect.Option>
          <NativeSelect.Option value="in-progress">
            In Progress
          </NativeSelect.Option>
          <NativeSelect.Option value="done">Done</NativeSelect.Option>
          <NativeSelect.Option value="cancelled">Cancelled</NativeSelect.Option>
          <NativeSelect.Indicator />
        </NativeSelect.Trigger>
        <Description>Choose the current task status</Description>
      </NativeSelect>
    </div>
  )
}
