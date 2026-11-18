import { createFileRoute } from '@tanstack/react-router'

import {
  LayoutExample,
  assertLayoutExample
} from '@components/docs/layout-example'

const RouteComponent = () => <LayoutExample name={Route.useParams().name} />

export const Route = createFileRoute('/examples/$name/$')({
  beforeLoad: ({ params }) => assertLayoutExample(params.name),
  head: () => ({
    meta: [
      { title: 'Notebook layout example' },
      { name: 'robots', content: 'noindex' }
    ]
  }),
  component: RouteComponent
})
