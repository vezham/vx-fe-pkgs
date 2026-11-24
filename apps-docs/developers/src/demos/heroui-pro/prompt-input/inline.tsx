// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { ArrowUp, Paperclip } from '@gravity-ui/icons'
import { useState } from 'react'

import { ChatAttachmentInput, PromptInput } from '@vezham/react-pro-v3'

import { DemoAttachmentPreviews } from './attachments'
import { useDemoAttachments } from './attachments.utils'

export function Inline() {
  const {
    attachments,
    clearAttachments,
    handleFilesSelected,
    removeAttachment
  } = useDemoAttachments()
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    setValue('')
    clearAttachments()
  }

  return (
    <div className="w-full max-w-[640px]">
      <PromptInput
        layout="inline"
        value={value}
        onSubmit={handleSubmit}
        onValueChange={setValue}>
        <ChatAttachmentInput onFilesSelected={handleFilesSelected}>
          <ChatAttachmentInput.Dropzone
            render={dropzoneProps => (
              <PromptInput.Shell {...dropzoneProps}>
                <PromptInput.Content>
                  <DemoAttachmentPreviews
                    attachments={attachments}
                    onRemove={removeAttachment}
                  />
                  <PromptInput.TextArea placeholder="Send follow-up" />
                </PromptInput.Content>
                <PromptInput.Toolbar>
                  <PromptInput.ToolbarStart>
                    <ChatAttachmentInput.Trigger
                      render={triggerProps => (
                        <PromptInput.Action
                          {...triggerProps}
                          aria-label="Attach file"
                          tooltip="Attach file">
                          <Paperclip className="size-4" />
                        </PromptInput.Action>
                      )}
                    />
                  </PromptInput.ToolbarStart>
                  <PromptInput.ToolbarEnd>
                    <PromptInput.Send>
                      <ArrowUp className="size-4" />
                    </PromptInput.Send>
                  </PromptInput.ToolbarEnd>
                </PromptInput.Toolbar>
              </PromptInput.Shell>
            )}
          />
        </ChatAttachmentInput>
        <PromptInput.Footer>
          AI can make mistakes. Check important info.
        </PromptInput.Footer>
      </PromptInput>
    </div>
  )
}
