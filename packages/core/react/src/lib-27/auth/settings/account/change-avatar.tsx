import { type ChangeEvent, useRef, useState } from 'react'

import { fileToAvatarDataUrl } from '@vezham/auth-ui-core'
import { useAuth, useSession, useUpdateUser } from '@vezham/auth-ui-react'
import {
  CloudUpload as CloudArrowUpIn,
  TrashBinTrash as TrashBin
} from '@vezham/icons-react'
import { Button, Dropdown, Label, Spinner, cn, toast } from '@vezham/react-v3'

import { UserAvatar } from '../../user/user-avatar'

export type ChangeAvatarProps = {
  className?: string
}

export const ChangeAvatar = ({ className }: ChangeAvatarProps) => {
  const { authClient, localization, avatar } = useAuth()
  const { data: session } = useSession(authClient)

  const { mutate: updateUser, isPending: updatePending } =
    useUpdateUser(authClient)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const isPending = updatePending || isUploading || isDeleting

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    e.target.value = ''

    setIsUploading(true)

    try {
      const resized =
        (await avatar.resize?.(file, avatar.size, avatar.extension)) || file

      const image =
        (await avatar.upload?.(resized)) || (await fileToAvatarDataUrl(resized))

      updateUser(
        { image },
        {
          onSuccess: () =>
            toast.success(localization.settings.avatarChangedSuccess)
        }
      )
    } catch (error) {
      console.error('[Vezham Auth] Image operation failed', error)
      toast.danger(localization.errors.imageUploadFailed)
    }

    setIsUploading(false)
  }

  const handleDelete = async () => {
    const currentImage = session?.user.image

    updateUser(
      { image: null },
      {
        onSuccess: () => {
          void (async () => {
            if (currentImage) {
              setIsDeleting(true)
              try {
                await avatar.delete?.(currentImage)
              } catch (error) {
                console.error('[Vezham Auth] Image operation failed', error)
                toast.danger(localization.errors.imageDeleteFailed)
                return
              } finally {
                setIsDeleting(false)
              }
            }

            toast.success(localization.settings.avatarDeletedSuccess)
          })()
        }
      }
    )
  }

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <Label isDisabled={!session}>{localization.settings.avatar}</Label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => void handleFileChange(e)}
      />

      <div className="flex items-center gap-4">
        <Button
          type="button"
          isIconOnly
          aria-label={localization.settings.avatar}
          variant="ghost"
          className="h-auto w-auto rounded-full p-0"
          isDisabled={!session || isPending}
          onPress={() => fileInputRef.current?.click()}>
          <UserAvatar size="lg" isPending={isPending} />
        </Button>

        <Dropdown>
          <Button
            isDisabled={!session || isPending}
            size="sm"
            variant="secondary">
            {isPending && <Spinner size="sm" />}

            {localization.settings.changeAvatar}
          </Button>

          <Dropdown.Popover className="min-w-fit">
            <Dropdown.Menu>
              <Dropdown.Item
                textValue={localization.settings.uploadAvatar}
                onAction={() => fileInputRef.current?.click()}>
                <CloudArrowUpIn size={16} className="text-muted" />

                <Label>{localization.settings.uploadAvatar}</Label>
              </Dropdown.Item>

              <Dropdown.Item
                textValue={localization.settings.deleteAvatar}
                isDisabled={!session?.user.image}
                onAction={() => void handleDelete()}
                variant="danger">
                <TrashBin size={16} className="text-danger" />

                <Label>{localization.settings.deleteAvatar}</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </div>
  )
}
