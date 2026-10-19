export const classNames = {
  page: 'space-y-4',
  toolbar: 'flex flex-col gap-4 p-4',
  mutedText: 'text-muted text-sm',
  headerRow:
    'flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between',
  title: 'text-base font-semibold',
  toolbarActions:
    'flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end',
  datePopover: 'w-[360px] p-2',
  customDatePanel: 'space-y-3',
  dateOptionLabel: 'flex w-full items-center justify-between',
  fullWidth: 'w-full',
  rowsControls: 'flex items-center gap-2',
  controlsRight:
    'flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end',
  legend: 'flex flex-wrap items-center gap-1.5',
  tableContent: 'text-[#4d5a76]',
  paginationFooter: '',
  tableRow: 'hover:bg-primary/5 cursor-pointer transition-colors',
  tableRowActive: 'bg-primary/10 ring-primary/20 ring-1 ring-inset',
  selectionColumn: 'w-12',
  rowActions: 'flex items-center gap-1',
  dangerIcon: 'text-danger',
  menuItemLabel: 'flex items-center gap-2',
  personCell: 'flex min-w-0 items-center gap-2',
  personAvatar: 'h-8 w-8 shrink-0',
  personText: 'min-w-0',
  personName: 'block truncate',
  personDescription: 'block truncate text-xs text-[#4d5a76]',
  sortableHeader: 'flex items-center gap-1',
  emptyState:
    'flex min-h-[220px] w-full flex-col items-center justify-center gap-4 py-12 text-center',
  emptyIcon: 'text-muted',
  emptyText: 'text-muted text-lg font-medium',
  filterPanel: 'flex w-80 flex-col gap-4 p-4',
  filterTitle: 'text-lg font-semibold',
  filterActions: 'flex justify-end gap-2',
  marker: 'mx-auto block h-4 w-1.5 rounded-full',
  statusText:
    'inline-flex items-center gap-2 text-sm font-medium text-[#26324d]',
  badge:
    'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold',
  badgeDot: 'h-1 w-1 rounded-full',
  gradeDanger: 'text-[#f12c58]',
  percentBadge:
    'inline-flex min-w-8 items-center justify-center rounded-md px-1.5 py-0.5 text-xs font-semibold text-white',
  link: 'text-primary whitespace-pre-line font-medium',
  toast:
    'fixed top-10 left-1/2 z-[9999] w-[min(320px,calc(100vw-2rem))] -translate-x-1/2',
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
  form: 'space-y-5',
  field: 'space-y-2',
  fieldLabel: 'font-bold text-[#111827]',
  details: 'space-y-5',
  detailLine: 'space-y-1',
  detailLabel: 'text-sm text-muted',
  detailValue: 'text-base font-medium text-[#111827]'
} as const

export const getTableRowClassName = (isActive: boolean) => {
  return `${classNames.tableRow} ${isActive ? classNames.tableRowActive : ''}`
}
