import type { ClassFormProps } from '@pages/academic/classes/all-classes/types'
import { classNames } from '@pages/academic/classes/all-classes/variants'
import { AcademicInputField } from '@pages/academic/shared/input-field'
import { AcademicSelectField } from '@pages/academic/shared/select-field'
import { AcademicStatusSwitch } from '@pages/academic/shared/status-switch'
import { sectionOptions } from '@store/useAcademic/useAllClasses'

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
          error={formErrors.className}
          label="Class Name"
          placeholder="Enter class name"
          value={form.className}
          onChange={value => onFormChange('className', value)}
        />

        <AcademicSelectField
          ariaLabel="Section"
          error={formErrors.section}
          errorClassName={classNames.selectError}
          label="Section"
          labelClassName={classNames.fieldLabel}
          options={sectionOptions}
          placeholder="Select section"
          value={form.section}
          onChange={value => onFormChange('section', value)}
        />

        <AcademicInputField
          classes={classNames}
          error={formErrors.students}
          label="No of Students"
          min={0}
          placeholder="Enter students"
          type="number"
          value={form.students}
          onChange={value => onFormChange('students', value)}
        />

        <AcademicInputField
          classes={classNames}
          error={formErrors.subjects}
          label="No of Subjects"
          min={0}
          placeholder="Enter subjects"
          type="number"
          value={form.subjects}
          onChange={value => onFormChange('subjects', value)}
        />
      </div>

      <AcademicStatusSwitch
        ariaLabel="Class status"
        classes={classNames}
        selectedStatus="Inactive"
        status={form.status}
        onChange={status => onFormChange('status', status)}
      />
    </div>
  )
}
