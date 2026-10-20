import { classNames } from '@pages/academic/examinations/exam-attendance/variants'
import { AcademicToast } from '@pages/academic/shared/toast'

export const AttendanceToast = (
  props: Omit<React.ComponentProps<typeof AcademicToast>, 'className'>
) => <AcademicToast {...props} className={classNames.toast} />
