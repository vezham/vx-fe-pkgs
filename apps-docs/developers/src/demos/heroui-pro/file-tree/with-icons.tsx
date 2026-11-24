// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Code,
  CurlyBrackets,
  FileCode,
  FileText,
  Folder,
  FolderOpen,
  Gear
} from '@gravity-ui/icons'

import { FileTree } from '@vezham/react-pro-v3'

const folderIcon = ({ isExpanded }: { isExpanded: boolean }) =>
  isExpanded ? <FolderOpen /> : <Folder />

export function WithIcons() {
  return (
    <FileTree
      aria-label="Project with icons"
      className="w-[300px]"
      defaultExpandedKeys={['src', 'components', 'utils']}>
      <FileTree.Item icon={folderIcon} id="src" textValue="src" title="src">
        <FileTree.Item
          icon={folderIcon}
          id="components"
          textValue="components"
          title="components">
          <FileTree.Item
            icon={<FileCode />}
            id="button-tsx"
            textValue="button.tsx"
            title="button.tsx"
          />
          <FileTree.Item
            icon={<FileCode />}
            id="card-tsx"
            textValue="card.tsx"
            title="card.tsx"
          />
          <FileTree.Item
            icon={<Code />}
            id="button-css"
            textValue="button.css"
            title="button.css"
          />
        </FileTree.Item>
        <FileTree.Item
          icon={folderIcon}
          id="utils"
          textValue="utils"
          title="utils">
          <FileTree.Item
            icon={<FileCode />}
            id="compose-ts"
            textValue="compose.ts"
            title="compose.ts"
          />
          <FileTree.Item
            icon={<FileCode />}
            id="cn-ts"
            textValue="cn.ts"
            title="cn.ts"
          />
        </FileTree.Item>
        <FileTree.Item
          icon={<FileCode />}
          id="index-ts"
          textValue="index.ts"
          title="index.ts"
        />
      </FileTree.Item>
      <FileTree.Item
        icon={<CurlyBrackets />}
        id="package-json"
        textValue="package.json"
        title="package.json"
      />
      <FileTree.Item
        icon={<CurlyBrackets />}
        id="tsconfig-json"
        textValue="tsconfig.json"
        title="tsconfig.json"
      />
      <FileTree.Item
        icon={<FileText />}
        id="readme-md"
        textValue="README.md"
        title="README.md"
      />
      <FileTree.Item icon={<Gear />} id="env" textValue=".env" title=".env" />
    </FileTree>
  )
}
