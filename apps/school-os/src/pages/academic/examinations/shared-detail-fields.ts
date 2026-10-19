import type { DetailField } from '@pages/academic/shared/entity-details'

export const getExamIdentityFields = <
  Row extends { name: string; english: string; spanish: string }
>(): DetailField<Row>[] => [
  { label: 'Name', value: row => row.name },
  { label: 'English', value: row => row.english },
  { label: 'Spanish', value: row => row.spanish }
]
