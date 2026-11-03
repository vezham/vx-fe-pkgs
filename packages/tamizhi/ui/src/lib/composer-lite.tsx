import { ComposerLayout } from './composer'
import type { ComposerProps } from './composer-types'

export const ComposerLite = (props: ComposerProps) => (
  <ComposerLayout {...props} variant="embed" />
)
