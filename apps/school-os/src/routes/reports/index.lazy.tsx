import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createLazyFileRoute('/reports/')({
  component: ReportsIndex
})

function ReportsIndex() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/reports/attendance', replace: true })
  }, [navigate])

  return null
}
