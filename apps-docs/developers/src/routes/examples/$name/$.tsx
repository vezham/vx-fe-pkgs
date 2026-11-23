import { createFileRoute } from '@tanstack/react-router'

import {
  IsolatedExample,
  assertIsolatedExample
} from '@components/docs/isolated-example'
import { isolatedDemos } from '@src/demos/react/isolated'

const RouteComponent = () => <IsolatedExample name={Route.useParams().name} />

export const Route = createFileRoute('/examples/$name/$')({
  beforeLoad: ({ params }) => assertIsolatedExample(params.name),
  head: ({ params }) => ({
    meta: [
      { title: isolatedDemos[params.name]?.title ?? 'Component example' },
      { name: 'robots', content: 'noindex' }
    ]
  }),
  component: RouteComponent
})
