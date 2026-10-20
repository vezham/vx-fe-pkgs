import type { ClassDetailsProps } from '@pages/academic/homework/types'
import { getClassTags } from '@pages/academic/homework/utils/homework'
import { classNames } from '@pages/academic/homework/variants'
import { createActiveEntityDetails } from '@pages/academic/shared/entity-details'
import type { DetailField } from '@pages/academic/shared/entity-details'

type Row = NonNullable<ClassDetailsProps['row']>

const fields: DetailField<Row>[] = [
  { label: 'Class', value: (row: Row) => row.classes },
  { label: 'Section', value: (row: Row) => row.section },
  { label: 'Subject', value: (row: Row) => row.subject },
  { label: 'Homework Date', value: (row: Row) => row.homeworkdate },
  { label: 'Submission Date', value: (row: Row) => row.submissiondate },
  { label: 'Attachments', value: (row: Row) => row.attachments ?? '-' }
]

export const ClassDetails = createActiveEntityDetails<Row>({
  fields,
  classNames,
  getTags: getClassTags
})
