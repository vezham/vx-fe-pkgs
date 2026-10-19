import type { AttendanceDetailsProps } from '@pages/academic/examinations/exam-attendance/types'
import {
  getAttendanceChipColor,
  getAttendanceTags
} from '@pages/academic/examinations/exam-attendance/utils/exam-attendance'
import { classNames } from '@pages/academic/examinations/exam-attendance/variants'
import { getExamIdentityFields } from '@pages/academic/examinations/shared-detail-fields'
import { EntityDetails } from '@pages/academic/shared/entity-details'
import type { DetailField } from '@pages/academic/shared/entity-details'

type Row = NonNullable<AttendanceDetailsProps['row']>

const fields: DetailField<Row>[] = [
  ...getExamIdentityFields<Row>(),
  { label: 'Physics', value: (row: Row) => row.physics },
  { label: 'Chemistry', value: (row: Row) => row.chemistry },
  { label: 'Maths', value: (row: Row) => row.maths },
  { label: 'Computer', value: (row: Row) => row.computer },
  { label: 'Env Science', value: (row: Row) => row.envscience }
]

export const AttendanceDetails = ({ row }: AttendanceDetailsProps) => (
  <EntityDetails
    row={row}
    fields={fields}
    classNames={classNames}
    getTags={getAttendanceTags}
    getStatus={(item: Row) => item.status}
    getStatusColor={(item: Row) => getAttendanceChipColor(item.status)}
  />
)
