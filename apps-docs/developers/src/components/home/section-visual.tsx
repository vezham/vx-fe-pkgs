import { Code, VezhamLogo } from '@vezham/icons-react'
import { Button, Chip } from '@vezham/react-v3'

import {
  getUiLibrarySelectorTitle,
  uiLibrarySections
} from '@config/ui-libraries'

type Props = {
  section: 'ui' | 'handbook'
  compact?: boolean
}

type VisualProps = { compact: boolean }

const UiVisual = ({ compact }: VisualProps) => (
  <div
    className={`flex flex-col items-center pt-3 ${compact ? 'gap-3' : 'gap-6'}`}>
    <div
      aria-hidden="true"
      inert
      className={`bg-surface text-foreground shadow-surface w-full max-w-sm -rotate-3 rounded-2xl ${compact ? 'p-4' : 'p-5'}`}>
      <div
        className={`flex items-center gap-2 text-sm font-semibold ${compact ? 'mb-3' : 'mb-6'}`}>
        <VezhamLogo size={28} />
        Vezham UI
        <Code size={20} className="text-muted ms-auto" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size={compact ? 'sm' : 'md'}>Get started</Button>
        <Button size={compact ? 'sm' : 'md'} variant="secondary">
          Explore
        </Button>
        <Chip color="accent" variant="soft">
          <Chip.Label>React</Chip.Label>
        </Chip>
      </div>
      <p
        className={`text-muted font-mono text-xs ${compact ? 'mt-3' : 'mt-5'}`}>
        {'<Button>Make it yours</Button>'}
      </p>
    </div>
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
      {uiLibrarySections
        .flatMap(group => group.items)
        .map(library => (
          <li key={library}>{getUiLibrarySelectorTitle(library)}</li>
        ))}
    </ul>
  </div>
)

const HandbookVisual = ({ compact }: VisualProps) => (
  <div
    aria-hidden="true"
    className={`flex justify-center ${compact ? 'py-3' : 'py-8'}`}>
    <div
      className={`shadow-surface flex -rotate-6 flex-col justify-between rounded-s-md rounded-e-2xl border-e-4 border-b-4 border-[#dce6df] bg-[#163e35] text-[#e4f1db] ${compact ? 'h-44 w-36 p-4 min-[737px]:h-52 min-[737px]:w-40' : 'min-h-72 w-48 p-6'}`}>
      <VezhamLogo size={compact ? 32 : 48} />
      <div className="space-y-3">
        <p
          className={`leading-tight font-semibold tracking-tight ${compact ? 'text-xl min-[737px]:text-2xl' : 'text-3xl'}`}>
          Vezham
          <br />
          Handbook
        </p>
        <p className="text-xs leading-relaxed opacity-80">
          Principles.
          <br />
          Architecture.
          <br />
          Practice.
        </p>
      </div>
    </div>
  </div>
)

export const SectionVisual = ({ section, compact = false }: Props) =>
  section === 'ui' ? (
    <UiVisual compact={compact} />
  ) : (
    <HandbookVisual compact={compact} />
  )
