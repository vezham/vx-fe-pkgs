import { Inbox as InboxIcon } from '@vezham/icons-react'

type EmptyStateClasses = {
  emptyState: string
  emptyIcon: string
  emptyText: string
}

export const AcademicTableEmptyState = ({
  classes,
  message = 'No results found'
}: {
  classes: EmptyStateClasses
  message?: string
}) => (
  <div className={classes.emptyState}>
    <InboxIcon className={classes.emptyIcon} size={42} aria-hidden="true" />
    <p className={classes.emptyText}>{message}</p>
  </div>
)
