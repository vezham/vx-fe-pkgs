import { type ChangeEvent, useRef, useState } from 'react'

import { fileToBase64 } from '@vezham/auth-ui-core'
import type { OrganizationAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import {
  useActiveOrganization,
  useHasPermission,
  useUpdateOrganization
} from '@vezham/auth-ui-react/plugins/organization'
import {
  CloudUpload as CloudArrowUpIn,
  TrashBinTrash as TrashBin
} from '@vezham/icons-react'
import { Button, Dropdown, Label, Spinner, cn, toast } from '@vezham/react-v3'

import { OrganizationLogo } from './organization-logo'

export type ChangeOrganizationLogoProps = {
  className?: string
}

export const ChangeOrganizationLogo = ({
  className
}: ChangeOrganizationLogoProps) => {
  const { authClient, localization } = useAuth<OrganizationAuthClient>()
  const { logo, localization: organizationLocalization } =
    useAuthPlugin(organizationPlugin)

  const { data: activeOrganization, isPending: activeOrganizationPending } =
    useActiveOrganization(authClient)
  const canUpdate = useHasPermission(authClient, {
    permissions: { organization: ['update'] }
  })

  const { mutate: updateOrganization, isPending: updatePending } =
    useUpdateOrganization(authClient)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const isPending = updatePending || isUploading || isDeleting

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !activeOrganization || !canUpdate.data?.success) return

    e.target.value = ''

    setIsUploading(true)

    try {
      const resized =
        (await logo.resize?.(file, logo.size, logo.extension)) || file

      const image =
        (await logo.upload?.(resized)) || (await fileToBase64(resized))

      updateOrganization(
        { data: { logo: image } },
        {
          onSuccess: () =>
            toast.success(organizationLocalization.logoChangedSuccess),
          onSettled: () => setIsUploading(false)
        }
      )
    } catch (error) {
      setIsUploading(false)
      console.error('[Vezham Auth] Image operation failed', error)
      toast.danger(localization.errors.imageUploadFailed)
    }
  }

  const handleDelete = async () => {
    if (!canUpdate.data?.success) return
    const currentLogo = activeOrganization?.logo

    updateOrganization(
      {
        data: { logo: '' }
      },
      {
        onSuccess: () => {
          void (async () => {
            if (!currentLogo) {
              toast.success(organizationLocalization.logoDeletedSuccess)
              return
            }

            setIsDeleting(true)
            try {
              await logo.delete?.(currentLogo)
              toast.success(organizationLocalization.logoDeletedSuccess)
            } catch (error) {
              console.error('[Vezham Auth] Image operation failed', error)
              toast.danger(localization.errors.imageDeleteFailed)
            } finally {
              setIsDeleting(false)
            }
          })()
        }
      }
    )
  }

  if (!logo.enabled) {
    return null
  }

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <Label isDisabled={!activeOrganization}>
        {organizationLocalization.logo}
      </Label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => void handleFileChange(e)}
      />

      <div className="flex items-center gap-4">
        {canUpdate.data?.success ? (
          <Button
            type="button"
            isIconOnly
            aria-label={organizationLocalization.logo}
            variant="ghost"
            className="h-auto w-auto rounded-full p-0"
            isDisabled={!activeOrganization || isPending}
            onPress={() => fileInputRef.current?.click()}>
            <OrganizationLogo
              size="lg"
              isPending={activeOrganizationPending}
              organization={activeOrganization}
            />
          </Button>
        ) : (
          <OrganizationLogo
            size="lg"
            isPending={activeOrganizationPending}
            organization={activeOrganization}
          />
        )}

        {(canUpdate.isPending || canUpdate.data?.success) && (
          <Dropdown>
            <Button
              isDisabled={
                !activeOrganization || isPending || canUpdate.isPending
              }
              size="sm"
              variant="secondary">
              {isPending && <Spinner size="sm" />}

              {organizationLocalization.changeLogo}
            </Button>

            <Dropdown.Popover className="min-w-fit">
              <Dropdown.Menu>
                <Dropdown.Item
                  textValue={organizationLocalization.uploadLogo}
                  onAction={() => fileInputRef.current?.click()}>
                  <CloudArrowUpIn size={16} className="text-muted" />

                  <Label>{organizationLocalization.uploadLogo}</Label>
                </Dropdown.Item>

                <Dropdown.Item
                  textValue={organizationLocalization.deleteLogo}
                  isDisabled={!activeOrganization?.logo}
                  onAction={() => void handleDelete()}
                  variant="danger">
                  <TrashBin size={16} className="text-danger" />

                  <Label>{organizationLocalization.deleteLogo}</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        )}
      </div>
    </div>
  )
}
