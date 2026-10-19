import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createLazyFileRoute('/operations/library/')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({ to: '/operations/library/members', replace: true })
  }, [navigate])
  return null
}
