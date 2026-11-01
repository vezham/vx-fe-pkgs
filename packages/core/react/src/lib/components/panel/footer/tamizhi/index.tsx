import { Suspense, lazy } from 'react'

import { VezhamTamizhi } from '@vezham/icons-react'

import type { InfoPanelDefinition } from '../../info-panel'
import { InfoPanelSheet } from '../../info-panel/sheet'

const Embed = lazy(() =>
  import('../../../../tamizhi/ui/embed').then(module => ({
    default: module.TamizhiEmbed
  }))
)
const Content = () => (
  <Suspense fallback={<p role="status">Loading Tamizhi…</p>}>
    <Embed />
  </Suspense>
)

export const tamizhiPanel: InfoPanelDefinition = {
  title: 'Tamizhi AI',
  titleIcon: <VezhamTamizhi size={20} aria-hidden="true" />,
  scrollable: false,
  content: <Content />,
  renderCompact: ({ isOpen, onClose }) =>
    isOpen ? <InfoPanelSheet onClose={onClose} panel={tamizhiPanel} /> : null
}
