import {
  matchMutation,
  matchQuery,
  useQueryClient
} from '@tanstack/react-query'
import { useEffect } from 'react'

import {
  authMutationKeys,
  authQueryKeys,
  getAuthErrorCode,
  getAuthErrorMessage,
  getAuthErrorPresentation,
  isPasswordCompromisedError
} from '@vezham/auth-ui-core'
import { oneTapMutationKeys } from '@vezham/auth-ui-core/plugins/one-tap'
import { useAuth } from '@vezham/auth-ui-react'
import { toast } from '@vezham/react-v3'

export const ErrorToaster = () => {
  const { localization } = useAuth()
  const queryClient = useQueryClient()

  useEffect(() => {
    const queryCache = queryClient.getQueryCache()
    const previousQueryOnError = queryCache.config.onError

    queryCache.config.onError = (error, query) => {
      previousQueryOnError?.(error, query)

      if (!matchQuery({ queryKey: authQueryKeys.all }, query)) return
      if (getAuthErrorPresentation(query.meta) !== 'toast') return

      if (getAuthErrorCode(error) === 'EMAIL_NOT_VERIFIED') return
      const message = getAuthErrorMessage(error, localization)
      if (message) {
        console.error('[Vezham Auth]', error)
        toast.danger(message)
      }
    }

    const mutationCache = queryClient.getMutationCache()
    const previousMutationOnError = mutationCache.config.onError

    mutationCache.config.onError = (
      error,
      variables,
      onMutateResult,
      mutation,
      context
    ) => {
      previousMutationOnError?.(
        error,
        variables,
        onMutateResult,
        mutation,
        context
      )

      if (!matchMutation({ mutationKey: authMutationKeys.all }, mutation)) {
        return
      }
      if (getAuthErrorPresentation(mutation.meta) !== 'toast') return
      // vx-bot/NOTE: Every form that sets a new password renders this one against the
      // vx-bot/NOTE: password field, so a toast would just repeat it.
      if (isPasswordCompromisedError(error)) return

      if (
        getAuthErrorCode(error) === 'EMAIL_NOT_VERIFIED' &&
        !matchMutation({ mutationKey: oneTapMutationKeys.prompt }, mutation)
      ) {
        return
      }
      const message = getAuthErrorMessage(
        error,
        localization,
        mutation.options.mutationKey
      )
      if (message) {
        console.error('[Vezham Auth]', error)
        toast.danger(message)
      }
    }

    return () => {
      queryCache.config.onError = previousQueryOnError
      mutationCache.config.onError = previousMutationOnError
    }
  }, [queryClient, localization])

  return null
}
