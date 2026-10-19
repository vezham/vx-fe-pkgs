import type { AttendanceDrawerProps } from '@pages/academic/examinations/exam-attendance/types'
import { getDrawerTitle } from '@pages/academic/examinations/exam-attendance/utils/exam-attendance'
import { classNames } from '@pages/academic/examinations/exam-attendance/variants'
import { EntityDrawerPage } from '@pages/academic/shared/entity-drawer-page'

import { AttendanceDetails } from './attendance-details'
import { AttendanceForm } from './attendance-form'

export const AttendanceDrawer = (props: AttendanceDrawerProps) => (
  <EntityDrawerPage
    {...props}
    classes={classNames}
    createLabel="Add Exam Attendance"
    Details={AttendanceDetails}
    Form={AttendanceForm}
    getTitle={getDrawerTitle}
  />
)
