import { AcademicInputField } from '@pages/academic/shared/input-field'

export const AcademicNameField = ({
  classes,
  error,
  value,
  onChange
}: {
  classes: {
    field: string
    fieldLabel: string
    fieldError: string
    formFields: string
  }
  error?: string
  value: string
  onChange: (value: string) => void
}) => (
  <div className={classes.formFields}>
    <AcademicInputField
      classes={classes}
      error={error}
      label="Name"
      placeholder="Enter name"
      value={value}
      onChange={onChange}
    />
  </div>
)
