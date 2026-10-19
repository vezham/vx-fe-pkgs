import { createActiveEntityDetails } from '@pages/academic/shared/entity-details'
import type { DetailField } from '@pages/academic/shared/entity-details'
import type { ClassDetailsProps } from '@pages/academic/subject/types'
import { getClassTags } from '@pages/academic/subject/utils/subject'
import { classNames } from '@pages/academic/subject/variants'

type Row = NonNullable<ClassDetailsProps['row']>

const fields: DetailField<Row>[] = [
  { label: 'Name', value: (row: Row) => row.name },
  { label: 'Code', value: (row: Row) => row.code },
  { label: 'Type', value: (row: Row) => row.type }
]

export const ClassDetails = createActiveEntityDetails<Row>({
  fields,
  classNames,
  getTags: getClassTags
})
