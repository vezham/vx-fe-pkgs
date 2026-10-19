import { CalendarDate } from '@internationalized/date'

import { Calendar, DateField, DatePicker, Label } from '@vezham/react-v3'
import type { DateValue } from '@vezham/react-v3'

import {
  endtimeOptions,
  starttimeOptions
} from '@pages/academic/examinations/exam/data'
import type { ClassFormProps } from '@pages/academic/examinations/exam/types'
import { classNames } from '@pages/academic/examinations/exam/variants'
import { AcademicInputField } from '@pages/academic/shared/input-field'
import { AcademicTimeSelects } from '@pages/academic/shared/time-fields'

export const ExamForm = ({
  form,
  formErrors,
  onFormChange
}: ClassFormProps) => {
  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <AcademicInputField
          classes={classNames}
          error={formErrors.name}
          label="Exam Name"
          placeholder="Enter class name"
          value={form.name}
          onChange={value => onFormChange('name', value)}
        />

        <DatePicker
          className="w-full"
          name="date"
          value={toCalendarDate(form.date)}
          onChange={value => onFormChange('date', value ? String(value) : '')}>
          <Label>Date</Label>

          <DateField.Group fullWidth>
            <DateField.Input>
              {segment => <DateField.Segment segment={segment} />}
            </DateField.Input>

            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>

          <DatePicker.Popover>
            <Calendar aria-label="Event date">
              <Calendar.Header>
                <Calendar.YearPickerTrigger>
                  <Calendar.YearPickerTriggerHeading />
                  <Calendar.YearPickerTriggerIndicator />
                </Calendar.YearPickerTrigger>

                <Calendar.NavButton slot="previous" />
                <Calendar.NavButton slot="next" />
              </Calendar.Header>

              <Calendar.Grid>
                <Calendar.GridHeader>
                  {day => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                </Calendar.GridHeader>

                <Calendar.GridBody>
                  {date => <Calendar.Cell date={date} />}
                </Calendar.GridBody>
              </Calendar.Grid>

              <Calendar.YearPickerGrid>
                <Calendar.YearPickerGridBody>
                  {({ year }) => <Calendar.YearPickerCell year={year} />}
                </Calendar.YearPickerGridBody>
              </Calendar.YearPickerGrid>
            </Calendar>
          </DatePicker.Popover>
        </DatePicker>
        {formErrors.date && (
          <p className={classNames.selectError}>{formErrors.date}</p>
        )}

        <AcademicTimeSelects
          form={form}
          errors={formErrors}
          classes={classNames}
          startOptions={starttimeOptions}
          endOptions={endtimeOptions}
          onChange={(field, value) => onFormChange(field, value)}
        />
      </div>
    </div>
  )
}

function toCalendarDate(value: string | null): DateValue | null {
  if (!value) {
    return null
  }

  const [year, month, day] = value.split('-').map(Number)

  if (!year || !month || !day) {
    return null
  }

  return new CalendarDate(year, month, day) as unknown as DateValue
}
