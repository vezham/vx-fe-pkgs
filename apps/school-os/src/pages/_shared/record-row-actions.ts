export const createRecordRowActions = <Row extends { id: string }>(
  deleteRow: (id: string) => void,
  openDrawer: (mode: 'view' | 'edit', row: Row) => void
) => ({
  onDelete: (row: Row) => deleteRow(row.id),
  onEdit: (row: Row) => openDrawer('edit', row),
  onView: (row: Row) => openDrawer('view', row)
})
