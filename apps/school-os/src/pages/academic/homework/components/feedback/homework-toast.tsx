import { classNames } from '@pages/academic/homework/variants'
import { AcademicToast } from '@pages/academic/shared/toast'

export const HomeworkToast = (
  props: Omit<React.ComponentProps<typeof AcademicToast>, 'className'>
) => <AcademicToast {...props} className={classNames.toast} />
