// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { File, FileText, Folder, FolderOpen, Picture } from '@gravity-ui/icons'
import { useState } from 'react'
import type { Key } from 'react-aria-components/GridList'

import type { DataGridColumn } from '@vezham/react-pro-v3'
import { DataGrid } from '@vezham/react-pro-v3'
import { Chip } from '@vezham/react-v3'

type FileKind = 'folder' | 'document' | 'image' | 'text'

interface FileRow {
  id: string
  name: string
  kind: FileKind
  size: string
  modified: string
  children?: FileRow[]
}

const files: FileRow[] = [
  {
    children: [
      {
        children: [
          {
            id: '3',
            kind: 'document',
            modified: 'Jul 10, 2025',
            name: 'Weekly Report.pdf',
            size: '1.2 MB'
          },
          {
            id: '4',
            kind: 'document',
            modified: 'Aug 20, 2025',
            name: 'Budget.xlsx',
            size: '48 KB'
          }
        ],
        id: '2',
        kind: 'folder',
        modified: 'Aug 2, 2025',
        name: 'Project Alpha',
        size: '2 items'
      },
      {
        id: '8',
        kind: 'text',
        modified: 'Sep 14, 2025',
        name: 'Meeting Notes.md',
        size: '12 KB'
      }
    ],
    id: '1',
    kind: 'folder',
    modified: 'Oct 20, 2025',
    name: 'Documents',
    size: '3 items'
  },
  {
    children: [
      {
        id: '6',
        kind: 'image',
        modified: 'Jan 23, 2026',
        name: 'hero-1.png',
        size: '2.4 MB'
      },
      {
        id: '7',
        kind: 'image',
        modified: 'Feb 3, 2026',
        name: 'hero-2.png',
        size: '3.1 MB'
      }
    ],
    id: '5',
    kind: 'folder',
    modified: 'Feb 3, 2026',
    name: 'Photos',
    size: '2 items'
  },
  {
    id: '9',
    kind: 'text',
    modified: 'Mar 1, 2026',
    name: 'readme.txt',
    size: '4 KB'
  }
]

const kindLabel: Record<FileKind, string> = {
  document: 'Document',
  folder: 'Folder',
  image: 'Image',
  text: 'Text'
}

const kindChipColor: Record<
  FileKind,
  'accent' | 'success' | 'warning' | 'default'
> = {
  document: 'accent',
  folder: 'warning',
  image: 'success',
  text: 'default'
}

export function ExpandableRows() {
  const [expandedKeys, setExpandedKeys] = useState<Set<Key>>(
    () => new Set(['1'])
  )

  const isExpanded = (id: string) => expandedKeys.has(id)

  const columns: DataGridColumn<FileRow>[] = [
    {
      accessorKey: 'name',
      cell: item => {
        const Icon =
          item.kind === 'folder'
            ? isExpanded(item.id)
              ? FolderOpen
              : Folder
            : item.kind === 'image'
              ? Picture
              : item.kind === 'document'
                ? FileText
                : File

        return (
          <span className="flex min-w-0 items-center gap-2">
            <Icon
              className={
                item.kind === 'folder'
                  ? 'text-warning size-4 shrink-0'
                  : 'text-muted size-4 shrink-0'
              }
            />
            <span className="truncate text-sm font-medium">{item.name}</span>
          </span>
        )
      },
      header: 'Name',
      id: 'name',
      isRowHeader: true,
      minWidth: 280
    },
    {
      accessorKey: 'kind',
      cell: item => (
        <Chip color={kindChipColor[item.kind]} size="sm" variant="soft">
          <Chip.Label>{kindLabel[item.kind]}</Chip.Label>
        </Chip>
      ),
      header: 'Type',
      id: 'kind',
      minWidth: 120
    },
    {
      accessorKey: 'size',
      align: 'end',
      cellClassName: 'text-muted text-sm tabular-nums',
      header: 'Size',
      id: 'size',
      minWidth: 100
    },
    {
      accessorKey: 'modified',
      cellClassName: 'text-muted text-sm tabular-nums',
      header: 'Date Modified',
      id: 'modified',
      minWidth: 160
    }
  ]

  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <DataGrid
        aria-label="Files"
        columns={columns}
        contentClassName="min-w-[660px]"
        data={files}
        expandedKeys={expandedKeys}
        getChildren={item => item.children}
        getRowId={item => item.id}
        treeColumn="name"
        variant="primary"
        onExpandedChange={setExpandedKeys}
      />
    </div>
  )
}
