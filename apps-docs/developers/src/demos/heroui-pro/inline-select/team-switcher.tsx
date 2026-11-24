// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { ComponentProps } from 'react'
import { useState } from 'react'

import { InlineSelect } from '@vezham/react-pro-v3'
import type { Key } from '@vezham/react-v3'
import { ListBox } from '@vezham/react-v3'

const Logo = (props: ComponentProps<'svg'>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M6 7.99017V12.7707C6 12.9967 6.12078 13.2067 6.31949 13.3262L9.70886 15.3643C10.1605 15.6359 10.7455 15.3225 10.7455 14.8089V10.7905C10.7455 10.5593 10.8719 10.3452 11.0781 10.2274L13.1455 9.04552V19.3445C13.1455 19.8564 13.727 20.1701 14.1788 19.902L17.6771 17.8257C17.8778 17.7067 18 17.4956 18 17.2683V7.3783C18 6.86892 17.4236 6.55483 16.9716 6.81795L13.1455 9.04552V4.65543C13.1455 4.14743 12.5719 3.83313 12.1199 4.09349L6.33057 7.42823C6.12556 7.54632 6 7.75976 6 7.99017Z"
      fill="currentColor"
    />
  </svg>
)

const teams = [
  {
    color: 'bg-violet-700',
    id: 'northwind-labs',
    letter: 'N',
    name: 'Northwind Labs'
  },
  { color: 'bg-blue-600', id: 'acme-corp', letter: 'A', name: 'Acme Corp' },
  {
    color: 'bg-amber-600',
    id: 'maple-studio',
    letter: 'M',
    name: 'Maple Studio'
  }
]

function TeamLetterIcon({ color, letter }: { color: string; letter: string }) {
  return (
    <div
      className={`${color} flex size-5 shrink-0 items-center justify-center rounded`}>
      <span className="text-[10px] font-bold text-white">{letter}</span>
    </div>
  )
}

export function TeamSwitcher() {
  const [team, setTeam] = useState<Key | null>('northwind-labs')

  const selectedTeam = teams.find(t => t.id === team) ?? teams[0]!

  return (
    <div className="flex items-center gap-2.5">
      <Logo className="size-6" />
      <span className="text-border text-lg font-light">/</span>
      <InlineSelect aria-label="Team" value={team} onChange={v => setTeam(v)}>
        <InlineSelect.Trigger className="gap-2">
          <TeamLetterIcon
            color={selectedTeam.color}
            letter={selectedTeam.letter}
          />
          <span className="text-sm font-medium">{selectedTeam.name}</span>
          <InlineSelect.Indicator />
        </InlineSelect.Trigger>
        <InlineSelect.Popover className="w-[200px]">
          <ListBox>
            {teams.map(t => (
              <ListBox.Item key={t.id} id={t.id} textValue={t.name}>
                <TeamLetterIcon color={t.color} letter={t.letter} />
                {t.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </InlineSelect.Popover>
      </InlineSelect>
    </div>
  )
}
