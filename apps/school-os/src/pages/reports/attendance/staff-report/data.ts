import { staffPeople } from '@pages/reports/attendance/people'
import { makeSummaryAttendanceConfig } from '@pages/reports/attendance/summary-config'

export const staffReportConfig = makeSummaryAttendanceConfig({
  key: 'staff-report',
  title: 'Staff Report List',
  ariaLabel: 'Staff report',
  personLabel: 'Staff / Date',
  people: staffPeople
})
