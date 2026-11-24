// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NativeSelect } from '@vezham/react-pro-v3'

export function Default() {
  return (
    <div className="w-full max-w-[220px]">
      <NativeSelect className="w-full">
        <NativeSelect.Trigger>
          <NativeSelect.Option value="">Select status</NativeSelect.Option>
          <NativeSelect.Option value="todo">Todo</NativeSelect.Option>
          <NativeSelect.Option value="in-progress">
            In Progress
          </NativeSelect.Option>
          <NativeSelect.Option value="done">Done</NativeSelect.Option>
          <NativeSelect.Option value="cancelled">Cancelled</NativeSelect.Option>
          <NativeSelect.Indicator />
        </NativeSelect.Trigger>
      </NativeSelect>
    </div>
  )
}
