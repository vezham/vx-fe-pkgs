import { teacherPeople } from '@pages/reports/attendance/people'
import { makeSummaryAttendanceConfig } from '@pages/reports/attendance/summary-config'

export const teacherReportConfig = makeSummaryAttendanceConfig({
  key: 'teacher-report',
  title: 'Teacher Report List',
  ariaLabel: 'Teacher report',
  personLabel: 'Teacher / Date',
  people: teacherPeople
})
