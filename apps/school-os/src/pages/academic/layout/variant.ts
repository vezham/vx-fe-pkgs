import type { VariantProps } from '@vezham/react-v3'

import { createSectionLayoutVariant } from '@pages/_shared/section-layout-variant'

const tva = createSectionLayoutVariant('w-56')

type tvProps = VariantProps<typeof tva>
type tvSlots = keyof ReturnType<typeof tva>

export { tva }
export type { tvProps, tvSlots }
