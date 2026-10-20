import { AcademicInputField } from '@pages/academic/shared/input-field'
import { AcademicSelectField } from '@pages/academic/shared/select-field'

type TimeValues = { starttime: string; endtime: string }
type TimeErrors = { starttime?: string; endtime?: string }
type TimeClasses = {
  field: string
  fieldLabel: string
  fieldError: string
  selectError: string
}
type Props = {
  form: TimeValues
  errors: TimeErrors
  classes: TimeClasses
  onChange: (field: 'starttime' | 'endtime', value: string) => void
}

export const AcademicTimeInputs = ({
  form,
  errors,
  classes,
  onChange
}: Props) => (
  <>
    <AcademicInputField
      ariaLabel="Start time"
      classes={classes}
      error={errors.starttime}
      label="Start Time"
      type="time"
      value={form.starttime}
      onChange={value => onChange('starttime', value)}
    />
    <AcademicInputField
      ariaLabel="End time"
      classes={classes}
      error={errors.endtime}
      label="End Time"
      type="time"
      value={form.endtime}
      onChange={value => onChange('endtime', value)}
    />
  </>
)

export const AcademicTimeSelects = ({
  form,
  errors,
  classes,
  startOptions,
  endOptions,
  onChange
}: Props & {
  startOptions: readonly string[]
  endOptions: readonly string[]
}) => (
  <>
    <AcademicSelectField
      ariaLabel="Start time"
      error={errors.starttime}
      errorClassName={classes.selectError}
      label="Start Time"
      labelClassName={classes.fieldLabel}
      options={startOptions}
      placeholder="Select start time"
      value={form.starttime}
      onChange={value => onChange('starttime', value)}
    />
    <AcademicSelectField
      ariaLabel="End time"
      error={errors.endtime}
      errorClassName={classes.selectError}
      label="End Time"
      labelClassName={classes.fieldLabel}
      options={endOptions}
      placeholder="Select end time"
      value={form.endtime}
      onChange={value => onChange('endtime', value)}
    />
  </>
)
