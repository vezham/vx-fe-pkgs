import { roleOptions } from '@pages/academic/reasons/data'
import type { ClassFormProps } from '@pages/academic/reasons/types'
import { classNames } from '@pages/academic/reasons/variants'
import { AcademicNameStatusForm } from '@pages/academic/shared/name-status-form'
import { AcademicSelectField } from '@pages/academic/shared/select-field'

export const ClassForm = ({
  form,
  formErrors,
  onFormChange
}: ClassFormProps) => {
  return (
    <AcademicNameStatusForm
      classes={classNames}
      name={form.name}
      nameError={formErrors.name}
      status={form.status}
      statusError={formErrors.status}
      selectedStatus="Inactive"
      onNameChange={value => onFormChange('name', value)}
      onStatusChange={status => onFormChange('status', status)}>
      <AcademicSelectField
        ariaLabel="Role"
        error={formErrors.role}
        errorClassName={classNames.selectError}
        label="Role"
        labelClassName={classNames.fieldLabel}
        options={roleOptions}
        placeholder="Select role"
        value={form.role}
        onChange={value => onFormChange('role', value)}
      />
    </AcademicNameStatusForm>
  )
}
