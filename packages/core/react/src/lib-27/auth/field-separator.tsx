import type { ReactNode } from 'react'

import { Separator } from '@vezham/react-v3'

export const FieldSeparator = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center gap-4">
      <Separator className="flex-1" />

      <p className="text-muted shrink-0 text-xs">{children}</p>

      <Separator className="flex-1" />
    </div>
  )
}
