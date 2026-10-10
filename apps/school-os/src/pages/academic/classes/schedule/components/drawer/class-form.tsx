import type { ClassFormProps } from '@pages/academic/classes/schedule/types'
import { classNames } from '@pages/academic/classes/schedule/variants'
import { AcademicSelectField } from '@pages/academic/shared/select-field'
import { AcademicStatusSwitch } from '@pages/academic/shared/status-switch'
import { AcademicTimeSelects } from '@pages/academic/shared/time-fields'
import {
  endtimeOptions,
  starttimeOptions,
  typeOptions
} from '@store/useAcademic/useClassSchedule'

export const ClassForm = ({
  form,
  formErrors,
  onFormChange
}: ClassFormProps) => {
  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <div className={classNames.field}>
          <AcademicSelectField
            ariaLabel="Type"
            error={formErrors.type}
            errorClassName={classNames.fieldError}
            label="Type"
            labelClassName={classNames.fieldLabel}
            options={typeOptions}
            placeholder="Select type"
            value={form.type}
            onChange={value => onFormChange('type', value)}
          />
        </div>

        <AcademicTimeSelects
          form={form}
          errors={formErrors}
          classes={classNames}
          startOptions={starttimeOptions}
          endOptions={endtimeOptions}
          onChange={(field, value) => onFormChange(field, value)}
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
