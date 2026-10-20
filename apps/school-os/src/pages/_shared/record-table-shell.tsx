import type { ComponentProps, ReactNode } from 'react'

import { Table } from '@vezham/react-v3'

import {
  RecordTableBody,
  type RecordTableBodyProps
} from '@pages/_shared/record-table-body'
import {
  RecordTablePagination,
  type RecordTablePaginationProps
} from '@pages/_shared/record-table-pagination'

export const RecordTableShell = <
  Row extends { id: string },
  Column extends { key: string }
>({
  contentProps,
  header,
  bodyProps,
  paginationProps
}: {
  contentProps: ComponentProps<typeof Table.Content>
  header: ReactNode
  bodyProps: RecordTableBodyProps<Row, Column>
  paginationProps: RecordTablePaginationProps
}) => (
  <Table>
    <Table.ScrollContainer>
      <Table.Content {...contentProps}>
        {header}
        <RecordTableBody {...bodyProps} />
      </Table.Content>
    </Table.ScrollContainer>
    <RecordTablePagination {...paginationProps} />
  </Table>
)
