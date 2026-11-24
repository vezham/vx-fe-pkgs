// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import { TrashBin } from '@gravity-ui/icons'

import { AlertDialog, Button } from '@vezham/react-v3'

export function CustomTrigger() {
  return (
    <AlertDialog>
      <AlertDialog.Trigger className="group bg-surface hover:bg-surface-secondary flex items-center gap-3 rounded-2xl p-4 shadow-xs select-none">
        <div className="bg-danger-soft text-danger-soft-foreground flex size-12 shrink-0 items-center justify-center rounded-xl">
          <TrashBin className="size-6" />
        </div>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-sm font-semibold">Delete Item</p>
          <p className="text-muted text-xs">Permanently remove this item</p>
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger">
                <TrashBin className="size-5" />
              </AlertDialog.Icon>
              <AlertDialog.Heading>Delete this item?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Use <code>AlertDialog.Trigger</code> to create custom trigger
                elements beyond standard buttons. This example shows a
                card-style trigger with icons and descriptive text.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger">
                Delete Item
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  )
}
