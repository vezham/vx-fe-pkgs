import type { ClassDetailsProps } from '@pages/academic/examinations/exam-schedule/types'
import { getScheduleTags } from '@pages/academic/examinations/exam-schedule/utils/exam-schedule'
import { classNames } from '@pages/academic/examinations/exam-schedule/variants'
import { EntityDetails } from '@pages/academic/shared/entity-details'
import type { DetailField } from '@pages/academic/shared/entity-details'

type Row = NonNullable<ClassDetailsProps['row']>

const fields: DetailField<Row>[] = [
  { label: 'Class', value: (row: Row) => row.classes },
  { label: 'Section', value: (row: Row) => row.section },
  { label: 'Exam Name', value: (row: Row) => row.examName },
  { label: 'Exam Date', value: (row: Row) => row.date },
  { label: 'Subject', value: (row: Row) => row.subject },
  { label: 'Start Time', value: (row: Row) => row.starttime },
  { label: 'End Time', value: (row: Row) => row.endtime },
  { label: 'Duration', value: (row: Row) => row.duration },
  { label: 'Room No', value: (row: Row) => row.classroom },
  { label: 'Max Marks', value: (row: Row) => row.maximum },
  { label: 'Min Marks', value: (row: Row) => row.minimum }
]

export const ScheduleDetails = ({ row }: ClassDetailsProps) => (
  <EntityDetails
    row={row}
    fields={fields}
    classNames={classNames}
    getTags={getScheduleTags}
    getStatus={(item: Row) => item.status}
    getStatusColor={(item: Row) =>
      item.status === 'Active' ? 'success' : 'danger'
    }
  />
)
