import type {
  AttendanceStatus,
  PersonValue
} from '@pages/reports/_shared/types'

export const staffTeacherDayStatuses: AttendanceStatus[] = [
  'Present',
  'Present',
  'Absent',
  'Present',
  'Half Day',
  'Present',
  'Present',
  'Late',
  'Present',
  'Present'
]

export const person = (name: string, avatar: string): PersonValue => ({
  name,
  avatar
})

export const staffPeople = [
  person('Hellana', 'https://randomuser.me/api/portraits/women/3.jpg'),
  person('Daniel', 'https://randomuser.me/api/portraits/men/2.jpg'),
  person('Kevin', 'https://randomuser.me/api/portraits/men/31.jpg'),
  person('Teresa', 'https://randomuser.me/api/portraits/women/1.jpg'),
  person('James', 'https://randomuser.me/api/portraits/men/34.jpg'),
  person('Johnson', 'https://randomuser.me/api/portraits/men/54.jpg'),
  person('Edward', 'https://randomuser.me/api/portraits/men/13.jpg'),
  person('Jacquelin', 'https://randomuser.me/api/portraits/women/9.jpg'),
  person('Elizabeth', 'https://randomuser.me/api/portraits/women/11.jpg'),
  person('Willie', 'https://randomuser.me/api/portraits/men/36.jpg')
]

export const teacherPeople = [
  person('Teresa', 'https://randomuser.me/api/portraits/women/1.jpg'),
  person('Daniel', 'https://randomuser.me/api/portraits/men/2.jpg'),
  person('Hellana', 'https://randomuser.me/api/portraits/women/3.jpg'),
  person('Erickson', 'https://randomuser.me/api/portraits/men/4.jpg'),
  person('Morgan', 'https://randomuser.me/api/portraits/men/5.jpg'),
  person('Aaron', 'https://randomuser.me/api/portraits/men/7.jpg'),
  person('Jacquelin', 'https://randomuser.me/api/portraits/women/9.jpg'),
  person('Raul', 'https://randomuser.me/api/portraits/men/10.jpg'),
  person('Elizabeth', 'https://randomuser.me/api/portraits/women/11.jpg'),
  person('Edward', 'https://randomuser.me/api/portraits/men/13.jpg')
]

export const studentPeople = [
  person('Janet', 'https://randomuser.me/api/portraits/women/44.jpg'),
  person('Joann', 'https://randomuser.me/api/portraits/men/32.jpg'),
  person('Kathleen', 'https://randomuser.me/api/portraits/women/68.jpg'),
  person('Gifford', 'https://randomuser.me/api/portraits/men/53.jpg'),
  person('Lisa', 'https://randomuser.me/api/portraits/women/17.jpg'),
  person('Ralph', 'https://randomuser.me/api/portraits/men/12.jpg'),
  person('Julie', 'https://randomuser.me/api/portraits/women/8.jpg'),
  person('Ryan', 'https://randomuser.me/api/portraits/men/9.jpg'),
  person('Susan', 'https://randomuser.me/api/portraits/women/28.jpg'),
  person('Richard', 'https://randomuser.me/api/portraits/men/41.jpg'),
  person('Veronica', 'https://randomuser.me/api/portraits/women/55.jpg')
]
