import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createLazyFileRoute('/reports/attendance/')({
  component: AttendanceReportsIndex
})

function AttendanceReportsIndex() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/reports/attendance/attendance-report', replace: true })
  }, [navigate])

  return null
}
