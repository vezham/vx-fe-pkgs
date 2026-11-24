// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import Cloud from '@gravity-ui/icons/Cloud'
import Database from '@gravity-ui/icons/Database'
import Lock from '@gravity-ui/icons/Lock'
import ShieldKeyhole from '@gravity-ui/icons/ShieldKeyhole'

import { CheckboxButtonGroup } from '@vezham/react-pro-v3'
import { Description, Label } from '@vezham/react-v3'

const permissions = [
  {
    description: 'Create, edit, and delete content',
    title: 'Content Management',
    value: 'content'
  },
  {
    description: 'Manage team members and roles',
    title: 'User Administration',
    value: 'users'
  },
  {
    description: 'View and export reports',
    title: 'Analytics Access',
    value: 'analytics'
  },
  {
    description: 'Configure system preferences',
    title: 'Settings',
    value: 'settings'
  }
]

const iconMap: Record<string, React.ReactNode> = {
  analytics: <Database />,
  content: <Cloud />,
  settings: <Lock />,
  users: <ShieldKeyhole />
}

export function WithIcons() {
  return (
    <CheckboxButtonGroup
      className="w-full max-w-2xl grid-cols-2"
      defaultValue={['content', 'analytics']}
      layout="grid"
      name="permissions"
      variant="secondary">
      <Label className="col-span-full">Role permissions</Label>
      {permissions.map(perm => (
        <CheckboxButtonGroup.Item key={perm.value} value={perm.value}>
          <CheckboxButtonGroup.ItemContent className="flex-row items-center gap-4">
            <CheckboxButtonGroup.ItemIcon>
              {iconMap[perm.value]}
            </CheckboxButtonGroup.ItemIcon>
            <div className="flex flex-col gap-0.5">
              <Label>{perm.title}</Label>
              <Description>{perm.description}</Description>
            </div>
          </CheckboxButtonGroup.ItemContent>
        </CheckboxButtonGroup.Item>
      ))}
    </CheckboxButtonGroup>
  )
}
