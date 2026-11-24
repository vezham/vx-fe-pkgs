// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  Ellipsis,
  Envelope,
  Gear,
  Globe,
  Plus,
  TrashBin
} from '@gravity-ui/icons'

import { PressableFeedback } from '@vezham/react-pro-v3'
import { Button } from '@vezham/react-v3'

export function Default() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <Button>
          <PressableFeedback.Ripple />
          Primary
        </Button>
        <Button variant="secondary">
          <PressableFeedback.Ripple />
          Secondary
        </Button>
        <Button variant="tertiary">
          <PressableFeedback.Ripple />
          Tertiary
        </Button>
        <Button variant="outline">
          <PressableFeedback.Ripple />
          Outline
        </Button>
        <Button variant="ghost">
          <PressableFeedback.Ripple />
          Ghost
        </Button>
        <Button variant="danger">
          <PressableFeedback.Ripple />
          Danger
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button>
          <PressableFeedback.Ripple />
          <Globe />
          Search
        </Button>
        <Button variant="secondary">
          <PressableFeedback.Ripple />
          <Plus />
          Add Member
        </Button>
        <Button variant="tertiary">
          <PressableFeedback.Ripple />
          <Envelope />
          Email
        </Button>
        <Button variant="danger">
          <PressableFeedback.Ripple />
          <TrashBin />
          Delete
        </Button>
      </div>

      <div className="flex gap-3">
        <Button isIconOnly variant="tertiary">
          <PressableFeedback.Ripple />
          <Ellipsis />
        </Button>
        <Button isIconOnly variant="secondary">
          <PressableFeedback.Ripple />
          <Gear />
        </Button>
        <Button isIconOnly variant="danger">
          <PressableFeedback.Ripple />
          <TrashBin />
        </Button>
      </div>
    </div>
  )
}
