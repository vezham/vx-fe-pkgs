import { classNames } from '@pages/academic/class-routine/variants'
import { AcademicToast } from '@pages/academic/shared/toast'

export const RoutineToast = (
  props: Omit<React.ComponentProps<typeof AcademicToast>, 'className'>
) => <AcademicToast {...props} className={classNames.toast} />
