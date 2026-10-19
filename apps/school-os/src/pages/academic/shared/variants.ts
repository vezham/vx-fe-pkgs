const baseClassNames = {
  page: 'space-y-4',
  toolbar: 'flex flex-col gap-4 p-4',
  headerRow:
    'flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between',
  mutedText: 'text-muted text-sm',
  title: 'text-base font-semibold',
  toolbarActions: 'flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end',
  datePopover: 'w-[360px] p-2',
  customDatePanel: 'space-y-3',
  fullWidth: 'w-full',
  dateOptionLabel: 'flex w-full items-center justify-between',
  rowsControls: 'flex items-center gap-2',
  tableContent: 'min-w-[960px]',
  selectionColumn: 'w-12',
  tableRow: 'hover:bg-primary/5 cursor-pointer transition-colors',
  tableRowActive: 'bg-primary/10 ring-primary/20 ring-1 ring-inset',
  rowActions: 'flex items-center gap-1',
  dangerIcon: 'text-danger',
  menuItemLabel: 'flex items-center gap-2',
  toast:
    'fixed top-10 left-1/2 z-[9999] w-[min(320px,calc(100vw-2rem))] -translate-x-1/2',
  emptyState:
    'flex min-h-[220px] w-full flex-col items-center justify-center gap-4 py-12 text-center',
  emptyIcon: 'text-muted',
  emptyText: 'text-muted text-lg font-medium',
  filterPanel: 'flex w-80 flex-col gap-4 p-4',
  filterTitle: 'text-lg font-semibold',
  filterActions: 'flex justify-end gap-2',
  drawerDialog:
    'flex h-full w-full max-w-[420px] flex-col bg-black/5 backdrop-blur-2xl',
  drawerHeader: 'sticky top-0 z-10 border-b border-[#e8edf6] py-4',
  drawerHeaderRow: 'flex w-full items-center justify-between gap-3',
  drawerTitleGroup: 'flex min-w-0 items-center gap-2',
  drawerTitle: 'truncate text-lg font-semibold text-[#111827]',
  drawerActions: 'flex shrink-0 items-center gap-2',
  drawerBody: 'flex-1 px-4 py-4',
  drawerFooter: 'sticky bottom-0 border-t border-[#e8edf6] py-4',
  drawerFormFooterActions: 'flex w-full justify-end gap-3',
  drawerViewFooterActions: 'flex w-full gap-3',
  flexOne: 'flex-1',
  form: 'space-y-6',
  formFields: 'space-y-5',
  field: 'space-y-2',
  fieldLabel: 'font-bold text-[#111827]',
  fieldError: 'text-danger text-sm',
  selectError: 'text-danger -mt-3 text-sm',
  statusRow: 'flex items-center justify-between gap-6',
  statusHelp: 'text-[#20242d]',
  details: 'space-y-8',
  detailSummary: 'space-y-6',
  detailChipRow: 'flex items-center gap-3',
  detailTagsRow: 'flex flex-wrap items-center gap-3',
  detailHeading: 'text-xl font-bold text-[#111827]',
  detailLine: 'flex gap-2 text-xl',
  detailValue: 'text-[#111827]',
  sortableHeader: 'flex items-center gap-2'
} as const

export const createAcademicVariants = <
  Overrides extends Record<string, string>
>(
  overrides: Overrides
) => {
  const classNames = { ...baseClassNames, ...overrides }

  const getTableRowClassName = (isActive: boolean) =>
    `${classNames.tableRow} ${isActive ? classNames.tableRowActive : ''}`

  return { classNames, getTableRowClassName }
}
