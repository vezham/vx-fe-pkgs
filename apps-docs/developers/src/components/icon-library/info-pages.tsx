import { useState } from 'react'

import { createMarkdownRenderer } from '@vezham/docs-core/content/md'
import { DocsBody } from '@vezham/docs-react/layouts/notebook/page'
import defaultMdxComponents from '@vezham/docs-react/mdx'
import { useCopyToClipboard } from '@vezham/hooks'
import {
  Book,
  CheckCircle,
  Code,
  Copy,
  Download,
  InfoCircle,
  Palette,
  QuestionCircle
} from '@vezham/icons-react'
import { Markdown as HeroUIMarkdown } from '@vezham/react-pro-v3/markdown'
import {
  Accordion,
  Avatar,
  Button,
  Card,
  Chip,
  Link,
  SearchField,
  Separator,
  Tabs,
  Tooltip
} from '@vezham/react-v3'

import { i18n } from '@app/docs'
import type { Locale } from '@generated/vx'
import { assetUrl } from '@src/lib/icon-library/catalog'
import content from '@src/lib/icon-library/content.json'

import { AssetShell } from './shell'

const { Markdown } = createMarkdownRenderer()

const PackageInstallCommand = ({
  command,
  name
}: {
  command: string
  name: string
}) => {
  const { copy, isCopied, isUnavailable } = useCopyToClipboard()
  const feedback = isUnavailable
    ? 'Unable to copy install command'
    : isCopied
      ? 'Install command copied'
      : ''
  const label = `${feedback || 'Copy install command'} for ${name}`

  return (
    <div className="mt-auto flex min-w-0 items-center gap-2">
      <code className="min-w-0 flex-1 text-sm break-all">{command}</code>
      <Tooltip delay={500}>
        <Button
          aria-label={label}
          className="shrink-0"
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
        <Tooltip.Content>{feedback || 'Copy install command'}</Tooltip.Content>
      </Tooltip>
      <span className="sr-only" role="status">
        {feedback && label}
      </span>
    </div>
  )
}

const PackageLinkAvatar = ({
  logo,
  icon: Icon = Code
}: {
  logo?: string
  icon?: typeof Code
}) => (
  <Avatar className="size-3 rounded-none bg-transparent" aria-hidden="true">
    {logo && (
      <Avatar.Image
        src={assetUrl('logos', { slug: logo, variants: {} })}
        alt=""
        loading="lazy"
        className={`object-contain ${logo === 'github' ? 'invert dark:invert-0' : ''}`}
      />
    )}
    <Avatar.Fallback className="bg-transparent text-inherit">
      <Icon size={12} />
    </Avatar.Fallback>
  </Avatar>
)

export const IconPackages = ({ locale }: { locale: Locale }) => {
  const prefix = locale === i18n.defaultLanguage ? '' : '/' + locale
  return (
    <AssetShell active="packages" locale={locale}>
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Packages and tools
        </h1>
        <p className="text-muted">
          Use the same library in your app, editor, and design workflow.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.packages.map(item => (
          <Card key={item.id} className="min-w-0">
            <Card.Header className="flex-row items-center gap-3">
              <img
                src={assetUrl('logos', { slug: item.logo, variants: {} })}
                alt=""
                width={24}
                height={24}
                loading="lazy"
                className={`size-6 shrink-0 rounded-none object-contain ${item.id === 'mcp' ? 'dark:invert' : ''}`}
              />
              <Card.Title className="min-w-0 break-words">
                {item.name}
              </Card.Title>
            </Card.Header>
            <Card.Content className="gap-4">
              <Card.Description>{item.description}</Card.Description>
              {item.id !== 'figma' && item.id !== 'vscode' && (
                <PackageInstallCommand
                  name={item.name}
                  command={
                    item.id === 'flutter'
                      ? 'flutter pub add vezham_icons'
                      : `pnpm add ${item.name}`
                  }
                />
              )}
            </Card.Content>
            <Card.Footer className="flex-wrap gap-2">
              <Link className="no-underline" href={`${prefix}${item.guideUrl}`}>
                <Chip color="accent" size="sm" variant="soft">
                  <PackageLinkAvatar icon={Book} />
                  <Chip.Label>Guide</Chip.Label>
                </Chip>
              </Link>
              <Link
                className="no-underline"
                href={item.npmUrl}
                target="_blank"
                rel="noopener noreferrer">
                <Chip size="sm" variant="tertiary">
                  <PackageLinkAvatar logo={item.registryLogo} />
                  <Chip.Label>{item.registryLabel}</Chip.Label>
                  <Link.Icon />
                </Chip>
              </Link>
              <Link
                className="no-underline"
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer">
                <Chip size="sm" variant="tertiary">
                  <PackageLinkAvatar logo={item.sourceLogo} />
                  <Chip.Label>Source</Chip.Label>
                  <Link.Icon />
                </Chip>
              </Link>
            </Card.Footer>
          </Card>
        ))}
        <Card className="min-w-0">
          <Card.Header className="flex-row items-center gap-3">
            <img
              src={assetUrl('logos', { slug: 'svg', variants: {} })}
              alt=""
              width={24}
              height={24}
              loading="lazy"
              className="size-6 shrink-0 rounded-none object-contain"
            />
            <Card.Title className="min-w-0 break-words">
              Raw SVG assets
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <Card.Description>
              Use vector files directly without a JavaScript framework or build
              step.
            </Card.Description>
          </Card.Content>
          <Card.Footer className="flex-wrap gap-2">
            <Link
              className="no-underline"
              href={`${prefix}/docs/assets/guides/svg`}>
              <Chip color="accent" size="sm" variant="soft">
                <PackageLinkAvatar icon={Book} />
                <Chip.Label>SVG guide</Chip.Label>
              </Chip>
            </Link>
            <Link
              className="no-underline"
              href="/icon-catalog/vezham-icons.zip"
              target="_blank"
              rel="noopener noreferrer">
              <Chip size="sm" variant="tertiary">
                <PackageLinkAvatar icon={Download} />
                <Chip.Label>Icon archive</Chip.Label>
                <Link.Icon />
              </Chip>
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </AssetShell>
  )
}

