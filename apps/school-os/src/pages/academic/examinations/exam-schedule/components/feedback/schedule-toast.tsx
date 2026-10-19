import { classNames } from '@pages/academic/examinations/exam-schedule/variants'
import { AcademicToast } from '@pages/academic/shared/toast'

export const ScheduleToast = (
  props: Omit<React.ComponentProps<typeof AcademicToast>, 'className'>
) => <AcademicToast {...props} className={classNames.toast} />
