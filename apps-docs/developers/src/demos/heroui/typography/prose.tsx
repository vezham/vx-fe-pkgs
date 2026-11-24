// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Typography } from '@vezham/react-v3'

export const Prose = () => {
  return (
    <Typography.Prose className="flex max-w-xl flex-col gap-3">
      <h1>Prose title</h1>
      <p>
        Prose is for authored content where the markup is already semantic and
        HeroUI applies the default typography rhythm.
      </p>
      <h2>Section title</h2>
      <p>
        Inline code like <code>render</code> receives the same code treatment as
        the Typography primitive.
      </p>
    </Typography.Prose>
  )
}
