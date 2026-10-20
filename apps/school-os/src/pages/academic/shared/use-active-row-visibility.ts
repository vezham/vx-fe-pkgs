import { type Dispatch, type SetStateAction } from 'react'

import { useRowVisibility } from '@pages/_shared/use-row-visibility'

type Options<Row extends { id: string }> = {
  activeRowId: string | null
  currentPage: number
  pageSize: number
  rows: Row[]
  setPage: Dispatch<SetStateAction<number>>
  rowAttribute?: string
}

export const useActiveRowVisibility = <Row extends { id: string }>({
  activeRowId,
  currentPage,
  pageSize,
  rows,
  setPage,
  rowAttribute = 'data-class-row-id'
}: Options<Row>) => {
  useRowVisibility({
    activeRowId,
    currentPage,
    pageSize,
    rows,
    setPage,
    rowAttribute
  })
}
