import type { ClassFormProps } from '@pages/academic/class-routine/types'
import { classNames } from '@pages/academic/class-routine/variants'
import { AcademicSectionSelect } from '@pages/academic/shared/section-select'
import { AcademicSelectField } from '@pages/academic/shared/select-field'
import { AcademicStatusSwitch } from '@pages/academic/shared/status-switch'
import { AcademicTimeInputs } from '@pages/academic/shared/time-fields'
import {
  classOptions,
  dayOptions,
  roomOptions,
  sectionOptions,
  teacherOptions
} from '@store/useAcademic/useClassRoutine'

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
            ariaLabel="Teacher"
            error={formErrors.teacher}
            errorClassName={classNames.fieldError}
            label="Teacher"
            labelClassName={classNames.fieldLabel}
            options={teacherOptions}
            placeholder="Select teacher"
            value={form.teacher}
            onChange={value => onFormChange('teacher', value)}
          />
        </div>

        <div className={classNames.field}>
          <AcademicSelectField
            ariaLabel="classes"
            error={formErrors.classes}
            errorClassName={classNames.fieldError}
            label="Class"
            labelClassName={classNames.fieldLabel}
            options={classOptions}
            placeholder="Select classes"
            value={form.classes}
            onChange={value => onFormChange('classes', value)}
          />
        </div>

        <AcademicSectionSelect
          classes={classNames}
          error={formErrors.section}
          options={sectionOptions}
          value={form.section}
          onChange={value => onFormChange('section', value)}
        />

        <div className={classNames.field}>
          <AcademicSelectField
            ariaLabel="day"
            error={formErrors.day}
            errorClassName={classNames.fieldError}
            label="Day"
            labelClassName={classNames.fieldLabel}
            options={dayOptions}
            placeholder="Select day"
            value={form.day}
            onChange={value => onFormChange('day', value)}
          />
        </div>

        <AcademicTimeInputs
          form={form}
          errors={formErrors}
          classes={classNames}
          onChange={(field, value) => onFormChange(field, value)}
        />

        <div className={classNames.field}>
          <AcademicSelectField
            ariaLabel="classroom"
            error={formErrors.classroom}
            errorClassName={classNames.fieldError}
            label="Class Room"
            labelClassName={classNames.fieldLabel}
            options={roomOptions}
            placeholder="Select classroom"
            value={form.classroom}
            onChange={value => onFormChange('classroom', value)}
          />
        </div>
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
