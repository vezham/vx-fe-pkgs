import { useCallback } from 'react'

import { useTheme } from '@vezham/docs-react/provider/base'
import { useCopyToClipboard } from '@vezham/hooks'
import { CheckCircle, Code, Copy, Link as LinkIcon } from '@vezham/icons-react'
import { CodeBlock } from '@vezham/react-pro-v3/code-block'
import { Button, Tabs } from '@vezham/react-v3'

import { type AssetKind, assetUrl } from '@src/lib/icon-library/catalog'
import { getIconSvg } from '@src/lib/icon-library/runtime'
import type { getAssetSnippets } from '@src/lib/icon-library/snippets'
import { fetchAssetSvg } from '@src/lib/icon-library/svg'
import { useResource } from '@src/lib/icon-library/use-resource'

import { ResourceStatus } from './controls'

const Snippet = ({ code, language }: { code: string; language: string }) => {
  const { resolvedTheme } = useTheme()
  const { copy, isCopied, isUnavailable } = useCopyToClipboard()
  return (
    <CodeBlock className="min-w-0">
      <CodeBlock.Header>
        <span className="text-muted text-sm">{language}</span>
        <Button
          aria-label={
            isUnavailable
              ? 'Copy unavailable'
              : isCopied
                ? 'Code copied'
                : 'Copy code'
          }
          className="code-block__copy-button"
          isIconOnly
          size="sm"
          variant="ghost"
          onPress={() => void copy(code)}>
          {isCopied ? (
            <CheckCircle aria-hidden="true" />
          ) : (
            <Copy aria-hidden="true" />
          )}
        </Button>
      </CodeBlock.Header>
      <CodeBlock.Code
        code={code}
        language={language}
        theme={resolvedTheme === 'dark' ? 'github-dark' : 'github-light'}
        className="max-h-96 overflow-auto"
      />
    </CodeBlock>
  )
}

const SvgSource = ({
  name,
  source,
  weight,
  size,
  color,
  secondaryColor
}: {
  name: string
  source?: string
  weight: string
  size: number
  color: string
  secondaryColor: string
}) => {
  const load = useCallback(
    () =>
      source
        ? fetchAssetSvg(source)
        : getIconSvg(name, weight, size, color, secondaryColor),
    [source, name, weight, size, color, secondaryColor]
  )
  const resource = useResource(
    `${source ?? name}:${weight}:${size}:${color}:${secondaryColor}`,
    load
  )
  return (
    <ResourceStatus
      loading={resource.loading}
      error={resource.error}
      retry={resource.retry}>
      <Snippet
        code={(resource.data ?? '').replace(/></g, '>\n<')}
        language="xml"
      />
    </ResourceStatus>
  )
}

type Props = {
  kind: AssetKind
  name: string
  source: string
  weight: string
  size: number
  color: string
  secondaryColor: string
  illustrationSvg?: string
  snippets: ReturnType<typeof getAssetSnippets>
  selectedSnippet: string
  onSelectionChange: (value: string) => void
}

export const AssetDetailSnippets = ({
  kind,
  name,
  source,
  weight,
  size,
  color,
  secondaryColor,
  illustrationSvg,
  snippets,
  selectedSnippet,
  onSelectionChange
}: Props) => (
  <Tabs
    selectedKey={selectedSnippet}
    onSelectionChange={key => onSelectionChange(String(key))}
    className="min-w-0">
    <Tabs.ListContainer className="w-fit max-w-full">
      <Tabs.List aria-label="Integration code" className="w-max min-w-0">
        <Tabs.Tab id="svg" className="w-auto flex-none gap-2 whitespace-nowrap">
          <Code size={16} aria-hidden="true" />
          SVG
          <Tabs.Indicator />
        </Tabs.Tab>
        {snippets.map(snippet => (
          <Tabs.Tab
            id={snippet.id}
            key={snippet.id}
            className="w-auto flex-none gap-2 whitespace-nowrap">
            {snippet.logo ? (
              <img
                src={assetUrl('logos', {
                  slug: snippet.logo,
                  variants: {}
                })}
                alt=""
                width={16}
                height={16}
                className="size-4 shrink-0 object-contain"
              />
            ) : (
              <LinkIcon size={16} aria-hidden="true" />
            )}
            {snippet.title}
            <Tabs.Indicator />
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.ListContainer>
    <Tabs.Panel id="svg">
      {kind === 'illustrations' && illustrationSvg ? (
        <Snippet code={illustrationSvg.replace(/></g, '>\n<')} language="xml" />
      ) : (
        <SvgSource
          name={name}
          source={kind === 'icons' ? undefined : source}
          weight={weight}
          size={size}
          color={color}
          secondaryColor={secondaryColor}
        />
      )}
    </Tabs.Panel>
    {snippets.map(snippet => (
      <Tabs.Panel id={snippet.id} key={snippet.id}>
        <Snippet code={snippet.code} language={snippet.language} />
      </Tabs.Panel>
    ))}
  </Tabs>
)
