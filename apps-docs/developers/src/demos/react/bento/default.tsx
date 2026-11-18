import { Layers, Palette } from '@vezham/icons-react'
import { Bento } from '@vezham/react/layouts/bento'

export const Default = () => (
  <Bento className="w-full">
    <Bento.Card
      className="md:col-span-2"
      eyebrow="Components"
      title="Build faster."
      headingAs="h3"
      description="Reusable components for your next interface."
      icon={<Layers size={28} aria-hidden="true" />}
      action={<Bento.Action href="#" aria-label="Explore components" />}>
      <div
        aria-hidden="true"
        className="mt-4 rounded-xl border p-4 font-mono text-sm">
        {'<Button>Continue</Button>'}
      </div>
    </Bento.Card>
    <Bento.Card
      eyebrow="Design"
      title="Tokens"
      headingAs="h3"
      description="A shared language for color, type, and spacing."
      icon={<Palette size={28} aria-hidden="true" />}
      action={<Bento.Action href="#" aria-label="Explore design tokens" />}
    />
  </Bento>
)
