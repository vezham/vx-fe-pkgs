import { EntityDetailsSummary } from '@pages/academic/shared/entity-details-summary'

type Row = { section: string; status: string }
type Props<T extends Row> = {
  row: T | null | undefined
  classes: Parameters<typeof EntityDetailsSummary>[0]['classes'] & {
    details: string
  }
  getTags: (row: T) => readonly string[]
}

export const EntityDetailsPanel = <T extends Row>({
  row,
  classes,
  getTags
}: Props<T>) =>
  row ? (
    <div className={classes.details}>
      <EntityDetailsSummary
        classes={classes}
        label="Section Name"
        status={row.status}
        tags={getTags(row)}
        value={row.section}
      />
    </div>
  ) : null
