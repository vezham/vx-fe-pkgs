// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { Copy, Paperclip, Pencil, TrashBin } from '@gravity-ui/icons'
import { useState } from 'react'

import { PromptInput } from '@vezham/react-pro-v3'
import { Dropdown, Label } from '@vezham/react-v3'

import { DemoAttachmentPreviews } from './attachments'
import type { PendingAttachment } from './attachments.utils'
import { useDemoAttachments } from './attachments.utils'

const SAMPLE_ATTACHMENTS: PendingAttachment[] = [
  {
    id: 'attachment-1',
    mimeType: 'image/png',
    name: 'hero.png',
    src: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo/hero.png'
  },
  {
    id: 'attachment-2',
    mimeType: 'image/jpeg',
    name: 'dashboard.jpg',
    src: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo/dashboard.jpg'
  },
  {
    id: 'attachment-3',
    mimeType: 'application/pdf',
    name: 'brief.pdf'
  }
]

const SAMPLE_QUEUE = [
  {
    attachments: SAMPLE_ATTACHMENTS.slice(0, 2),
    id: 'queue-1',
    text: 'Review the attached mockups before implementing the landing page updates.'
  },
  {
    attachments: [...SAMPLE_ATTACHMENTS],
    id: 'queue-2',
    text: 'Add dark mode support to the settings page.'
  },
  {
    id: 'queue-3',
    text: 'Refactor the queue item layout to match Codex.'
  },
  {
    attachments: SAMPLE_ATTACHMENTS.slice(0, 1),
    id: 'queue-4',
    text: ''
  }
]

type QueueDemoItem = {
  attachments?: PendingAttachment[]
  id: string
  text: string
}

function getQueueItemPreview(item: QueueDemoItem) {
  if (item.text.trim()) return item.text
  if (item.attachments?.length) {
    const count = item.attachments.length

    return `${count} attachment${count === 1 ? '' : 's'}`
  }

  return ''
}

function QueueItemMoreMenu({
  item,
  onDuplicate,
  onEdit,
  onRemove
}: {
  item: QueueDemoItem
  onDuplicate: (id: string) => void
  onEdit: (id: string) => void
  onRemove: (id: string) => void
}) {
  return (
    <Dropdown>
      <PromptInput.Queue.Item.More aria-label="More queue actions" />
      <Dropdown.Popover className="w-44" offset={6} placement="bottom end">
        <Dropdown.Menu
          aria-label="Queued prompt actions"
          onAction={key => {
            if (key === 'edit') onEdit(item.id)
            if (key === 'duplicate') onDuplicate(item.id)
            if (key === 'remove') onRemove(item.id)
          }}>
          <Dropdown.Item id="edit" textValue="Edit prompt">
            <Pencil className="text-muted size-4 shrink-0" />
            <Label>Edit prompt</Label>
          </Dropdown.Item>
          <Dropdown.Item id="duplicate" textValue="Duplicate">
            <Copy className="text-muted size-4 shrink-0" />
            <Label>Duplicate</Label>
          </Dropdown.Item>
          <Dropdown.Item
            id="remove"
            textValue="Remove from queue"
            variant="danger">
            <TrashBin className="text-danger size-4 shrink-0" />
            <Label>Remove from queue</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

export function Queue() {
  const [value, setValue] = useState('')
  const [items, setItems] = useState<QueueDemoItem[]>(() =>
    SAMPLE_QUEUE.map(item => ({
      ...item,
      attachments: item.attachments?.map(attachment => ({ ...attachment }))
    }))
  )
  const {
    attachments,
    clearAttachments,
    removeAttachment,
    replaceAttachments
  } = useDemoAttachments()

  const handleSubmit = () => {
    const text = value.trim()

    if (!text && attachments.length === 0) return

    setItems(current => [
      ...current,
      {
        attachments: attachments.length
          ? attachments.map(attachment => ({ ...attachment }))
          : undefined,
        id: crypto.randomUUID(),
        text
      }
    ])
    setValue('')
    clearAttachments()
  }

  const removeItem = (id: string) => {
    setItems(current => current.filter(entry => entry.id !== id))
  }

  const duplicateItem = (id: string) => {
    setItems(current => {
      const index = current.findIndex(entry => entry.id === id)
      const item = current[index]

      if (!item) return current

      const duplicate: QueueDemoItem = {
        attachments: item.attachments?.map(attachment => ({ ...attachment })),
        id: crypto.randomUUID(),
        text: item.text
      }

      return [
        ...current.slice(0, index + 1),
        duplicate,
        ...current.slice(index + 1)
      ]
    })
  }

  const editItem = (id: string) => {
    const item = items.find(entry => entry.id === id)

    if (!item) return

    setValue(item.text)
    replaceAttachments(item.attachments ?? [])
    removeItem(id)
  }

  return (
    <div className="w-full max-w-[640px]">
      <PromptInput
        value={value}
        onSubmit={handleSubmit}
        onValueChange={setValue}>
        {items.length ? (
          <PromptInput.Queue>
            <PromptInput.Queue.List values={items} onReorder={setItems}>
              {items.map(item => (
                <PromptInput.Queue.Item key={item.id} value={item}>
                  <PromptInput.Queue.Item.Handle aria-label="Reorder queued prompt" />
                  <PromptInput.Queue.Item.Body>
                    <PromptInput.Queue.Item.Icon />
                    <PromptInput.Queue.Item.Content>
                      {getQueueItemPreview(item)}
                    </PromptInput.Queue.Item.Content>
                  </PromptInput.Queue.Item.Body>
                  <PromptInput.Queue.Item.Actions>
                    <PromptInput.Queue.Item.Remove
                      aria-label="Remove queued prompt"
                      onPress={() => removeItem(item.id)}
                    />
                    <QueueItemMoreMenu
                      item={item}
                      onDuplicate={duplicateItem}
                      onEdit={editItem}
                      onRemove={removeItem}
                    />
                  </PromptInput.Queue.Item.Actions>
                </PromptInput.Queue.Item>
              ))}
            </PromptInput.Queue.List>
          </PromptInput.Queue>
        ) : null}

        <PromptInput.Shell>
          <PromptInput.Content>
            <DemoAttachmentPreviews
              attachments={attachments}
              onRemove={removeAttachment}
            />
            <PromptInput.TextArea placeholder="Ask for follow-up changes" />
          </PromptInput.Content>

          <PromptInput.Toolbar>
            <PromptInput.ToolbarStart>
              <PromptInput.Action
                aria-label="Add attachment"
                tooltip="Add attachment">
                <Paperclip className="size-4" />
              </PromptInput.Action>
            </PromptInput.ToolbarStart>
            <PromptInput.ToolbarEnd>
              <PromptInput.Send />
            </PromptInput.ToolbarEnd>
          </PromptInput.Toolbar>
        </PromptInput.Shell>
      </PromptInput>
    </div>
  )
}
