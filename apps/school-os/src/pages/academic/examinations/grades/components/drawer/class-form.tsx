import { Label, ListBox, Select } from '@vezham/react-v3'

import {
  gradeOptions,
  marksfromOptions,
  marksuptoOptions,
  pointOptions
} from '@pages/academic/examinations/grades/data'
import type { ClassFormProps } from '@pages/academic/examinations/grades/types'
import { classNames } from '@pages/academic/examinations/grades/variants'
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
        <div className={classNames.field}>
          <Select
            fullWidth
            aria-label="Grade"
            aria-invalid={Boolean(formErrors.grade)}
            placeholder="Select grade"
            value={form.grade || null}
            onChange={value =>
              onFormChange('grade', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Grade</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {gradeOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.grade && (
            <p className={classNames.fieldError}>{formErrors.grade}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Select
            fullWidth
            aria-label="Marks from"
            aria-invalid={Boolean(formErrors.marksfrom)}
            placeholder="Select marks from"
            value={form.marksfrom || null}
            onChange={value =>
              onFormChange('marksfrom', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Marks From</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {marksfromOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.marksfrom && (
            <p className={classNames.fieldError}>{formErrors.marksfrom}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Select
            fullWidth
            aria-label="Marks upto"
            aria-invalid={Boolean(formErrors.marksupto)}
            placeholder="Select marks upto"
            value={form.marksupto || null}
            onChange={value =>
              onFormChange('marksupto', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Marks upto</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {marksuptoOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.marksupto && (
            <p className={classNames.fieldError}>{formErrors.marksupto}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Select
            fullWidth
            aria-label="Grade points"
            aria-invalid={Boolean(formErrors.points)}
            placeholder="Select points"
            value={form.points || null}
            onChange={value =>
              onFormChange('points', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Grade Points</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {pointOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.points && (
            <p className={classNames.fieldError}>{formErrors.points}</p>
          )}
        </div>

        <AcademicInputField
          classes={classNames}
          error={formErrors.description}
          label="Description"
          placeholder="Enter description"
          value={form.description}
          onChange={value => onFormChange('description', value)}
        />
      </div>

      <AcademicStatusSwitch
        ariaLabel="Grade status"
        classes={classNames}
        error={formErrors.status}
        selectedStatus="Inactive"
        status={form.status}
        onChange={status => onFormChange('status', status)}
      />
    </div>
  )
}
