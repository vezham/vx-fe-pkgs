import { sectionOptions, subjectOptions } from '@pages/academic/homework/data'
import type { ClassFormProps } from '@pages/academic/homework/types'
import { classNames } from '@pages/academic/homework/variants'
import { AcademicInputField } from '@pages/academic/shared/input-field'
import { AcademicSectionSelect } from '@pages/academic/shared/section-select'
import { AcademicSelectField } from '@pages/academic/shared/select-field'
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
          ariaLabel="Start time"
          classes={classNames}
          error={formErrors.classes}
          label="Class"
          value={form.classes}
          onChange={value => onFormChange('classes', value)}
        />

        <AcademicSectionSelect
          classes={classNames}
          error={formErrors.section}
          options={sectionOptions}
          value={form.section}
          onChange={value => onFormChange('section', value)}
        />

        <div className={classNames.field}>
          <AcademicSelectField
            ariaLabel="subject"
            error={formErrors.subject}
            errorClassName={classNames.fieldError}
            label="Subject"
            labelClassName={classNames.fieldLabel}
            options={subjectOptions}
            placeholder="Select subject"
            value={form.subject}
            onChange={value => onFormChange('subject', value)}
          />
        </div>

        <AcademicInputField
          ariaLabel="homework date"
          classes={classNames}
          error={formErrors.homeworkdate}
          label="Homework Date"
          value={form.homeworkdate}
          onChange={value => onFormChange('homeworkdate', value)}
        />

        <AcademicInputField
          ariaLabel="submission date"
          classes={classNames}
          error={formErrors.submissiondate}
          label="Submission Date"
          value={form.submissiondate}
          onChange={value => onFormChange('submissiondate', value)}
        />

        <AcademicInputField
          ariaLabel="attachments"
          classes={classNames}
          error={formErrors.attachments}
          label="Attachments"
          value={form.attachments}
          onChange={value => onFormChange('attachments', value)}
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
