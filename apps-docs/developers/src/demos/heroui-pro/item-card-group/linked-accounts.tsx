// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Check, Plus } from '@gravity-ui/icons'
import type { ComponentProps } from 'react'

import { ItemCard, ItemCardGroup } from '@vezham/react-pro-v3'
import { Button, Tooltip } from '@vezham/react-v3'

const GoogleIcon = (props: ComponentProps<'svg'>) => (
  <svg
    height="48"
    viewBox="0 0 48 48"
    width="48"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
      fill="#ffc107"
    />
    <path
      d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
      fill="#ff3d00"
    />
    <path
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
      fill="#4caf50"
    />
    <path
      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
      fill="#1976d2"
    />
  </svg>
)

const AppleIcon = (props: ComponentProps<'svg'>) => (
  <svg
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
      fill="currentColor"
    />
  </svg>
)

const GithubIcon = (props: ComponentProps<'svg'>) => (
  <svg
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
      fill="currentColor"
    />
  </svg>
)

const LinkedInIcon = (props: ComponentProps<'svg'>) => (
  <svg
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
      fill="currentColor"
    />
  </svg>
)

const NotionIcon = (props: ComponentProps<'svg'>) => (
  <svg
    height="640"
    viewBox="0 0 640 640"
    width="640"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M158.9 164.2c14.9 12.1 20.5 11.2 48.6 9.3l264.3-15.9c5.6 0 .9-5.6-.9-6.5l-44-31.7c-8.4-6.5-19.6-14-41.1-12.1l-255.9 18.6c-9.3.9-11.2 5.6-7.5 9.3l36.4 28.9zm15.9 61.6v278.1c0 14.9 7.5 20.5 24.3 19.6l290.5-16.8c16.8-.9 18.7-11.2 18.7-23.3V207.2c0-12.1-4.7-18.7-15-17.7l-303.6 17.6c-11.2.9-14.9 6.5-14.9 18.7m286.7 14.9c1.9 8.4 0 16.8-8.4 17.8l-14 2.8v205.3c-12.2 6.5-23.4 10.3-32.7 10.3c-15 0-18.7-4.7-29.9-18.7L285 314.5v139l29 6.5s0 16.8-23.4 16.8l-64.4 3.7c-1.9-3.7 0-13.1 6.5-14.9l16.8-4.7V277.1l-23.3-1.9c-1.9-8.4 2.8-20.5 15.9-21.5l69.1-4.7l95.3 145.6V265.8l-24.3-2.8c-1.9-10.3 5.6-17.7 14.9-18.7l64.5-3.8zm-353.1-140l266.2-19.6c32.7-2.8 41.1-.9 61.6 14l85 59.7c14 10.3 18.7 13.1 18.7 24.3v327.6c0 20.5-7.5 32.7-33.6 34.5l-309.1 18.6c-19.6.9-29-1.9-39.2-14.9l-62.6-81.2c-11.2-14.9-15.9-26.1-15.9-39.2V133.3c0-16.8 7.5-30.8 28.9-32.7z"
      fill="currentColor"
    />
  </svg>
)

const accounts = [
  {
    connected: true,
    description: 'junior@heroui.com',
    icon: <GoogleIcon />,
    name: 'Google'
  },
  {
    connected: false,
    description: 'Not Linked',
    icon: <AppleIcon />,
    name: 'Apple'
  },
  {
    connected: false,
    description: 'Not Linked',
    icon: <GithubIcon />,
    name: 'Github'
  },
  {
    connected: true,
    description: 'Account Linked',
    icon: <LinkedInIcon />,
    name: 'LinkedIn'
  },
  {
    connected: false,
    description: 'Not Linked',
    icon: <NotionIcon />,
    name: 'Notion'
  }
]

export function LinkedAccounts() {
  return (
    <ItemCardGroup columns={3} layout="grid">
      {accounts.map(account => (
        <ItemCard key={account.name}>
          <ItemCard.Icon className="bg-default text-foreground">
            <span className="text-sm font-bold">{account.icon}</span>
          </ItemCard.Icon>
          <ItemCard.Content>
            <ItemCard.Title>{account.name}</ItemCard.Title>
            <ItemCard.Description>{account.description}</ItemCard.Description>
          </ItemCard.Content>
          <ItemCard.Action>
            {account.connected ? (
              <Check className="text-success size-5" />
            ) : (
              <Tooltip delay={0}>
                <Tooltip.Trigger>
                  <Button
                    isIconOnly
                    aria-label={`Link ${account.name}`}
                    size="sm"
                    variant="secondary">
                    <Plus className="size-4" />
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>Link {account.name}</Tooltip.Content>
              </Tooltip>
            )}
          </ItemCard.Action>
        </ItemCard>
      ))}
    </ItemCardGroup>
  )
}
