import { ComposerLayout } from './composer'
import type { ComposerProps } from './composer'

export const ComposerLite = (props: ComposerProps) => (
  <ComposerLayout {...props} variant="embed" />
)
