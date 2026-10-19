import { Switch } from '@vezham/react-v3'

type StatusSwitchClasses = {
  fieldLabel: string
  selectError: string
  statusHelp: string
  statusRow: string
}

type Props = {
  ariaLabel: string
  classes: StatusSwitchClasses
  error?: string
  selectedStatus: 'Active' | 'Inactive'
  status: 'Active' | 'Inactive'
  onChange: (status: 'Active' | 'Inactive') => void
}

export const AcademicStatusSwitch = ({
  ariaLabel,
  classes,
  error,
  selectedStatus,
  status,
  onChange
}: Props) => {
  const unselectedStatus = selectedStatus === 'Active' ? 'Inactive' : 'Active'

  return (
    <>
      <div className={classes.statusRow}>
        <div>
          <div className={classes.fieldLabel}>Status</div>
          <div className={classes.statusHelp}>Change the Status by toggle</div>
        </div>
        <Switch
          aria-label={ariaLabel}
          isSelected={status === selectedStatus}
          onChange={isSelected =>
            onChange(isSelected ? selectedStatus : unselectedStatus)
          }>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch>
      </div>
      {error && <p className={classes.selectError}>{error}</p>}
    </>
  )
}
