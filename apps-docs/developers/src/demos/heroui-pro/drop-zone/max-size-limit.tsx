// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useCallback, useState } from 'react'

import { DropZone } from '@vezham/react-pro-v3'

interface UploadFile {
  id: string
  name: string
  size: number
  status: 'uploading' | 'complete' | 'failed'
  progress: number
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getExtension(name: string): string {
  const dot = name.lastIndexOf('.')

  return dot > 0 ? name.slice(dot + 1) : ''
}

type FileFormatColor = 'blue' | 'gray' | 'green' | 'orange' | 'purple' | 'red'

function getFormatColor(ext: string): FileFormatColor {
  const map: Record<string, FileFormatColor> = {
    csv: 'green',
    doc: 'blue',
    docx: 'blue',
    fig: 'purple',
    jpeg: 'blue',
    jpg: 'blue',
    json: 'orange',
    mp4: 'purple',
    pdf: 'red',
    png: 'green',
    svg: 'green',
    txt: 'gray',
    xlsx: 'green',
    zip: 'orange'
  }

  return map[ext.toLowerCase()] ?? 'gray'
}

const MAX_SIZE = 5 * 1024 * 1024

export function MaxSizeLimit() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [error, setError] = useState<string | null>(null)

  const addFiles = useCallback((incoming: File[]) => {
    setError(null)
    const accepted: UploadFile[] = []
    const rejected: string[] = []

    for (const f of incoming) {
      if (f.size > MAX_SIZE) {
        rejected.push(f.name)
      } else {
        accepted.push({
          id: `${Date.now()}-${accepted.length}`,
          name: f.name,
          progress: 100,
          size: f.size,
          status: 'complete'
        })
      }
    }

    if (rejected.length > 0) {
      setError(`Rejected (over 5 MB): ${rejected.join(', ')}`)
    }
    if (accepted.length > 0) {
      setFiles(prev => [...prev, ...accepted])
    }
  }, [])

  const handleSelect = useCallback(
    (fileList: FileList) => addFiles(Array.from(fileList)),
    [addFiles]
  )

  const handleDrop = useCallback(
    async (e: {
      items: Array<{ kind: string; getFile?: () => Promise<File> }>
    }) => {
      const dropped: File[] = []

      for (const item of e.items) {
        if (item.kind === 'file' && item.getFile) {
          dropped.push(await item.getFile())
        }
      }
      addFiles(dropped)
    },
    [addFiles]
  )

  const handleRemove = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }, [])

  return (
    <DropZone className="w-[420px]">
      <DropZone.Area onDrop={handleDrop as any}>
        <DropZone.Icon />
        <DropZone.Label>Attach files (5 MB limit per file)</DropZone.Label>
        <DropZone.Description>
          Any file type accepted. Files over 5 MB will be rejected.
        </DropZone.Description>
        <DropZone.Trigger>Select Files</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input multiple onSelect={handleSelect} />

      {!!error && <p className="text-danger m-0 text-[13px]">{error}</p>}

      {files.length > 0 && (
        <DropZone.FileList>
          {files.map(file => {
            const ext = getExtension(file.name).toUpperCase()

            return (
              <DropZone.FileItem key={file.id} status={file.status}>
                <DropZone.FileFormatIcon
                  color={getFormatColor(ext.toLowerCase())}
                  format={ext}
                />
                <DropZone.FileInfo>
                  <DropZone.FileName>{file.name}</DropZone.FileName>
                  <DropZone.FileMeta>
                    {formatFileSize(file.size)}
                  </DropZone.FileMeta>
                </DropZone.FileInfo>
                <DropZone.FileRemoveTrigger
                  aria-label={`Remove ${file.name}`}
                  onPress={() => handleRemove(file.id)}
                />
              </DropZone.FileItem>
            )
          })}
        </DropZone.FileList>
      )}
    </DropZone>
  )
}
