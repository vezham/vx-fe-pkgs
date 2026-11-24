// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { CircleCheckFill, CloudArrowUpIn } from '@gravity-ui/icons'
import { useEffect, useState } from 'react'

import { DropZone } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

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
    mp4: 'purple',
    pdf: 'red',
    png: 'green',
    svg: 'green',
    txt: 'gray',
    xlsx: 'green'
  }

  return map[ext.toLowerCase()] ?? 'gray'
}

const initialFiles = [
  {
    id: '1',
    name: 'Logo dark.svg',
    progress: 100,
    size: 24576,
    status: 'complete' as const
  },
  {
    id: '2',
    name: 'Meeting notes.docx',
    progress: 68,
    size: 358400,
    status: 'uploading' as const
  },
  {
    id: '3',
    name: 'Demo recording.mp4',
    progress: 0,
    size: 5242880,
    status: 'failed' as const
  }
]

export function CompactFileList() {
  const [files, setFiles] = useState(initialFiles)

  useEffect(() => {
    if (files.length > 0) return
    const timer = setTimeout(() => setFiles(initialFiles), 600)

    return () => clearTimeout(timer)
  }, [files.length])

  const handleRemove = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  return (
    <DropZone className="w-[480px]">
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
                  {file.status === 'uploading' && (
                    <>
                      {' | '}
                      <CloudArrowUpIn className="inline size-3 align-[-1px]" />{' '}
                      {file.progress}%
                    </>
                  )}
                  {file.status === 'complete' && (
                    <>
                      {' | '}
                      <CircleCheckFill className="text-success inline size-3 align-[-1px]" />{' '}
                      100%
                    </>
                  )}
                </DropZone.FileMeta>
                {file.status === 'failed' && (
                  <>
                    <DropZone.FileMeta>
                      Something went wrong, please retry
                    </DropZone.FileMeta>
                    <Button
                      className="mt-2 -ml-1"
                      size="sm"
                      variant="danger-soft">
                      Try again
                    </Button>
                  </>
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
    </DropZone>
  )
}
