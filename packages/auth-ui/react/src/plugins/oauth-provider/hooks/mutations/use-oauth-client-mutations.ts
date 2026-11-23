import { type QueryClient, useMutation } from '@tanstack/react-query'

import {
  type OAuthClientManager,
  type OAuthClientOwner,
  createOAuthClientOptions,
  deleteOAuthClientOptions,
  rotateOAuthClientSecretOptions,
  setOAuthClientDisabledOptions,
  updateOAuthClientOptions
} from '@vezham/auth-ui-core/plugins/oauth-provider'

export const useCreateOAuthClient = (
  manager: OAuthClientManager,
  owner: OAuthClientOwner,
  ownerKey?: string,
  queryClient?: QueryClient
) =>
  useMutation(createOAuthClientOptions(manager, owner, ownerKey), queryClient)

export const useUpdateOAuthClient = (
  manager: OAuthClientManager,
  owner: OAuthClientOwner,
  ownerKey?: string,
  queryClient?: QueryClient
) =>
  useMutation(updateOAuthClientOptions(manager, owner, ownerKey), queryClient)

export const useDeleteOAuthClient = (
  manager: OAuthClientManager,
  owner: OAuthClientOwner,
  ownerKey?: string,
  queryClient?: QueryClient
) =>
  useMutation(deleteOAuthClientOptions(manager, owner, ownerKey), queryClient)

export const useRotateOAuthClientSecret = (
  manager: OAuthClientManager,
  owner: OAuthClientOwner,
  ownerKey?: string,
  queryClient?: QueryClient
) =>
  useMutation(
    rotateOAuthClientSecretOptions(manager, owner, ownerKey),
    queryClient
  )

export const useSetOAuthClientDisabled = (
  manager: OAuthClientManager,
  owner: OAuthClientOwner,
  ownerKey?: string,
  queryClient?: QueryClient
) =>
  useMutation(
    setOAuthClientDisabledOptions(manager, owner, ownerKey),
    queryClient
  )
