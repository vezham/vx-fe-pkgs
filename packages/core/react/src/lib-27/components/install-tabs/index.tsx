import { DynamicCodeBlock } from '@vezham/docs-react/components/dynamic-codeblock'
import {
  Tab,
  Tabs,
  TabsList,
  TabsTrigger
} from '@vezham/docs-react/components/tabs'
import { useCopyToClipboard } from '@vezham/hooks'
import { CheckCircle, Copy } from '@vezham/icons-react'
import { Button } from '@vezham/react-v3'

import { packageManagerIcons } from './package-manager-icons'

const packageManagers = [
  { id: 'npm', command: 'npm install' },
  { id: 'pnpm', command: 'pnpm add' },
  { id: 'yarn', command: 'yarn add' },
  { id: 'bun', command: 'bun add' }
] as const

export type PackageManager = (typeof packageManagers)[number]['id']

export type InstallTabsCommandProps = { command: string }

const InstallCommand = ({ command }: InstallTabsCommandProps) => {
  const { copy, isCopied, isUnavailable } = useCopyToClipboard()
  return (
    <DynamicCodeBlock
      lang="bash"
      code={command}
      codeblock={{
        allowCopy: false,
        Actions: ({ className }) => (
          <Button
            className={className}
            aria-label={
              isUnavailable
                ? 'Unable to copy install command'
                : isCopied
                  ? 'Install command copied'
                  : 'Copy install command'
            }
            isIconOnly
            size="sm"
            variant="ghost"
            onPress={() => void copy(command)}>
            {isCopied ? (
              <CheckCircle size={16} aria-hidden="true" />
            ) : (
              <Copy size={16} aria-hidden="true" />
            )}
          </Button>
        )
      }}
    />
  )
}

export type InstallTabsProps = {
  packages: string | readonly string[]
  dev?: boolean
  defaultManager?: PackageManager
  label?: string
  className?: string
  showIcons?: boolean
}

const InstallTabsRoot = ({
  packages,
  dev = false,
  defaultManager = 'npm',
  label = 'Package manager',
  className,
  showIcons = true
}: InstallTabsProps) => {
  const names = typeof packages === 'string' ? packages : packages.join(' ')
  return (
    <Tabs defaultValue={defaultManager} className={className}>
      <TabsList aria-label={label}>
        {packageManagers.map(manager => (
          <TabsTrigger
            key={manager.id}
            value={manager.id}
            className="cursor-pointer">
            {showIcons && (
              <img
                src={packageManagerIcons[manager.id]}
                alt=""
                width={12}
                height={12}
                className="block shrink-0 translate-y-0.5 rounded-none object-contain"
              />
            )}
            {manager.id}
          </TabsTrigger>
        ))}
      </TabsList>
      {packageManagers.map(manager => (
        <Tab key={manager.id} value={manager.id}>
          <InstallCommand
            command={`${manager.command}${dev ? ' -D' : ''} ${names}`}
          />
        </Tab>
      ))}
    </Tabs>
  )
}

export const InstallTabs = Object.assign(InstallTabsRoot, {
  Command: InstallCommand
})
