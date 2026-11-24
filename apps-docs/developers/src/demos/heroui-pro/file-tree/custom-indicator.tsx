// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  CaretRight,
  CurlyBrackets,
  FileCode,
  FileText,
  Folder,
  FolderOpen
} from '@gravity-ui/icons'

import { FileTree } from '@vezham/react-pro-v3'

const folderIcon = ({ isExpanded }: { isExpanded: boolean }) =>
  isExpanded ? <FolderOpen /> : <Folder />

export function CustomIndicator() {
  return (
    <FileTree
      aria-label="Custom indicator"
      className="w-[300px]"
      defaultExpandedKeys={['src', 'components']}>
      <FileTree.Item icon={folderIcon} id="src" textValue="src" title="src">
        <FileTree.Indicator>
          <CaretRight />
        </FileTree.Indicator>
        <FileTree.Item
          icon={folderIcon}
          id="components"
          textValue="components"
          title="components">
          <FileTree.Indicator>
            <CaretRight />
          </FileTree.Indicator>
          <FileTree.Item
            icon={<FileCode />}
            id="button"
            textValue="button.tsx"
            title="button.tsx"
          />
          <FileTree.Item
            icon={<FileCode />}
            id="card"
            textValue="card.tsx"
            title="card.tsx"
          />
        </FileTree.Item>
        <FileTree.Item
          icon={<FileCode />}
          id="index"
          textValue="index.ts"
          title="index.ts"
        />
      </FileTree.Item>
      <FileTree.Item
        icon={<CurlyBrackets />}
        id="pkg"
        textValue="package.json"
        title="package.json"
      />
      <FileTree.Item
        icon={<FileText />}
        id="readme"
        textValue="README.md"
        title="README.md"
      />
    </FileTree>
  )
}
