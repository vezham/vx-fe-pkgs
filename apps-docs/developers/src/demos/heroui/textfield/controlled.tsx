// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import React from 'react'

import {
  Description,
  Input,
  Label,
  TextArea,
  TextField
} from '@vezham/react-v3'

export function Controlled() {
  const [name, setName] = React.useState('')
  const [bio, setBio] = React.useState('')

  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <TextField name="name" value={name} onChange={setName}>
        <Label>Display name</Label>
        <Input placeholder="Jane" />
        <Description>Characters: {name.length}</Description>
      </TextField>
      <TextField name="bio" value={bio} onChange={setBio}>
        <Label>Bio</Label>
        <TextArea placeholder="Tell us about yourself..." />
        <Description>Characters: {bio.length} / 200</Description>
      </TextField>
    </div>
  )
}
