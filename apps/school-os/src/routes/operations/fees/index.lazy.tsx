import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createLazyFileRoute('/operations/fees/')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({ to: '/operations/fees/fees-group', replace: true })
  }, [navigate])
  return null
}
