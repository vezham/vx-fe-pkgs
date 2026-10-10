import { classNames } from '@pages/academic/classroom/variants'
import { AcademicToast } from '@pages/academic/shared/toast'

export const ClassroomToast = (
  props: Omit<React.ComponentProps<typeof AcademicToast>, 'className'>
) => <AcademicToast {...props} className={classNames.toast} />
