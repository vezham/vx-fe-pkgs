import { makeOperationPageConfig } from '@pages/operations/_shared/config'
import { playersData } from '@store/useOperations/usePlayers'
import type { PlayerItem } from '@store/useOperations/usePlayers'

import type { OperationColumn } from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'playername',
    label: 'Player Name',
    type: 'person',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'sports',
    label: 'Sports',
    type: 'text',
    allowsSorting: true,
    minWidth: 180
  },
  {
    key: 'dateofjoin',
    label: 'Date of Join ',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  }
]
const rows: PlayerItem[] = playersData

export const playersConfig = makeOperationPageConfig({
  key: 'players',
  title: 'Players',
  pageTitle: 'Players',
  listTitle: 'Players',
  addLabel: 'Add Players',
  ariaLabel: 'Players',
  breadcrumb: ['Dashboard', 'Management', 'Players'],
  columns,
  rows,
  filters: [
    {
      key: 'playername',
      label: 'Player',
      values: rows.map(row => row.playername?.name)
    },
    {
      key: 'sports',
      label: 'Sports',
      values: rows.map(row => row.sports)
    }
  ],
  initialColumn: 'name',
  tableMinWidth: 980
})
