// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Alert, Button, CloseButton } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <div className="w-full max-w-xl">
      <Alert
        className="border-warning/20 from-warning/10 via-surface to-surface-secondary dark:border-warning/30 dark:from-warning/15 dark:via-surface dark:to-warning/5 relative overflow-hidden rounded-xl border bg-linear-to-br shadow-sm"
        status="warning">
        <div
          aria-hidden="true"
          className="bg-warning/15 dark:bg-warning/25 pointer-events-none absolute -top-8 -right-8 size-28 rounded-full blur-2xl"
        />
        <Alert.Indicator className="text-warning relative" />
        <Alert.Content className="relative">
          <Alert.Title>Payment method expires soon</Alert.Title>
          <Alert.Description>
            Your Visa ending in 4242 expires on March 28. Update billing to
            avoid interrupting your Pro subscription.
          </Alert.Description>
          <Button className="mt-3 sm:hidden" size="sm" variant="tertiary">
            Update billing
          </Button>
        </Alert.Content>
        <Button
          className="relative hidden shrink-0 sm:inline-flex"
          size="sm"
          variant="tertiary">
          Update billing
        </Button>
        <CloseButton className="relative" />
      </Alert>
    </div>
  )
}
