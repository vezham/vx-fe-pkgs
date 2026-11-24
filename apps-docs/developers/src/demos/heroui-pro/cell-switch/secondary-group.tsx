// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { CellSwitch } from '@vezham/react-pro-v3'

export function SecondaryGroup() {
  const [notifications, setNotifications] = useState(true)
  const [marketing, setMarketing] = useState(false)

  return (
    <div className="flex w-[252px] flex-col gap-2">
      <CellSwitch
        aria-label="Notifications"
        isSelected={notifications}
        variant="secondary"
        onChange={setNotifications}>
        <CellSwitch.Trigger>
          <CellSwitch.Label>Notifications</CellSwitch.Label>
          <CellSwitch.Control />
        </CellSwitch.Trigger>
      </CellSwitch>

      <CellSwitch
        aria-label="Marketing emails"
        isSelected={marketing}
        variant="secondary"
        onChange={setMarketing}>
        <CellSwitch.Trigger>
          <CellSwitch.Label>Marketing emails</CellSwitch.Label>
          <CellSwitch.Control />
        </CellSwitch.Trigger>
      </CellSwitch>
    </div>
  )
}
