'use client'

import { ApiKey as ApiKeyRoot } from './api-key'
import { ApiKeySkeleton } from './api-key-skeleton'
import { ApiKeys } from './api-keys'
import { ApiKeysEmpty } from './api-keys-empty'
import { CreateApiKeyDialog } from './create-api-key-dialog'
import { DeleteApiKeyDialog } from './delete-api-key-dialog'
import { EditApiKeyDialog } from './edit-api-key-dialog'
import { NewApiKeyDialog } from './new-api-key-dialog'
import { OrganizationApiKeys } from './organization-api-keys'
import { apiKeyPlugin } from './plugin'

export type * from './api-keys'
export type * from './plugin'
export type * from './api-key'
export type * from './organization-api-keys'
export type * from './api-keys-empty'
export type * from './api-key-skeleton'
export type * from './create-api-key-dialog'
export type * from './edit-api-key-dialog'
export type * from './new-api-key-dialog'
export type * from './delete-api-key-dialog'

export const ApiKey = Object.assign(ApiKeys, {
  plugin: apiKeyPlugin,
  Item: ApiKeyRoot,
  Organization: OrganizationApiKeys,
  Empty: ApiKeysEmpty,
  Skeleton: ApiKeySkeleton,
  CreateDialog: CreateApiKeyDialog,
  EditDialog: EditApiKeyDialog,
  NewDialog: NewApiKeyDialog,
  DeleteDialog: DeleteApiKeyDialog
})
