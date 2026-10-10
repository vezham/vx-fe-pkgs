import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createLazyFileRoute('/operations/transport/')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({ to: '/operations/transport/routes', replace: true })
  }, [navigate])
  return null
}
