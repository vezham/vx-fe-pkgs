import {
  makeAttendancePageConfig,
  reportFilterOption as option
} from '@pages/reports/_shared/config'
import type {
  AttendanceStatus,
  PersonValue,
  ReportColumn,
  ReportRow
} from '@pages/reports/_shared/types'

const dayColumns = Array.from({ length: 31 }, (_, index) => {
  const day = String(index + 1).padStart(2, '0')
  const weekDay = ['M', 'T', 'W', 'T', 'F', 'S', 'S'][index % 7]

  return {
    key: `day${day}`,
    label: `${day}\n${weekDay}`,
    type: 'marker',
    minWidth: 38
  } satisfies ReportColumn
})

const makeSummaryColumns = (personLabel: string): ReportColumn[] => [
  { key: 'person', label: personLabel, type: 'person', minWidth: 140 },
  { key: 'percent', label: '%', type: 'percent', allowsSorting: true },
  { key: 'present', label: 'P', allowsSorting: true },
  { key: 'late', label: 'L', allowsSorting: true },
  { key: 'absent', label: 'A', allowsSorting: true },
  { key: 'halfday', label: 'H', allowsSorting: true },
  { key: 'holiday', label: 'F', allowsSorting: true },
  ...dayColumns
]

const makeSummaryRows = (people: PersonValue[]): ReportRow[] => {
  const percents = [100, 87, 95, 94, 45, 100, 95, 99, 98, 32]
  const totals = [
    [24, 0, 0, 6, 0],
    [22, 1, 1, 6, 1],
    [23, 1, 2, 6, 1],
    [23, 1, 3, 6, 1],
    [16, 2, 1, 6, 1],
    [24, 2, 1, 6, 0],
    [21, 2, 1, 6, 2],
    [22, 0, 4, 6, 1],
    [23, 0, 2, 6, 1],
    [20, 3, 1, 6, 4]
  ]
  const markers: AttendanceStatus[] = [
    'Present',
    'Present',
    'Present',
    'Absent',
    'Present',
    'Holiday',
    'Holiday',
    'Present',
    'Present',
    'Present',
    'Present',
    'Present',
    'Late',
    'Late',
    'Holiday',
    'Holiday',
    'Present',
    'Present',
    'Holiday',
    'Present',
    'Present',
    'Present',
    'Present',
    'Absent',
    'Present',
    'Late',
    'Holiday',
    'Present',
    'Present',
    'Present'
  ]

  return people.map((personValue, index) => {
    const [present, late, absent, halfday, holiday] = totals[index]
    const row: ReportRow = {
      id: `summary-${personValue.name}-${index}`,
      person: personValue,
      percent: percents[index],
      present,
      late,
      absent,
      halfday,
      holiday,
      createdAt: `2026-05-${String(13 - index).padStart(2, '0')}`
    }

    dayColumns.forEach((column, dayIndex) => {
      row[column.key] =
        index === 0
          ? markers[dayIndex % markers.length] === 'Absent'
            ? 'Present'
            : markers[dayIndex % markers.length]
          : markers[(dayIndex + index) % markers.length]
    })

    return row
  })
}

export const makeSummaryAttendanceConfig = (options: {
  key: string
  title: string
  ariaLabel: string
  personLabel: string
  people: PersonValue[]
}) =>
  makeAttendancePageConfig({
    key: options.key,
    title: options.title,
    ariaLabel: options.ariaLabel,
    columns: makeSummaryColumns(options.personLabel),
    rows: makeSummaryRows(options.people),
    filters: [
      option('attendance', 'Attendance', [
        'Present',
        'Absent',
        'Late',
        'Late',
        'Halfday',
        'Holiday'
      ])
    ],
    initialColumn: 'person',
    tableMinWidth: 1680,
    showStatusLegend: true
  })
