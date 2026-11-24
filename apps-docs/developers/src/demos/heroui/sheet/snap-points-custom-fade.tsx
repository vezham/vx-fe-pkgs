// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { Button, Sheet } from '@vezham/react-v3'

const fadeSnapPoints = ['150px', '300px', '450px']

export function SnapPointsCustomFade() {
  return (
    <Sheet snapPoints={fadeSnapPoints}>
      <Sheet.Trigger>
        <Button variant="secondary">Custom Fade Index</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Backdrop fade</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-muted text-sm">
                The backdrop stays clear through the snap points and fades in
                only after the last detent, as the sheet opens to its full
                height.
              </p>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  )
}
