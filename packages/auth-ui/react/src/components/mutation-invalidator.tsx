import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { setupMutationInvalidation } from '@vezham/auth-ui-core'

export const MutationInvalidator = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    return setupMutationInvalidation(queryClient)
  }, [queryClient])

  return null
}
