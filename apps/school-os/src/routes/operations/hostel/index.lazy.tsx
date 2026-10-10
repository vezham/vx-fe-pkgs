import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createLazyFileRoute('/operations/hostel/')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({ to: '/operations/hostel/hostel-list', replace: true })
  }, [navigate])
  return null
}
