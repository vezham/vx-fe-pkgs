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

import { assetUrl } from '@src/lib/icon-library/catalog'

const packageManagers = [
  { id: 'npm', command: 'npm install' },
  { id: 'pnpm', command: 'pnpm add' },
  { id: 'yarn', command: 'yarn add' },
  { id: 'bun', command: 'bun add' }
] as const

const InstallCommand = ({ command }: { command: string }) => {
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

export const InstallTabs = ({
  packages,
  dev = false
}: {
  packages: string | string[]
  dev?: boolean
}) => {
  const names = Array.isArray(packages) ? packages.join(' ') : packages
  return (
    <Tabs defaultValue="npm">
      <TabsList aria-label="Package manager">
        {packageManagers.map(manager => (
          <TabsTrigger
            key={manager.id}
            value={manager.id}
            className="cursor-pointer">
            <img
              src={assetUrl('logos', { slug: manager.id, variants: {} })}
              alt=""
              width={12}
              height={12}
              loading="lazy"
              className="block shrink-0 translate-y-0.5 rounded-none object-contain"
            />
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
