// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
'use client'

import type { ToastContentValue } from '@vezham/react-v3'
import {
  Button,
  Toast,
  ToastContent,
  ToastDescription,
  ToastIndicator,
  ToastQueue,
  ToastTitle
} from '@vezham/react-v3'

export function CustomToast() {
  const customQueue = new ToastQueue()

  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" queue={customQueue}>
        {({ toast: toastItem }) => {
          const content = toastItem.content as ToastContentValue

          return (
            <Toast
              className="border-border rounded-xl border"
              toast={toastItem}
              variant={content.variant}>
              <ToastContent>
                <div className="flex items-center gap-2">
                  <ToastIndicator
                    className="text-accent-soft-foreground"
                    variant={content.variant}
                  />
                  <div className="flex flex-col pe-6">
                    {content.title ? (
                      <ToastTitle className="text-accent-soft-foreground">
                        {content.title}
                      </ToastTitle>
                    ) : null}
                    {content.description ? (
                      <ToastDescription>{content.description}</ToastDescription>
                    ) : null}
                  </div>
                </div>
              </ToastContent>
              <Toast.CloseButton className="absolute end-2 top-1/2 -translate-y-1/2 border-none bg-transparent opacity-100 [&>svg]:size-4" />
            </Toast>
          )
        }}
      </Toast.Provider>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => {
          customQueue.add({
            description: 'This uses a custom render function',
            title: 'Custom layout toast',
            variant: 'default'
          })
        }}>
        Custom toast
      </Button>
    </div>
  )
}
