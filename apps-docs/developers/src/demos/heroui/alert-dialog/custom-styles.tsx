// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { AlertDialog, Button } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <AlertDialog>
      <Button variant="secondary">Sign out</Button>
      <AlertDialog.Backdrop
        className="bg-overlay/50 dark:bg-overlay/60"
        variant="blur">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="border-border/80 bg-surface ring-accent/10 dark:border-border/90 dark:bg-surface dark:ring-accent/15 relative overflow-hidden border shadow-2xl ring-1 sm:max-w-[400px]">
            <div
              aria-hidden="true"
              className="from-accent/6 dark:from-accent/10 pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b to-transparent"
            />
            <div
              aria-hidden="true"
              className="via-accent/35 dark:via-accent/45 pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent to-transparent"
            />
            <AlertDialog.Header className="relative">
              <AlertDialog.Icon status="accent" />
              <AlertDialog.Heading>
                Sign out of your account?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="relative">
              <p className="text-muted">
                You will be signed out on this device. Unsaved work in{' '}
                <strong className="text-foreground">Acme Workspace</strong> may
                be lost unless it was saved to the cloud.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Stay signed in
              </Button>
              <Button slot="close">Sign out</Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  )
}
