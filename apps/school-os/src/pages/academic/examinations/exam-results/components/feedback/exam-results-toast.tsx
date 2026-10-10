import { classNames } from '@pages/academic/examinations/exam-results/variants'
import { AcademicToast } from '@pages/academic/shared/toast'

export const ExamResultsToast = (
  props: Omit<React.ComponentProps<typeof AcademicToast>, 'className'>
) => <AcademicToast {...props} className={classNames.toast} />
