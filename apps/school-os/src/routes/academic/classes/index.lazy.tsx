import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const ClassIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/academic/classes/allclasses', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/academic/classes/')({
  component: ClassIndex
})
