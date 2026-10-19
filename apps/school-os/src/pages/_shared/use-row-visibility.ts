import { useEffect } from 'react'

export const useRowVisibility = <Row extends { id: string }>({
  activeRowId,
  currentPage,
  pageSize,
  rows,
  setPage,
  rowAttribute
}: {
  activeRowId: string | null
  currentPage: number
  pageSize: number
  rows: Row[]
  setPage: (page: number) => void
  rowAttribute: string
}) => {
  useEffect(() => {
    if (!activeRowId) return
    const rowIndex = rows.findIndex(row => row.id === activeRowId)
    if (rowIndex < 0) return
    const nextPage = Math.floor(rowIndex / pageSize) + 1
    window.requestAnimationFrame(() => {
      if (nextPage !== currentPage) {
        setPage(nextPage)
        return
      }
      document
        .querySelector(`[${rowAttribute}="${activeRowId}"]`)
        ?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    })
  }, [activeRowId, currentPage, pageSize, rowAttribute, rows, setPage])
}
