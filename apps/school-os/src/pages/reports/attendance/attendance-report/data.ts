import { studentPeople } from '@pages/reports/attendance/people'
import { makeSummaryAttendanceConfig } from '@pages/reports/attendance/summary-config'

export const attendanceReportConfig = makeSummaryAttendanceConfig({
  key: 'attendance-report',
  title: 'Attendance Report List',
  ariaLabel: 'Attendance report',
  personLabel: 'Student / Date',
  people: studentPeople.slice(0, 10)
})
