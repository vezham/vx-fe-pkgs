import type { ClassDrawerProps } from '@pages/academic/examinations/exam/types'
import { getDrawerTitle } from '@pages/academic/examinations/exam/utils/exam'
import { classNames } from '@pages/academic/examinations/exam/variants'
import { EntityDrawerPage } from '@pages/academic/shared/entity-drawer-page'

import { ExamDetails } from './exam-details'
import { ExamForm } from './exam-form'

export const ExamDrawer = (props: ClassDrawerProps) => (
  <EntityDrawerPage
    {...props}
    classes={classNames}
    createLabel="Add Exam"
    Details={ExamDetails}
    Form={ExamForm}
    getTitle={getDrawerTitle}
  />
)
