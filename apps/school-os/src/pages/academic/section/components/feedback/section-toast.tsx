import { classNames } from '@pages/academic/section/variants'
import { AcademicToast } from '@pages/academic/shared/toast'

export const SectionToast = (
  props: Omit<React.ComponentProps<typeof AcademicToast>, 'className'>
) => <AcademicToast {...props} className={classNames.toast} />
