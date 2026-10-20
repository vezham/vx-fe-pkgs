import {
  makeAttendancePageConfig,
  reportFilterOption as option
} from '@pages/reports/_shared/config'
import type { ReportRow } from '@pages/reports/_shared/types'

const makeDailyAttendanceRows = (): ReportRow[] => {
  return [
    ['III', 'A', 69, 2, '98%', '2%'],
    ['IV', 'A', 45, 7, '78%', '22%'],
    ['II', 'B', 69, 8, '89%', '11%'],
    ['I', 'C', 54, 7, '99%', '1%'],
    ['II', 'A', 65, 1, '98%', '2%'],
    ['III', 'B', 78, '.2', '72%', '28%'],
    ['V', 'C', 65, 0, '100%', '0%'],
    ['VI', 'A', 45, 2, '99%', '11%'],
    ['VIII', 'B', 47, 2, '98%', '2%'],
    ['VII', 'C', 45, 7, '89%', '11%'],
    ['IX', 'A', 45, 1, '98%', '2%']
  ].map(
    (
      [
        className,
        section,
        totalPresent,
        totalAbsent,
        presentPercent,
        absentPercent
      ],
      index
    ) => ({
      id: `daily-${index}`,
      className,
      section,
      totalPresent,
      totalAbsent,
      presentPercent,
      absentPercent,
      createdAt: `2026-05-${String(13 - index).padStart(2, '0')}`
    })
  )
}

export const dailyAttendanceConfig = makeAttendancePageConfig({
  key: 'daily-attendance',
  title: 'Daily Attendance List',
  ariaLabel: 'Daily attendance',
  columns: [
    { key: 'className', label: 'Class', allowsSorting: true },
    { key: 'section', label: 'Section', allowsSorting: true },
    { key: 'totalPresent', label: 'Total Present', allowsSorting: true },
    { key: 'totalAbsent', label: 'Total Absent', allowsSorting: true },
    { key: 'presentPercent', label: 'Present %', allowsSorting: true },
    { key: 'absentPercent', label: 'Absent %', allowsSorting: true }
  ],
  rows: makeDailyAttendanceRows(),
  filters: [
    option('className', 'Class', [
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX'
    ]),
    option('section', 'Section', ['A', 'B', 'C'])
  ],
  initialColumn: 'className',
  tableMinWidth: 900
})
