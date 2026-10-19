import { Chip } from '@vezham/react-v3'

type Classes = {
  detailChipRow: string
  detailHeading: string
  detailLine: string
  detailSummary: string
  detailTagsRow: string
  detailValue: string
  fieldLabel: string
}

type Props = {
  classes: Classes
  label: string
  status: string
  tags: readonly string[]
  value: string
}

export const EntityDetailsSummary = ({
  classes,
  label,
  status,
  tags,
  value
}: Props) => (
  <div className={classes.detailSummary}>
    <div className={classes.detailLine}>
      <span className={classes.fieldLabel}>{label}:</span>
      <span className={classes.detailValue}>{value}</span>
    </div>

    <div className={classes.detailChipRow}>
      <span className={classes.detailHeading}>Status:</span>
      <Chip color={status === 'Active' ? 'success' : 'danger'} variant="soft">
        <span aria-hidden="true">●</span>
        <Chip.Label>{status}</Chip.Label>
      </Chip>
    </div>

    <div className={classes.detailTagsRow}>
      <span className={classes.detailHeading}>Tags:</span>
      {tags.map(tag => (
        <Chip key={tag} variant="soft">
          <Chip.Label>{tag}</Chip.Label>
        </Chip>
      ))}
    </div>
  </div>
)
