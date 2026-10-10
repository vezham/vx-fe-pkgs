import type { ClassDetailsProps } from '@pages/academic/examinations/exam-results/types'
import { getClassTags } from '@pages/academic/examinations/exam-results/utils/exam-results'
import { classNames } from '@pages/academic/examinations/exam-results/variants'
import { getExamIdentityFields } from '@pages/academic/examinations/shared-detail-fields'
import { EntityDetails } from '@pages/academic/shared/entity-details'
import type { DetailField } from '@pages/academic/shared/entity-details'

type Row = NonNullable<ClassDetailsProps['row']>

const fields: DetailField<Row>[] = [
  ...getExamIdentityFields<Row>(),
  { label: 'Maths', value: (row: Row) => row.maths },
  { label: 'Computer', value: (row: Row) => row.computer },
  { label: 'Env Science', value: (row: Row) => row.envscience },
  { label: 'Physics', value: (row: Row) => row.physics },
  { label: 'Chemistry', value: (row: Row) => row.chemistry },
  { label: 'total', value: (row: Row) => row.total },
  { label: 'Percent', value: (row: Row) => row.percent },
  { label: 'Grade', value: (row: Row) => row.grade }
]

export const ExamResultsDetails = ({ row }: ClassDetailsProps) => (
  <EntityDetails
    row={row}
    fields={fields}
    classNames={classNames}
    getTags={getClassTags}
    getStatus={(item: Row) => item.result}
    getStatusColor={(item: Row) =>
      item.result === 'Pass' ? 'success' : 'danger'
    }
    statusLabel="Result"
  />
)
