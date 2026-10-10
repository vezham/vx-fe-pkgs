import { Input, Label } from '@vezham/react-v3'

export const AcademicInputField = ({
  ariaLabel,
  classes,
  error,
  label,
  min,
  placeholder,
  type,
  value,
  onChange
}: {
  ariaLabel?: string
  classes: { field: string; fieldLabel: string; fieldError: string }
  error?: string
  label: string
  min?: number
  placeholder?: string
  type?: 'number' | 'text' | 'time'
  value: string
  onChange: (value: string) => void
}) => (
  <div className={classes.field}>
    <Label className={classes.fieldLabel}>{label}</Label>
    <Input
      fullWidth
      aria-label={ariaLabel}
      aria-invalid={Boolean(error)}
      min={min}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={event => onChange(event.target.value)}
    />
    {error && <p className={classes.fieldError}>{error}</p>}
  </div>
)
