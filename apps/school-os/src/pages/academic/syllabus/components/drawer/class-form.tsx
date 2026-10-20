import { AcademicInputField } from '@pages/academic/shared/input-field'
import { AcademicSelectField } from '@pages/academic/shared/select-field'
import { classOptions, sectionOptions } from '@pages/academic/syllabus/data'
import type { ClassFormProps } from '@pages/academic/syllabus/types'
import { classNames } from '@pages/academic/syllabus/variants'

export const ClassForm = ({
  form,
  formErrors,
  onFormChange
}: ClassFormProps) => {
  return (
    <div className={classNames.form}>
      <AcademicSelectField
        ariaLabel="Class"
        error={formErrors.classes}
        errorClassName={classNames.selectError}
        label="Class"
        labelClassName={classNames.fieldLabel}
        options={classOptions}
        placeholder="Select classes"
        value={form.classes}
        onChange={value => onFormChange('classes', value)}
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

      <div className={classNames.formFields}>
        <AcademicInputField
          classes={classNames}
          error={formErrors.subject}
          label="Subject Group"
          placeholder="Enter subject"
          value={form.subject}
          onChange={value => onFormChange('subject', value)}
        />
      </div>
    </div>
  )
}
