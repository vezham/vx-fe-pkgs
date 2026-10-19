import type { ClassDetailsProps } from '@pages/academic/examinations/grades/types'
import { getClassTags } from '@pages/academic/examinations/grades/utils/grades'
import { classNames } from '@pages/academic/examinations/grades/variants'
import { createActiveEntityDetails } from '@pages/academic/shared/entity-details'
import type { DetailField } from '@pages/academic/shared/entity-details'

type Row = NonNullable<ClassDetailsProps['row']>

const fields: DetailField<Row>[] = [
  { label: 'Grade', value: (row: Row) => row.grade },
  { label: 'Percentage', value: (row: Row) => row.percentage },
  { label: 'Points', value: (row: Row) => row.points }
]

export const ClassDetails = createActiveEntityDetails<Row>({
  fields,
  classNames,
  getTags: getClassTags
})
