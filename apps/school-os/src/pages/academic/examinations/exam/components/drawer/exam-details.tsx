import type { ClassDetailsProps } from '@pages/academic/examinations/exam/types'
import { getClassTags } from '@pages/academic/examinations/exam/utils/exam'
import { classNames } from '@pages/academic/examinations/exam/variants'
import { EntityDetails } from '@pages/academic/shared/entity-details'
import type { DetailField } from '@pages/academic/shared/entity-details'

type Row = NonNullable<ClassDetailsProps['row']>

const fields: DetailField<Row>[] = [
  { label: 'Exam Name', value: (row: Row) => row.name },
  { label: 'Exam Date', value: (row: Row) => row.date },
  { label: 'Start Time', value: (row: Row) => row.starttime },
  { label: 'End Time', value: (row: Row) => row.endtime }
]

export const ExamDetails = ({ row }: ClassDetailsProps) => (
  <EntityDetails
    row={row}
    fields={fields}
    classNames={classNames}
    getTags={getClassTags}
    getStatus={(item: Row) => item.status}
    getStatusColor={(item: Row) =>
      item.status === 'Active' ? 'success' : 'danger'
    }
  />
)
