// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { NativeSelect } from '@vezham/react-pro-v3'
import { Label } from '@vezham/react-v3'

const states = [
  { id: 'california', name: 'California' },
  { id: 'texas', name: 'Texas' },
  { id: 'florida', name: 'Florida' },
  { id: 'new-york', name: 'New York' },
  { id: 'illinois', name: 'Illinois' }
]

export function Controlled() {
  const [value, setValue] = useState('california')

  return (
    <div className="w-[220px] space-y-2">
      <NativeSelect fullWidth>
        <Label>State (controlled)</Label>
        <NativeSelect.Trigger
          name="state"
          value={value}
          onChange={e => setValue(e.target.value)}>
          <NativeSelect.Option value="">Select a state</NativeSelect.Option>
          {states.map(state => (
            <NativeSelect.Option key={state.id} value={state.id}>
              {state.name}
            </NativeSelect.Option>
          ))}
          <NativeSelect.Indicator />
        </NativeSelect.Trigger>
      </NativeSelect>
      <p className="text-muted text-sm">
        Selected: {states.find(s => s.id === value)?.name || 'None'}
      </p>
    </div>
  )
}
