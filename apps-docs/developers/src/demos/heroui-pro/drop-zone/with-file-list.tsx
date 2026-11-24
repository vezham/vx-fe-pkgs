// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  CircleCheckFill,
  CircleXmarkFill,
  CloudArrowUpIn
} from '@gravity-ui/icons'
import { useCallback, useEffect, useRef, useState } from 'react'

import { DropZone } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

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
    ts: 'blue',
    tsx: 'blue',
    txt: 'gray',
    xlsx: 'green',
    zip: 'orange'
  }

  return map[ext.toLowerCase()] ?? 'gray'
}

function addFilesToState(
  incoming: File[],
  setFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>
) {
  const newFiles: UploadFile[] = incoming.map((f, i) => ({
    id: `${Date.now()}-${i}`,
    name: f.name,
    progress: 0,
    size: f.size,
    status: 'uploading' as const
  }))

  setFiles(prev => [...newFiles, ...prev])
}

export function WithFileList() {
  const [files, setFiles] = useState<UploadFile[]>([
    {
      id: '1',
      name: 'Annual report 2025.pdf',
      progress: 100,
      size: 2306867,
      status: 'complete'
    },
    {
      id: '2',
      name: 'Hero banner.png',
      progress: 42,
      size: 491520,
      status: 'uploading'
    },
    {
      id: '3',
      name: 'Onboarding flow.mp4',
      progress: 18,
      size: 8388608,
      status: 'failed'
    }
  ])

  const timersRef = useRef<Map<string, ReturnType<typeof setInterval>>>(
    new Map()
  )

  useEffect(() => {
    files.forEach(file => {
      if (file.status === 'uploading' && !timersRef.current.has(file.id)) {
        const fileId = file.id
        const timer = setInterval(() => {
          setFiles(prev =>
            prev.map(f => {
              if (f.id !== fileId || f.status !== 'uploading') return f
              const next = Math.min(
                f.progress + Math.floor(Math.random() * 12) + 3,
                100
              )

              if (next >= 100) {
                const t = timersRef.current.get(fileId)

                if (t) clearInterval(t)
                timersRef.current.delete(fileId)

                return { ...f, progress: 100, status: 'complete' as const }
              }

              return { ...f, progress: next }
            })
          )
        }, 350)

        timersRef.current.set(fileId, timer)
      }
    })
  }, [files])

  useEffect(() => {
    const ref = timersRef.current

    return () => {
      ref.forEach(timer => clearInterval(timer))
      ref.clear()
    }
  }, [])

  const handleRemove = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
    const timer = timersRef.current.get(id)

    if (timer) {
      clearInterval(timer)
      timersRef.current.delete(id)
    }
  }, [])

  const handleRetry = useCallback((id: string) => {
    setFiles(prev =>
      prev.map(f =>
        f.id === id ? { ...f, progress: 0, status: 'uploading' as const } : f
      )
    )
  }, [])

  const handleSelect = useCallback(
    (fileList: FileList) => addFilesToState(Array.from(fileList), setFiles),
    []
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
      addFilesToState(dropped, setFiles)
    },
    []
  )

  return (
    <DropZone className="w-[480px]">
      <DropZone.Area onDrop={handleDrop as any}>
        <DropZone.Icon>
          <CloudArrowUpIn />
        </DropZone.Icon>
        <DropZone.Label>Upload project assets</DropZone.Label>
        <DropZone.Description>
          Documents, images, or videos up to 10 MB each.
        </DropZone.Description>
        <DropZone.Trigger>Add Files</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input multiple onSelect={handleSelect} />

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
                    {file.status === 'uploading' && ' | Uploading...'}
                    {file.status === 'complete' && (
                      <div className="flex items-center gap-1">
                        {' | '}
                        <CircleCheckFill className="text-success inline size-3" />{' '}
                        Complete
                      </div>
                    )}
                    {file.status === 'failed' && (
                      <div className="flex items-center gap-1">
                        {' | '}
                        <CircleXmarkFill className="text-danger inline size-3" />{' '}
                        <span className="text-danger">Failed</span>
                      </div>
                    )}
                  </DropZone.FileMeta>
                  {(file.status === 'uploading' ||
                    file.status === 'complete') && (
                    <DropZone.FileProgress value={file.progress}>
                      <DropZone.FileProgressTrack>
                        <DropZone.FileProgressFill />
                      </DropZone.FileProgressTrack>
                    </DropZone.FileProgress>
                  )}
                  {file.status === 'failed' && (
                    <Button
                      className="mt-2 -ml-1"
                      size="sm"
                      variant="danger-soft"
                      onPress={() => handleRetry(file.id)}>
                      Try again
                    </Button>
                  )}
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
