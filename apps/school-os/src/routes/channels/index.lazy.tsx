import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/channels/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/channels/"!</div>
}
