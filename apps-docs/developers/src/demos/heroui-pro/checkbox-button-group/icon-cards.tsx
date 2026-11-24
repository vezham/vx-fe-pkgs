// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  CircleCheckFill,
  Cloud,
  Lock,
  Megaphone,
  ShieldKeyhole
} from '@gravity-ui/icons'

import { CheckboxButtonGroup } from '@vezham/react-pro-v3'
import { Chip, Description, Label } from '@vezham/react-v3'

const securityFeatures = [
  {
    badge: 'Recommended',
    description: 'Two-factor authentication for all user accounts.',
    icon: <Lock />,
    title: '2FA',
    value: '2fa'
  },
  {
    description: 'Encrypt data at rest and in transit.',
    icon: <ShieldKeyhole />,
    title: 'Encryption',
    value: 'encryption'
  },
  {
    description: 'Automated daily backups to secure cloud storage.',
    icon: <Cloud />,
    title: 'Cloud Backup',
    value: 'cloud-backup'
  },
  {
    description: 'Real-time alerts for incidents and breaches.',
    icon: <Megaphone />,
    title: 'Alert System',
    value: 'alerts'
  }
]

export function IconCards() {
  return (
    <CheckboxButtonGroup
      className="w-[520px]"
      defaultValue={['2fa', 'encryption']}
      name="security-features">
      <Label>Security features</Label>
      {securityFeatures.map(feature => (
        <CheckboxButtonGroup.Item
          key={feature.value}
          className="bg-default"
          value={feature.value}>
          <CheckboxButtonGroup.Indicator>
            <CircleCheckFill />
          </CheckboxButtonGroup.Indicator>
          <CheckboxButtonGroup.ItemContent>
            <div className="flex items-center gap-3">
              <span className="bg-surface shadow-surface flex size-8 items-center justify-center rounded-lg">
                {feature.icon}
              </span>
              <div className="flex gap-2">
                <Label className="text-sm font-semibold">{feature.title}</Label>
                {!!feature.badge && (
                  <Chip color="success" size="sm" variant="soft">
                    <Chip.Label>{feature.badge}</Chip.Label>
                  </Chip>
                )}
              </div>
            </div>
            <Description className="mt-2">{feature.description}</Description>
          </CheckboxButtonGroup.ItemContent>
        </CheckboxButtonGroup.Item>
      ))}
    </CheckboxButtonGroup>
  )
}
