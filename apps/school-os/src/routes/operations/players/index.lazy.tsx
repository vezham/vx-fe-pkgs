import { createLazyFileRoute } from '@tanstack/react-router'

import PlayersOperationPage from '@pages/operations/players'

export const Route = createLazyFileRoute('/operations/players/')({
  component: PlayersOperationPage
})
