import type { ClassFormProps } from '@pages/academic/classroom/types'
import { classNames } from '@pages/academic/classroom/variants'
import { AcademicInputField } from '@pages/academic/shared/input-field'
import { AcademicStatusSwitch } from '@pages/academic/shared/status-switch'

export const ClassForm = ({
  form,
  formErrors,
  onFormChange
}: ClassFormProps) => {
  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <AcademicInputField
          classes={classNames}
          error={formErrors.roomno}
          label="Room No"
          placeholder="Enter room no"
          value={form.roomno}
          onChange={value => onFormChange('roomno', value)}
        />

        <AcademicInputField
          classes={classNames}
          error={formErrors.capacity}
          label="Capacity"
          placeholder="Enter capacity"
          value={form.capacity}
          onChange={value => onFormChange('capacity', value)}
        />
      </div>

      <AcademicStatusSwitch
        ariaLabel="Class status"
        classes={classNames}
        error={formErrors.status}
        selectedStatus="Inactive"
        status={form.status}
        onChange={status => onFormChange('status', status)}
      />
    </div>
  )
}
