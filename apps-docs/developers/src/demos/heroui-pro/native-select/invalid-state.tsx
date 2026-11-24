// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NativeSelect } from '@vezham/react-pro-v3'
import { FieldError, Label } from '@vezham/react-v3'

export function InvalidState() {
  return (
    <div className="w-[220px]">
      <NativeSelect aria-invalid="true" className="w-full" data-invalid="true">
        <Label>Status</Label>
        <NativeSelect.Trigger aria-invalid="true" name="status">
          <NativeSelect.Option value="">Select status</NativeSelect.Option>
          <NativeSelect.Option value="todo">Todo</NativeSelect.Option>
          <NativeSelect.Option value="in-progress">
            In Progress
          </NativeSelect.Option>
          <NativeSelect.Option value="done">Done</NativeSelect.Option>
          <NativeSelect.Option value="cancelled">Cancelled</NativeSelect.Option>
          <NativeSelect.Indicator />
        </NativeSelect.Trigger>
        <FieldError>Please select a status</FieldError>
      </NativeSelect>
    </div>
  )
}
