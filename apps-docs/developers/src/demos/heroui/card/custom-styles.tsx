// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Check, Star } from '@gravity-ui/icons'

import { Button, Card } from '@vezham/react-v3'

const PRO_FEATURES = [
  'Unlimited projects and collaborators',
  'Priority support with 24h response',
  'Advanced analytics and exports'
] as const

export function CustomStyles() {
  return (
    <Card className="border-accent/20 from-accent/12 via-surface to-surface-secondary shadow-accent/10 dark:border-accent/30 dark:from-accent/20 dark:via-surface dark:to-accent/8 dark:shadow-accent/5 relative w-full max-w-md overflow-hidden border bg-linear-to-br shadow-lg">
      <div
        aria-hidden="true"
        className="bg-accent/20 dark:bg-accent/30 pointer-events-none absolute -top-12 -right-12 size-40 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-accent/10 dark:bg-accent/20 pointer-events-none absolute -bottom-8 -left-8 size-28 rounded-full blur-2xl"
      />

      <Card.Header className="relative gap-3">
        <span className="bg-accent/15 text-accent dark:bg-accent/25 dark:text-accent-soft-foreground w-fit rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide">
          Recommended
        </span>
        <div className="flex items-start gap-3">
          <div className="bg-accent/15 text-accent dark:bg-accent/20 dark:text-accent-soft-foreground flex size-10 shrink-0 items-center justify-center rounded-xl">
            <Star aria-hidden="true" className="size-5" />
          </div>
          <div className="flex flex-col gap-1">
            <Card.Title>Upgrade to Pro</Card.Title>
            <Card.Description>
              Unlock team workflows and insights built for growing products.
            </Card.Description>
          </div>
        </div>
      </Card.Header>

      <Card.Content className="relative">
        <ul className="flex flex-col gap-2">
          {PRO_FEATURES.map(feature => (
            <li
              key={feature}
              className="text-muted flex items-center gap-2 text-sm">
              <Check
                aria-hidden="true"
                className="text-accent size-4 shrink-0"
              />
              {feature}
            </li>
          ))}
        </ul>
      </Card.Content>

      <Card.Footer className="relative flex-col gap-2 sm:flex-row">
        <Button className="shadow-accent/20 w-full shadow-md">
          Upgrade now
        </Button>
        <Button className="w-full" variant="secondary">
          Compare plans
        </Button>
      </Card.Footer>
    </Card>
  )
}
