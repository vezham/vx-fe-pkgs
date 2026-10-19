import { classNames } from '@pages/academic/examinations/exam/variants'
import { AcademicToast } from '@pages/academic/shared/toast'

export const ExamToast = (
  props: Omit<React.ComponentProps<typeof AcademicToast>, 'className'>
) => <AcademicToast {...props} className={classNames.toast} />
