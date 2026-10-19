import {
  AddCircle as AddCircleIcon,
  TrashBinTrash as TrashBinTrashIcon
} from '@vezham/icons-react'
import { Button, Input, Label } from '@vezham/react-v3'

import {
  classOptions,
  durationOptions,
  emptyForm,
  examOptions,
  examdateOptions,
  roomOptions,
  sectionOptions,
  statusOptions,
  subjectOptions
} from '@pages/academic/examinations/exam-schedule/data'
import type {
  ClassFormProps,
  ClassStatus,
  ExamScheduleItem
} from '@pages/academic/examinations/exam-schedule/types'
import { classNames } from '@pages/academic/examinations/exam-schedule/variants'
import { AcademicSelectField } from '@pages/academic/shared/select-field'
import { AcademicTimeInputs } from '@pages/academic/shared/time-fields'

export const ScheduleForm = ({
  form,
  formErrors,
  onFormChange
}: ClassFormProps) => {
  const scheduleRows = form.scheduleRows.length
    ? form.scheduleRows
    : emptyForm.scheduleRows

  const updateStatus = (value: string | number | null) => {
    const nextStatus =
      value && statusOptions.includes(value as ClassStatus)
        ? (value as ClassStatus)
        : 'Active'

    onFormChange('status', nextStatus)
  }

  const updateScheduleRow = (
    rowId: string,
    field: keyof (typeof scheduleRows)[number],
    value: string
  ) => {
    onFormChange(
      'scheduleRows',
      scheduleRows.map(scheduleRow =>
        scheduleRow.id === rowId
          ? { ...scheduleRow, [field]: value }
          : scheduleRow
      )
    )
  }

  const addScheduleRow = () => {
    onFormChange('scheduleRows', [
      ...scheduleRows,
      {
        id: `schedule-row-${Date.now()}`,
        date: '',
        subject: '',
        classroom: '',
        maximum: '',
        minimum: ''
      }
    ])
  }

  const deleteScheduleRow = (rowId: string) => {
    if (scheduleRows.length === 1) {
      return
    }

    onFormChange(
      'scheduleRows',
      scheduleRows.filter(scheduleRow => scheduleRow.id !== rowId)
    )
  }

  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <div className={classNames.scheduleTopGrid}>
          <AcademicSelectField
            ariaLabel="Class"
            error={formErrors.classes}
            errorClassName={classNames.fieldError}
            label="Class"
            labelClassName={classNames.fieldLabel}
            options={classOptions}
            placeholder="Select class"
            value={form.classes}
            onChange={value => onFormChange('classes', value)}
          />

          <AcademicSelectField
            ariaLabel="Section"
            error={formErrors.section}
            errorClassName={classNames.fieldError}
            label="Section"
            labelClassName={classNames.fieldLabel}
            options={sectionOptions}
            placeholder="Select section"
            value={form.section}
            onChange={value => onFormChange('section', value)}
          />

          <AcademicSelectField
            ariaLabel="Exam name"
            error={formErrors.examName}
            errorClassName={classNames.fieldError}
            label="Exam Name"
            labelClassName={classNames.fieldLabel}
            options={examOptions}
            placeholder="Select exam name"
            value={form.examName}
            onChange={value => onFormChange('examName', value)}
          />

          <AcademicTimeInputs
            form={form}
            errors={formErrors}
            classes={classNames}
            onChange={(field, value) => onFormChange(field, value)}
          />

          <AcademicSelectField
            ariaLabel="Duration"
            error={formErrors.duration}
            errorClassName={classNames.fieldError}
            label="Duration(min)"
            labelClassName={classNames.fieldLabel}
            options={durationOptions}
            placeholder="Select duration"
            value={form.duration}
            onChange={value => onFormChange('duration', value)}
          />
        </div>

        <ScheduleRows
          rows={scheduleRows}
          onDelete={deleteScheduleRow}
          onUpdate={updateScheduleRow}
        />

        {formErrors.scheduleRows && (
          <p className={classNames.fieldError}>{formErrors.scheduleRows}</p>
        )}

        <div>
          <Button onPress={addScheduleRow}>
            <AddCircleIcon size={16} aria-hidden="true" />
            Add New
          </Button>
        </div>
      </div>

      <div className={classNames.statusRow}>
        <AcademicSelectField
          ariaLabel="Status"
          error={formErrors.status}
          label="Status"
          labelClassName={classNames.fieldLabel}
          options={statusOptions}
          placeholder="Select status"
          value={form.status}
          showError={false}
          onChange={updateStatus}
        />
      </div>
      {formErrors.status && (
        <p className={classNames.selectError}>{formErrors.status}</p>
      )}
    </div>
  )
}

const ScheduleRows = ({
  rows,
  onDelete,
  onUpdate
}: {
  rows: ExamScheduleItem[]
  onDelete: (rowId: string) => void
  onUpdate: (
    rowId: string,
    field: keyof ExamScheduleItem,
    value: string
  ) => void
}) => {
  const scheduleRows = rows
  const deleteScheduleRow = onDelete
  const updateScheduleRow = onUpdate

  return (
    <div className={classNames.scheduleRows}>
      {scheduleRows.map((scheduleRow, index) => (
        <div key={scheduleRow.id} className={classNames.scheduleRow}>
          <AcademicSelectField
            ariaLabel={`Exam date ${index + 1}`}
            label="Exam Date"
            labelClassName={classNames.fieldLabel}
            options={examdateOptions}
            placeholder="Select"
            value={scheduleRow.date}
            onChange={value => updateScheduleRow(scheduleRow.id, 'date', value)}
          />

          <AcademicSelectField
            ariaLabel={`Subject ${index + 1}`}
            label="Subject"
            labelClassName={classNames.fieldLabel}
            options={subjectOptions}
            placeholder="Select"
            value={scheduleRow.subject}
            onChange={value =>
              updateScheduleRow(scheduleRow.id, 'subject', value)
            }
          />

          <AcademicSelectField
            ariaLabel={`Room number ${index + 1}`}
            label="Room No"
            labelClassName={classNames.fieldLabel}
            options={roomOptions}
            placeholder="Select"
            value={scheduleRow.classroom}
            onChange={value =>
              updateScheduleRow(scheduleRow.id, 'classroom', value)
            }
          />

          <div className={classNames.field}>
            <Label className={classNames.fieldLabel}>Max Marks</Label>
            <Input
              fullWidth
              aria-label={`Max marks ${index + 1}`}
              placeholder="Select"
              value={scheduleRow.maximum}
              onChange={event =>
                updateScheduleRow(scheduleRow.id, 'maximum', event.target.value)
              }
            />
          </div>

          <div className={classNames.field}>
            <Label className={classNames.fieldLabel}>Min Marks</Label>
            <Input
              fullWidth
              aria-label={`Min marks ${index + 1}`}
              placeholder="Select"
              value={scheduleRow.minimum}
              onChange={event =>
                updateScheduleRow(scheduleRow.id, 'minimum', event.target.value)
              }
            />
          </div>

          <Button
            isIconOnly
            aria-label={`Delete schedule row ${index + 1}`}
            className={classNames.scheduleDeleteButton}
            isDisabled={scheduleRows.length === 1}
            variant="secondary"
            onPress={() => deleteScheduleRow(scheduleRow.id)}>
            <TrashBinTrashIcon size={18} aria-hidden="true" />
          </Button>
        </div>
      ))}
    </div>
  )
}
