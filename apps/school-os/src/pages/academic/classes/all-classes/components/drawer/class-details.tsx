import type { ClassDetailsProps } from '@pages/academic/classes/all-classes/types'
import { getClassTags } from '@pages/academic/classes/all-classes/utils/classes'
import { classNames } from '@pages/academic/classes/all-classes/variants'
import { createActiveEntityDetails } from '@pages/academic/shared/entity-details'
import type { DetailField } from '@pages/academic/shared/entity-details'

type Row = NonNullable<ClassDetailsProps['row']>

const fields: DetailField<Row>[] = [
  { label: 'Class', value: (row: Row) => row.className },
  { label: 'Section', value: (row: Row) => row.section },
  { label: 'Students', value: (row: Row) => String(row.students) },
  { label: 'Subjects', value: (row: Row) => String(row.subjects) }
]

export const ClassDetails = createActiveEntityDetails<Row>({
  fields,
  classNames,
  getTags: getClassTags
})
