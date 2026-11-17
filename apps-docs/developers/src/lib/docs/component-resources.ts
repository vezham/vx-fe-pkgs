import { z } from 'zod'

export const componentLinksSchema = z.object({
  figma: z.boolean().optional(),
  storybook: z.string().optional(),
  rac: z.string().optional(),
  radix: z.string().optional(),
  source: z.string().optional(),
  source_native: z.string().optional(),
  styles: z.string().optional(),
  styles_native: z.string().optional(),
  themes: z.boolean().optional(),
  tailwind: z.string().optional()
})

export type ComponentLinks = z.infer<typeof componentLinksSchema>
type Resource = {
  label: string
  href: string
  icon: 'figma' | 'storybook' | 'rac' | 'radix' | 'github' | 'tailwind'
}

const webRepo = 'https://github.com/heroui-inc/heroui/tree/v3'
const nativeRepo = 'https://github.com/heroui-inc/heroui-native'
const href = (path: string | undefined, base: string) =>
  path ? new URL(path, `${base}/`).href : undefined

export const getComponentResources = (links?: ComponentLinks): Resource[] => {
  if (!links) return []
  const story = links.storybook
  const storyPath = story?.includes('/')
    ? story
        .split('/')
        .map(part =>
          part
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
        )
        .filter(Boolean)
        .join('-')
    : `components-${story}`
  const resources: (Omit<Resource, 'href'> & { href?: string })[] = [
    {
      label: 'Figma',
      icon: 'figma',
      href: links.figma
        ? 'https://www.figma.com/community/file/1546526812159103429'
        : undefined
    },
    {
      label: 'Storybook',
      icon: 'storybook',
      href: story
        ? `https://storybook-v3.heroui.com/?path=/docs/${storyPath}--docs`
        : undefined
    },
    {
      label: 'React Aria',
      icon: 'rac',
      href: href(links.rac, 'https://react-aria.adobe.com')
    },
    {
      label: 'Radix UI',
      icon: 'radix',
      href: href(
        links.radix,
        'https://www.radix-ui.com/primitives/docs/components'
      )
    },
    {
      label: 'Source',
      icon: 'github',
      href: href(links.source, `${webRepo}/packages/react/src/components`)
    },
    {
      label: 'Source',
      icon: 'github',
      href: href(links.source_native, `${nativeRepo}/tree/main/src/components`)
    },
    {
      label: 'Styles source',
      icon: 'github',
      href: href(links.styles, `${webRepo}/packages/styles/components`)
    },
    {
      label: 'Styles source',
      icon: 'github',
      href: href(links.styles_native, `${nativeRepo}/blob/main/src/components`)
    },
    {
      label: 'Theme source',
      icon: 'github',
      href: links.themes ? `${webRepo}/packages/styles/themes` : undefined
    },
    {
      label: 'Tailwind CSS',
      icon: 'tailwind',
      href: href(links.tailwind, 'https://tailwindcss.com/docs')
    }
  ]
  return resources.filter((resource): resource is Resource =>
    Boolean(resource.href)
  )
}
