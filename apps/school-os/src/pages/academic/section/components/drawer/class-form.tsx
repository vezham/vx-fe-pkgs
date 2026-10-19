import type { ClassFormProps } from '@pages/academic/section/types'
import { classNames } from '@pages/academic/section/variants'
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
          error={formErrors.section}
          label="Section"
          placeholder="Enter section"
          value={form.section}
          onChange={value => onFormChange('section', value)}
        />
      </div>

      <AcademicStatusSwitch
        ariaLabel="Class status"
        classes={classNames}
        selectedStatus="Active"
        status={form.status}
        onChange={status => onFormChange('status', status)}
      />
    </div>
  )
}
