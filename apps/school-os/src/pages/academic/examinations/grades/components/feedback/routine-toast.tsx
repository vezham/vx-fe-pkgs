import { classNames } from '@pages/academic/examinations/grades/variants'
import { AcademicToast } from '@pages/academic/shared/toast'

export const RoutineToast = (
  props: Omit<React.ComponentProps<typeof AcademicToast>, 'className'>
) => <AcademicToast {...props} className={classNames.toast} />
