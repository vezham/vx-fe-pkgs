import { AcademicToast } from '@pages/academic/shared/toast'
import { classNames } from '@pages/academic/syllabus/variants'

export const RoutineToast = (
  props: Omit<React.ComponentProps<typeof AcademicToast>, 'className'>
) => <AcademicToast {...props} className={classNames.toast} />
