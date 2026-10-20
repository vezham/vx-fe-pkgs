import { classNames } from '@pages/academic/classes/schedule/variants'
import { AcademicToast } from '@pages/academic/shared/toast'

export const ScheduleToast = (
  props: Omit<React.ComponentProps<typeof AcademicToast>, 'className'>
) => <AcademicToast {...props} className={classNames.toast} />
