import type { ComponentProps } from 'react'

import { PageToast } from '@pages/_shared/page-toast'

type Toast = {
  message: string
  status: ComponentProps<typeof PageToast>['status']
}

export const RecordToastLayer = ({
  toast,
  className,
  onClose
}: {
  toast: Toast | null
  className: string
  onClose: () => void
}) =>
  toast ? (
    <PageToast
      className={className}
      message={toast.message}
      status={toast.status}
      onClose={onClose}
    />
  ) : null
