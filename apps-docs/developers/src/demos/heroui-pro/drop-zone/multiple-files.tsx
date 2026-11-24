// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

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

export function MultipleFiles() {
  const [files, setFiles] = useState<UploadFile[]>([])
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

  const handleSelect = useCallback((fileList: FileList) => {
    const newFiles: UploadFile[] = Array.from(fileList).map((f, i) => ({
      id: `${Date.now()}-${i}`,
      name: f.name,
      progress: 0,
      size: f.size,
      status: 'uploading' as const
    }))

    setFiles(prev => [...newFiles, ...prev])
  }, [])

  const handleRemove = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
    const timer = timersRef.current.get(id)

    if (timer) {
      clearInterval(timer)
      timersRef.current.delete(id)
    }
  }, [])

  return (
    <DropZone className="w-[480px]">
      <DropZone.Area>
        <DropZone.Icon />
        <DropZone.Label>Add multiple attachments</DropZone.Label>
        <DropZone.Description>
          All formats welcome, 50 MB max per file.
        </DropZone.Description>
        <DropZone.Trigger>Choose Files</DropZone.Trigger>
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
                    {file.status === 'uploading' && ` | ${file.progress}%`}
                    {file.status === 'complete' && ' | 100%'}
                  </DropZone.FileMeta>
                  {file.status === 'uploading' && (
                    <DropZone.FileProgress value={file.progress}>
                      <DropZone.FileProgressTrack>
                        <DropZone.FileProgressFill />
                      </DropZone.FileProgressTrack>
                    </DropZone.FileProgress>
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
