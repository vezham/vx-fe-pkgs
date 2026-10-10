import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import type { OperationColumn } from '@pages/operations/_shared/types'

import type { MemberItem } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'member',
    label: 'Member',
    type: 'person',
    allowsSorting: true,
    minWidth: 170
  },
  {
    key: 'cardNo',
    label: 'Card No',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'email',
    label: 'Email',
    type: 'text',
    allowsSorting: true,
    minWidth: 220
  },
  {
    key: 'dateOfJoin',
    label: 'Date Of Join',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'mobile',
    label: 'Mobile',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  }
]

export const membersData: MemberItem[] = [
  {
    id: 'member-0',
    createdAt: '2026-05-11',
    displayId: 'LM823748',
    member: {
      name: 'James',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/20.jpg'
    },
    cardNo: 501,
    email: 'james@example.com',
    dateOfJoin: '22 Apr 2024',
    mobile: '+1 64044 748904'
  },
  {
    id: 'member-1',
    createdAt: '2026-05-10',
    displayId: 'LM823747',
    member: {
      name: 'Garcia',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg'
    },
    cardNo: 502,
    email: 'garcia@example.com',
    dateOfJoin: '30 Apr 2024',
    mobile: '+1 14541 55665'
  },
  {
    id: 'member-2',
    createdAt: '2026-05-09',
    displayId: 'LM823746',
    member: {
      name: 'Frank',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    cardNo: 503,
    email: 'frank@example.com',
    dateOfJoin: '05 May 2024',
    mobile: '+1 78954 85461'
  },
  {
    id: 'member-3',
    createdAt: '2026-05-08',
    displayId: 'LM823745',
    member: {
      name: 'Jennie',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
    },
    cardNo: 504,
    email: 'jennie@example.com',
    dateOfJoin: '16 May 2024',
    mobile: '+1 12345 68891'
  },
  {
    id: 'member-4',
    createdAt: '2026-05-07',
    displayId: 'LM823744',
    member: {
      name: 'Paul',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/24.jpg'
    },
    cardNo: 505,
    email: 'paul@example.com',
    dateOfJoin: '28 May 2024',
    mobile: '+1 78454 78841'
  },
  {
    id: 'member-5',
    createdAt: '2026-05-06',
    displayId: 'LM823743',
    member: {
      name: 'Elaine',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
    },
    cardNo: 506,
    email: 'elaine@example.com',
    dateOfJoin: '06 Jun 2024',
    mobile: '+1 78546 97894'
  },
  {
    id: 'member-6',
    createdAt: '2026-05-05',
    displayId: 'LM823742',
    member: {
      name: 'Jackson',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/26.jpg'
    },
    cardNo: 507,
    email: 'jackson@example.com',
    dateOfJoin: '10 Jun 2024',
    mobile: '+1 97878 87854'
  },
  {
    id: 'member-7',
    createdAt: '2026-05-11',
    displayId: 'LM823741',
    member: {
      name: 'Kerry',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg'
    },
    cardNo: 508,
    email: 'kerry@example.com',
    dateOfJoin: '18 Jun 2024',
    mobile: '+1 64599 78542'
  },
  {
    id: 'member-8',
    createdAt: '2026-05-10',
    displayId: 'LM823740',
    member: {
      name: 'Roger',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg'
    },
    cardNo: 509,
    email: 'roger@example.com',
    dateOfJoin: '20 Jul 2024',
    mobile: '+1 45781 45145'
  },
  {
    id: 'member-9',
    createdAt: '2026-05-09',
    displayId: 'LM823739',
    member: {
      name: 'Denise',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
    },
    cardNo: 510,
    email: 'denise@example.com',
    dateOfJoin: '26 Jul 2024',
    mobile: '+1 45112 48879'
  }
]

export const libraryMembersConfig = makeOperationPageConfig({
  key: 'members',
  title: 'Library Members',
  pageTitle: 'Library Members',
  listTitle: 'Library Members List',
  addLabel: 'Add Member',
  ariaLabel: 'Library Members',
  breadcrumb: ['Dashboard', 'Management', 'Library Members'],
  columns,
  rows: membersData,
  filters: [
    {
      key: 'member',
      label: 'Member',
      values: membersData.map(row => row.member?.name)
    },
    {
      key: 'cardno',
      label: 'Card No',
      values: membersData.map(row => String(row.cardNo))
    },
    {
      key: 'morefilters',
      label: 'More Filters',
      values: ['Members', 'Card No', 'Email', 'Mobile', 'Date of Join']
    }
  ],
  initialColumn: 'member',
  tableMinWidth: 1180
})
