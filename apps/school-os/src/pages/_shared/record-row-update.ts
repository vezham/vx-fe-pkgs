import type { Dispatch, SetStateAction } from 'react'

export const commitRecordRowUpdate = <Row extends { id: string }, Form>({
  updatedRow,
  setData,
  setActiveRowId,
  setForm,
  formFromRow,
  setMode
}: {
  updatedRow: Row
  setData: Dispatch<SetStateAction<Row[]>>
  setActiveRowId: Dispatch<SetStateAction<string | null>>
  setForm: Dispatch<SetStateAction<Form>>
  formFromRow: (row: Row) => Form
  setMode: (mode: 'view') => void
}) => {
  setData(current =>
    current.map(row => (row.id === updatedRow.id ? updatedRow : row))
  )
  setActiveRowId(updatedRow.id)
  setForm(formFromRow(updatedRow))
  setMode('view')
}

export const saveExistingRecordRow = <
  Row extends { id: string },
  Form,
  Column
>({
  selectedRow,
  form,
  columns,
  toRow,
  setData,
  setActiveRowId,
  setForm,
  formFromRow,
  setMode
}: {
  selectedRow: Row | null
  form: Form
  columns: Column[]
  toRow: (row: Row, form: Form, columns: Column[]) => Row
  setData: Dispatch<SetStateAction<Row[]>>
  setActiveRowId: Dispatch<SetStateAction<string | null>>
  setForm: Dispatch<SetStateAction<Form>>
  formFromRow: (row: Row) => Form
  setMode: (mode: 'view') => void
}) => {
  if (!selectedRow) return null
  const updatedRow = toRow(selectedRow, form, columns)
  commitRecordRowUpdate({
    updatedRow,
    setData,
    setActiveRowId,
    setForm,
    formFromRow,
    setMode
  })
  return updatedRow
}
