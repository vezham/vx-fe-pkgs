// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  BarsDescendingAlignCenter,
  FileCode,
  FileText,
  Folder,
  FolderOpen
} from '@gravity-ui/icons'
import { useMemo, useState } from 'react'
import { Collection } from 'react-aria-components/Collection'

import { FileTree, useFileTree } from '@vezham/react-pro-v3'
import type { Selection } from '@vezham/react-v3'
import {
  Button,
  Dropdown,
  Header,
  Label,
  SearchField,
  Separator
} from '@vezham/react-v3'

const folderIcon = ({ isExpanded }: { isExpanded: boolean }) =>
  isExpanded ? <FolderOpen /> : <Folder />

interface PRFile {
  id: string
  name: string
  ext?: string
  children?: PRFile[]
}

const prFiles: PRFile[] = [
  {
    children: [
      {
        children: [
          {
            children: [
              { children: [], id: 'api-lib', name: 'lib' },
              { children: [], id: 'api-routes', name: 'routes' },
              {
                children: [
                  {
                    children: [
                      {
                        ext: '.ts',
                        id: 'cli-auth-spec',
                        name: 'cliAuthMiddleware.spec.ts'
                      }
                    ],
                    id: 'api-tests-mw',
                    name: 'middlewares'
                  },
                  {
                    children: [
                      {
                        ext: '.ts',
                        id: 'license-key-spec',
                        name: 'license-key.spec.ts'
                      }
                    ],
                    id: 'api-tests-routes',
                    name: 'routes'
                  },
                  {
                    children: [
                      {
                        ext: '.ts',
                        id: 'project-svc-spec',
                        name: 'projectService.spec.ts'
                      }
                    ],
                    id: 'api-tests-services',
                    name: 'services'
                  },
                  {
                    children: [
                      { ext: '.ts', id: 'email-spec', name: 'email.spec.ts' }
                    ],
                    id: 'api-tests-utils',
                    name: 'utils'
                  }
                ],
                id: 'api-tests',
                name: 'tests'
              },
              { ext: '.ts', id: 'api-auth', name: 'auth.ts' },
              { ext: '.ts', id: 'api-index', name: 'index.ts' },
              { ext: '.ts', id: 'api-openapi', name: 'openapi.ts' }
            ],
            id: 'api-src',
            name: 'src'
          },
          { ext: '.jsonc', id: 'api-wrangler', name: 'wrangler.jsonc' }
        ],
        id: 'api',
        name: 'api'
      },
      {
        children: [
          {
            children: [
              { children: [], id: 'fe-dashboard', name: 'dashboard' },
              { children: [], id: 'fe-invite', name: 'invite/[token]' }
            ],
            id: 'fe-app',
            name: 'app'
          },
          {
            children: [
              {
                children: [
                  {
                    ext: '.tsx',
                    id: 'fe-sidebar',
                    name: 'dashboard-sidebar.tsx'
                  }
                ],
                id: 'fe-comp-dashboard',
                name: 'dashboard'
              },
              {
                children: [
                  {
                    ext: '.tsx',
                    id: 'fe-create-modal',
                    name: 'create-license-key-modal.tsx'
                  }
                ],
                id: 'fe-comp-license',
                name: 'license-keys'
              },
              {
                children: [
                  {
                    ext: '.tsx',
                    id: 'fe-team-editor',
                    name: 'team-name-editor.tsx'
                  }
                ],
                id: 'fe-comp-teams',
                name: 'teams'
              }
            ],
            id: 'fe-components',
            name: 'components'
          },
          {
            children: [
              { ext: '.ts', id: 'fe-license-api', name: 'license-key-api.ts' }
            ],
            id: 'fe-lib',
            name: 'lib'
          }
        ],
        id: 'frontend-src',
        name: 'frontend/src'
      }
    ],
    id: 'apps',
    name: 'apps'
  }
]

export function PRFileReview() {
  const { expandableKeys, filterTree, leaves } = useFileTree({ items: prFiles })

  const extCounts = useMemo(() => {
    const counts: Record<string, number> = {}

    for (const f of leaves) {
      if (f.ext) counts[f.ext] = (counts[f.ext] || 0) + 1
    }

    return counts
  }, [leaves])

  const allExts = useMemo(() => Object.keys(extCounts).sort(), [extCounts])

  const [selectedExts, setSelectedExts] = useState<Selection>(new Set(allExts))
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () =>
      filterTree(node => {
        const matchesExt =
          !node.ext ||
          selectedExts === 'all' ||
          (selectedExts as Set<string>).has(node.ext)
        const matchesSearch =
          !search || node.name.toLowerCase().includes(search.toLowerCase())

        return matchesExt && matchesSearch
      }),
    [filterTree, selectedExts, search]
  )

  return (
    <div className="flex w-[310px] flex-col gap-3">
      <div className="flex w-full items-center gap-3 px-2">
        <SearchField
          aria-label="Filter files"
          className="w-full"
          value={search}
          onChange={setSearch}>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input
              className="w-full"
              placeholder="Filter files..."
            />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
        <Dropdown>
          <Button
            isIconOnly
            aria-label="File extensions"
            className="shrink-0"
            variant="secondary">
            <BarsDescendingAlignCenter />
          </Button>
          <Dropdown.Popover className="min-w-[210px]">
            <Dropdown.Menu
              selectedKeys={selectedExts}
              selectionMode="multiple"
              onSelectionChange={setSelectedExts}>
              <Dropdown.Section>
                <Header>File extensions</Header>
                {allExts.map(ext => (
                  <Dropdown.Item key={ext} id={ext} textValue={ext}>
                    <Dropdown.ItemIndicator />
                    <Label>{ext}</Label>
                  </Dropdown.Item>
                ))}
              </Dropdown.Section>
              <Separator />
              <Dropdown.Section>
                <Dropdown.Item>
                  <Label>Deleted files</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
                <Dropdown.Item>
                  <Label>Viewed files</Label>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>

      <FileTree
        aria-label="PR changed files"
        defaultExpandedKeys={expandableKeys}
        items={filtered}
        showGuideLines="hover">
        {function renderItem(item: PRFile) {
          return (
            <FileTree.Item
              id={item.id}
              textValue={item.name}
              title={item.name}
              icon={
                item.children ? (
                  folderIcon
                ) : item.ext === '.tsx' ? (
                  <FileCode />
                ) : item.ext === '.ts' ? (
                  <FileCode />
                ) : (
                  <FileText />
                )
              }>
              {!!item.children && (
                <Collection items={item.children}>{renderItem}</Collection>
              )}
            </FileTree.Item>
          )
        }}
      </FileTree>
    </div>
  )
}
