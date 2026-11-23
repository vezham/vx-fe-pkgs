import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type OneTapAuthClient,
  promptOneTapOptions
} from '@vezham/auth-ui-core/plugins/one-tap'

/** Open the Google One Tap prompt through TanStack Query. */
export const usePromptOneTap = <TAuthClient extends OneTapAuthClient>(
  authClient: TAuthClient,
  queryClient?: QueryClient
) => {
  return useMutation(promptOneTapOptions(authClient), queryClient)
}
