import type { ClassDrawerProps } from '@pages/academic/examinations/exam-results/types'
import { getDrawerTitle } from '@pages/academic/examinations/exam-results/utils/exam-results'
import { classNames } from '@pages/academic/examinations/exam-results/variants'
import { EntityDrawerPage } from '@pages/academic/shared/entity-drawer-page'

import { ExamResultsDetails } from './exam-results-details'
import { ExamResultsForm } from './exam-results-form'

export const ExamResultsDrawer = (props: ClassDrawerProps) => (
  <EntityDrawerPage
    {...props}
    classes={classNames}
    createLabel="Add Exam Result"
    Details={ExamResultsDetails}
    Form={ExamResultsForm}
    getTitle={getDrawerTitle}
  />
)
