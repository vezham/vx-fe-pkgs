import { useParams } from '@tanstack/react-router'

import { LinkSquare } from '@vezham/icons-react'
import { Link, buttonVariants } from '@vezham/react-v3'

import type { UiLibrary } from '@config/ui-libraries'
import {
  type ComponentLinks as Links,
  getComponentResources
} from '@src/lib/docs/component-resources'

import {
  FigmaIcon,
  GithubIcon,
  HeroUIIcon,
  RadixUIIcon,
  ReactAriaIcon,
  StorybookIcon,
  TailwindIcon
} from './icons'

const icons = {
  figma: FigmaIcon,
  github: GithubIcon,
  radix: RadixUIIcon,
  rac: ReactAriaIcon,
  storybook: StorybookIcon,
  tailwind: TailwindIcon,
  heroui: HeroUIIcon,
  external: LinkSquare
}

export const ComponentLinks = ({
  links,
  sourceUrl,
  library
}: {
  links?: Links
  sourceUrl?: string
  library: UiLibrary
}) => {
  const { platform, _splat } = useParams({ strict: false })
  const resources: { label: string; icon: keyof typeof icons; href: string }[] =
    getComponentResources(links)
  if (!resources.length && !sourceUrl) return null
  if (library === 'react') {
    if (sourceUrl)
      resources.push({ label: 'Reference', icon: 'external', href: sourceUrl })
  } else {
    const pro = library === 'react-pro-v3'
    const site = pro ? 'https://heroui.pro' : 'https://heroui.com'
    resources.push({
      label: pro ? 'HeroUI Pro' : 'HeroUI',
      icon: 'heroui',
      href:
        sourceUrl ??
        `${site}/docs/${platform === 'native' ? 'native' : 'react'}/${_splat ?? ''}`
    })
  }
  return (
    <nav
      aria-label="Component resources"
      className="platform-docs__resources not-prose mb-4 flex flex-wrap gap-2">
      {resources.map(resource => {
        const Icon = icons[resource.icon]
        return (
          <Link
            key={resource.href}
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: 'tertiary',
              size: 'sm',
              className:
                'text-foreground h-8 gap-1.5 rounded-full px-3 text-sm font-normal no-underline'
            })}>
            <Icon
              aria-hidden="true"
              focusable="false"
              className={`size-4 shrink-0 ${resource.icon === 'storybook' ? 'text-[#ff4785]' : resource.icon === 'rac' ? 'text-[#6733ff]' : resource.icon === 'tailwind' ? 'text-[#38bdf8]' : ''}`}
            />
            {resource.label}
          </Link>
        )
      })}
    </nav>
  )
}
