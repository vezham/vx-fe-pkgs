// Adapted documented HeroUI Pro example; see ../README.md.
import { useEffect, useRef, useState } from 'react'

export type PendingAttachment = {
  id: string
  mimeType?: string
  name: string
  src?: string
}

function createAttachmentId(file: File): string {
  return `${file.name}-${file.lastModified}-${
    globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)
  }`
}

function revokeAttachmentUrl(attachment: PendingAttachment) {
  if (attachment.src?.startsWith('blob:')) URL.revokeObjectURL(attachment.src)
}

function revokeAttachmentUrls(attachments: readonly PendingAttachment[]) {
  attachments.forEach(revokeAttachmentUrl)
}

export function useDemoAttachments() {
  const [attachments, setAttachments] = useState<PendingAttachment[]>([])
  const attachmentsRef = useRef<PendingAttachment[]>([])

  useEffect(() => {
    attachmentsRef.current = attachments
  }, [attachments])

  useEffect(() => {
    return () => revokeAttachmentUrls(attachmentsRef.current)
  }, [])

  const clearAttachments = () => {
    setAttachments(current => {
      revokeAttachmentUrls(current)

      return []
    })
  }

  const handleFilesSelected = (files: File[]) => {
    setAttachments(current => [
      ...current,
      ...files.map(file => ({
        id: createAttachmentId(file),
        mimeType: file.type,
        name: file.name,
        src: file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : undefined
      }))
    ])
  }

  const removeAttachment = (id: string) => {
    setAttachments(current => {
      const removed = current.find(attachment => attachment.id === id)

      if (removed) revokeAttachmentUrl(removed)

      return current.filter(attachment => attachment.id !== id)
    })
  }

  const replaceAttachments = (next: PendingAttachment[]) => {
    setAttachments(current => {
      revokeAttachmentUrls(current)

      return next.map(attachment => ({ ...attachment }))
    })
  }

  return {
    attachments,
    clearAttachments,
    handleFilesSelected,
    removeAttachment,
    replaceAttachments
  }
}
