import type { ComponentProps, ReactNode } from 'react'

import { Chip } from '@vezham/react-v3'

export type DetailField<Row> = {
  label: string
  value: (row: Row) => ReactNode
}

type DetailClassNames = Record<
  | 'details'
  | 'detailSummary'
  | 'detailLine'
  | 'fieldLabel'
  | 'detailValue'
  | 'detailChipRow'
  | 'detailHeading'
  | 'detailTagsRow',
  string
>

type Props<Row> = {
  row: Row | null
  fields: DetailField<Row>[]
  classNames: DetailClassNames
  getTags: (row: Row) => (string | undefined)[]
  getStatus: (row: Row) => string
  getStatusColor: (row: Row) => ComponentProps<typeof Chip>['color']
  statusLabel?: string
}

export const EntityDetails = <Row,>({
  row,
  fields,
  classNames,
  getTags,
  getStatus,
  getStatusColor,
  statusLabel = 'Status'
}: Props<Row>) => {
  if (!row) return null

  return (
    <div className={classNames.details}>
      <div className={classNames.detailSummary}>
        {fields.map(field => (
          <div className={classNames.detailLine} key={field.label}>
            <span className={classNames.fieldLabel}>{field.label}:</span>
            <span className={classNames.detailValue}>{field.value(row)}</span>
          </div>
        ))}

        <div className={classNames.detailChipRow}>
          <span className={classNames.detailHeading}>{statusLabel}:</span>
          <Chip color={getStatusColor(row)} variant="soft">
            <span aria-hidden="true">●</span>
            <Chip.Label>{getStatus(row)}</Chip.Label>
          </Chip>
        </div>

        <div className={classNames.detailTagsRow}>
          <span className={classNames.detailHeading}>Tags:</span>
          {getTags(row).map(tag => (
            <Chip key={tag} variant="soft">
              <Chip.Label>{tag}</Chip.Label>
            </Chip>
          ))}
        </div>
      </div>
    </div>
  )
}

export const createActiveEntityDetails = <Row extends { status: string }>({
  fields,
  classNames,
  getTags
}: Pick<Props<Row>, 'fields' | 'classNames' | 'getTags'>) => {
  return ({ row }: { row: Row | null }) => (
    <EntityDetails
      row={row}
      fields={fields}
      classNames={classNames}
      getTags={getTags}
      getStatus={item => item.status}
      getStatusColor={item => (item.status === 'Active' ? 'success' : 'danger')}
    />
  )
}
