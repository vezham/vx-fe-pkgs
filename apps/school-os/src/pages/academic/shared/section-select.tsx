import { AcademicSelectField } from '@pages/academic/shared/select-field'

export const AcademicSectionSelect = ({
  error,
  options,
  value,
  classes,
  onChange
}: {
  error?: string
  options: readonly string[]
  value: string
  classes: { field: string; fieldError: string; fieldLabel: string }
  onChange: (value: string) => void
}) => (
  <div className={classes.field}>
    <AcademicSelectField
      ariaLabel="section"
      error={error}
      errorClassName={classes.fieldError}
      label="Section"
      labelClassName={classes.fieldLabel}
      options={options}
      placeholder="Select section"
      value={value}
      onChange={onChange}
    />
  </div>
)
