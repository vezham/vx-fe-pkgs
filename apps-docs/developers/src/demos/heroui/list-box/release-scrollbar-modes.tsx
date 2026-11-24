// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { ListBox, Surface } from '@vezham/react-v3'

type ScrollbarMode = {
  id: string
  label: string
  scrollbar?: 'thin' | 'default' | 'none'
}

const modes: ScrollbarMode[] = [
  {
    id: 'heroui',
    label: 'HeroUI thin',
    scrollbar: 'thin'
  },
  {
    id: 'browser',
    label: 'Browser default',
    scrollbar: 'default'
  },
  {
    id: 'hidden',
    label: 'Hidden',
    scrollbar: 'none'
  }
]

const animals = [
  { id: 'aardvark', name: 'Aardvark' },
  { id: 'alpaca', name: 'Alpaca' },
  { id: 'antelope', name: 'Antelope' },
  { id: 'bear', name: 'Bear' },
  { id: 'cat', name: 'Cat' },
  { id: 'dog', name: 'Dog' },
  { id: 'fox', name: 'Fox' },
  { id: 'giraffe', name: 'Giraffe' },
  { id: 'kangaroo', name: 'Kangaroo' },
  { id: 'koala', name: 'Koala' },
  { id: 'lemur', name: 'Lemur' },
  { id: 'otter', name: 'Otter' },
  { id: 'panda', name: 'Panda' },
  { id: 'penguin', name: 'Penguin' },
  { id: 'rabbit', name: 'Rabbit' },
  { id: 'snake', name: 'Snake' },
  { id: 'turtle', name: 'Turtle' },
  { id: 'wombat', name: 'Wombat' },
  { id: 'zebra', name: 'Zebra' }
]

function ScrollbarListBox({ mode }: { mode: ScrollbarMode }) {
  return (
    <div className="flex w-[260px] flex-col gap-2">
      <h3 className="text-muted px-1 text-sm font-semibold">{mode.label}</h3>
      <Surface
        className="shadow-surface overflow-hidden rounded-3xl"
        data-scrollbar={mode.scrollbar}>
        <div className="scrollbar h-52 overflow-y-auto p-1">
          <ListBox aria-label={`${mode.label} animals`} selectionMode="single">
            {animals.map(animal => (
              <ListBox.Item
                key={`${mode.id}-${animal.id}`}
                className="text-sm leading-5 font-medium"
                id={`${mode.id}-${animal.id}`}
                textValue={animal.name}>
                {animal.name}
              </ListBox.Item>
            ))}
          </ListBox>
        </div>
      </Surface>
    </div>
  )
}

export function ScrollbarModes() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      {modes.map(mode => (
        <ScrollbarListBox key={mode.id} mode={mode} />
      ))}
    </div>
  )
}
