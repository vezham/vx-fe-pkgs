import { VezhamTamizhi } from '@vezham/icons-react'
import { TamizhiEmbed } from '@vezham/tamizhi-ui'

import type { InfoPanelDefinition } from '../../info-panel'
import { InfoPanelSheet } from '../../info-panel/sheet'

const Content = () => <TamizhiEmbed />

export const tamizhiPanel: InfoPanelDefinition = {
  title: 'Tamizhi AI',
  titleIcon: <VezhamTamizhi size={20} aria-hidden="true" />,
  scrollable: false,
  content: <Content />,
  renderCompact: ({ isOpen, onClose }) =>
    isOpen ? <InfoPanelSheet onClose={onClose} panel={tamizhiPanel} /> : null
}