const faqGroupIcons: Record<string, typeof InfoCircle> = {
  general: InfoCircle,
  technical: Code,
  design: Palette
}

const FaqQuestions = ({
  items
}: {
  items: (typeof content.faq)[number]['items']
}) => (
  <Accordion allowsMultipleExpanded>
    {items.map(item => (
      <Accordion.Item key={item.id} id={item.id}>
        <Accordion.Heading>
          <Accordion.Trigger>
            {item.question}
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            <DocsBody>
              <Markdown components={defaultMdxComponents}>
                {item.answer}
              </Markdown>
            </DocsBody>
            <Separator />
            <HeroUIMarkdown>{item.answer}</HeroUIMarkdown>
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    ))}
  </Accordion>
)

export const IconFaq = ({ locale }: { locale: Locale }) => {
  const [query, setQuery] = useState('')
  const [activeGroup, setActiveGroup] = useState(content.faq[0]?.id ?? '')
  const q = query.trim().toLowerCase()
  const groups = content.faq
    .map(group => ({
      ...group,
      items: group.items.filter(item =>
        `${item.question} ${item.answer}`.toLowerCase().includes(q)
      )
    }))
    .filter(group => group.items.length)
  const matchCount = groups.reduce(
    (total, group) => total + group.items.length,
    0
  )
  return (
    <AssetShell active="faq" locale={locale}>
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Frequently asked questions
        </h1>
        <p className="text-muted">
          A few useful answers before you get started.
        </p>
      </header>
      <SearchField
        aria-label="Search all FAQ groups"
        value={query}
        onChange={setQuery}
        className="max-w-xl">
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input placeholder="Search a question…" />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
      <div className="max-w-3xl min-w-0">
        {q ? (
          <div className="space-y-8">
            <p className="text-muted text-sm" role="status">
              {groups.length
                ? `${matchCount} matching ${matchCount === 1 ? 'question' : 'questions'} across all groups`
                : 'No questions match your search. Try a different word.'}
            </p>
            {groups.map(group => (
              <section key={group.id} className="space-y-3">
                <h2 className="text-xl font-semibold">{group.title}</h2>
                <FaqQuestions items={group.items} />
              </section>
            ))}
          </div>
        ) : (
          <Tabs
            selectedKey={activeGroup}
            onSelectionChange={key => setActiveGroup(String(key))}>
            <Tabs.ListContainer className="w-fit max-w-full">
              <Tabs.List aria-label="FAQ groups">
                {content.faq.map(group => {
                  const Icon = faqGroupIcons[group.id] ?? QuestionCircle
                  return (
                    <Tabs.Tab key={group.id} id={group.id} className="gap-2">
                      <Icon size={16} aria-hidden="true" />
                      {group.title}
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  )
                })}
              </Tabs.List>
            </Tabs.ListContainer>
            {content.faq.map(group => (
              <Tabs.Panel key={group.id} id={group.id}>
                <FaqQuestions items={group.items} />
              </Tabs.Panel>
            ))}
          </Tabs>
        )}
      </div>
    </AssetShell>
  )
}
