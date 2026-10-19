import { AcademicNameStatusForm } from '@pages/academic/shared/name-status-form'
import { AcademicSelectField } from '@pages/academic/shared/select-field'
import { codeOptions, typeOptions } from '@pages/academic/subject/data'
import type { ClassFormProps } from '@pages/academic/subject/types'
import { classNames } from '@pages/academic/subject/variants'

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
      selectedStatus="Active"
      onNameChange={value => onFormChange('name', value)}
      onStatusChange={status => onFormChange('status', status)}>
      <AcademicSelectField
        ariaLabel="Code"
        error={formErrors.code}
        errorClassName={classNames.selectError}
        label="Code"
        labelClassName={classNames.fieldLabel}
        options={codeOptions}
        placeholder="Select code"
        value={form.code}
        onChange={value => onFormChange('code', value)}
      />

      <AcademicSelectField
        ariaLabel="Type"
        error={formErrors.type}
        errorClassName={classNames.selectError}
        label="Type"
        labelClassName={classNames.fieldLabel}
        options={typeOptions}
        placeholder="Select type"
        value={form.type}
        onChange={value => onFormChange('type', value)}
      />
    </AcademicNameStatusForm>
  )
}
