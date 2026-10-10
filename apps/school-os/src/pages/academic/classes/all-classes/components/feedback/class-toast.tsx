import { classNames } from '@pages/academic/classes/all-classes/variants'
import { AcademicToast } from '@pages/academic/shared/toast'

export const ClassToast = (
  props: Omit<React.ComponentProps<typeof AcademicToast>, 'className'>
) => <AcademicToast {...props} className={classNames.toast} />
