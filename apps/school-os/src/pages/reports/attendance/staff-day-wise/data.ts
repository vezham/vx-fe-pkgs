import {
  makeAttendancePageConfig,
  reportFilterOption as option
} from '@pages/reports/_shared/config'
import type { ReportColumn, ReportRow } from '@pages/reports/_shared/types'
import {
  staffPeople,
  staffTeacherDayStatuses
} from '@pages/reports/attendance/people'

const staffDayWiseColumns: ReportColumn[] = [
  { key: 'serialNo', label: 'S.No', allowsSorting: true },
  { key: 'staffId', label: 'ID', type: 'link', allowsSorting: true },
  { key: 'person', label: 'Name', type: 'person', allowsSorting: true },
  { key: 'department', label: 'Department', allowsSorting: true },
  { key: 'role', label: 'Role', allowsSorting: true },
  {
    key: 'attendance',
    label: 'Attendance',
    type: 'status',
    allowsSorting: true
  }
]

const makeStaffDayWiseRows = (): ReportRow[] => {
  const departments = [
    'Management',
    'Finance',
    'Management',
    'Finance',
    'Management',
    'Admin',
    'Transport',
    'Library',
    'Management',
    'Management'
  ]
  const roles = [
    'Receptionist',
    'Accounts Manager',
    'Driver',
    'Librarian',
    'HR Manager',
    'Accountant',
    'Admin',
    'Admin',
    'Receptionist',
    'Technical Head'
  ]
  return staffPeople.map((staff, index) => ({
    id: `staff-day-${index}`,
    serialNo: 1,
    staffId: 8483 - index,
    person: staff,
    department: departments[index],
    role: roles[index],
    attendance: staffTeacherDayStatuses[index],
    createdAt: `2026-05-${String(13 - index).padStart(2, '0')}`
  }))
}

export const staffDayWiseConfig = makeAttendancePageConfig({
  key: 'staff-day-wise',
  title: 'Staff Day Wise List',
  ariaLabel: 'Staff day wise',
  columns: staffDayWiseColumns,
  rows: makeStaffDayWiseRows(),
  filters: [
    option('department', 'Department', [
      'Management',
      'Finance',
      'Admin',
      'Transport',
      'Library'
    ]),
    option('attendance', 'Attendance', [
      'Present',
      'Absent',
      'Late',
      'Half Day'
    ])
  ],
  initialColumn: 'staffId',
  tableMinWidth: 960
})
