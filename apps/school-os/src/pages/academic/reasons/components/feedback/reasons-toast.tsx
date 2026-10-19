import { classNames } from '@pages/academic/reasons/variants'
import { AcademicToast } from '@pages/academic/shared/toast'

export const ReasonsToast = (
  props: Omit<React.ComponentProps<typeof AcademicToast>, 'className'>
) => <AcademicToast {...props} className={classNames.toast} />
