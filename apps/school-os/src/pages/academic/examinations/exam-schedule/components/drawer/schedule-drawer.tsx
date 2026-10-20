import type { ClassDrawerProps } from '@pages/academic/examinations/exam-schedule/types'
import { getDrawerTitle } from '@pages/academic/examinations/exam-schedule/utils/exam-schedule'
import { classNames } from '@pages/academic/examinations/exam-schedule/variants'
import { EntityDrawerPage } from '@pages/academic/shared/entity-drawer-page'

import { ScheduleDetails } from './schedule-details'
import { ScheduleForm } from './schedule-form'

export const ScheduleDrawer = (props: ClassDrawerProps) => (
  <EntityDrawerPage
    {...props}
    classes={classNames}
    createLabel="Add Exam Schedule"
    Details={ScheduleDetails}
    formContent={<ScheduleForm {...props} />}
    getTitle={getDrawerTitle}
  />
)
