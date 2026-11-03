import Markdown from 'react-markdown'

import { useCopyToClipboard } from '@vezham/hooks'
import {
  BranchingPathsUp,
  CheckRead,
  Copy,
  Refresh,
  VolumeLoud
} from '@vezham/icons-react'
import { ChatMessageActions } from '@vezham/react-pro-v3'
import { Card, Checkbox, Label } from '@vezham/react-v3'
import type { Message } from '@vezham/tamizhi-contracts'

import { Companion } from './companion'
import { IconButton } from './icon-button'
import { TamizhiPluginSlot } from './plugins'

interface Props {
  message: Message
  isStreaming: boolean
  canRetry: boolean
  canBranch: boolean
  isAnimated: boolean
  onSpeak?: (text: string) => void
  onRetry: () => void
  onRate: (messageId: string, rating: 'up' | 'down') => void
  onBranch: (messageId: string) => void
  onToggleTask: (messageId: string, index: number, done: boolean) => void
}

export const ChatMessage = ({
  message,
  isStreaming,
  canRetry,
  canBranch,
  isAnimated,
  onRetry,
  onSpeak,
  onRate,
  onBranch,
  onToggleTask
}: Props) => {
  const { copy, isCopied, isUnavailable } = useCopyToClipboard()
  const copyResponse = () =>
    void copy(
      [
        message.text,
        ...(message.tasks?.map(
          task => `${task.done ? '[x]' : '[ ]'} ${task.label}`
        ) ?? [])
      ].join('\n')
    )

  if (message.role === 'user')
    return (
      <article
        className="tamizhi-message tamizhi-message--user"
        aria-label="Your message">
        <p>{message.text}</p>
        {message.attachments?.map(file => (
          <span key={file.id} className="text-muted mt-1 block text-xs">
            {file.name}
          </span>
        ))}
      </article>
    )

  return (
    <article
      className="tamizhi-message tamizhi-message--assistant"
      aria-label="Tamizhi’s response">
      <div className="tamizhi-message__identity">
        <Companion
          asImage
          size="small"
          previewSize={28}
          persona={message.persona}
          outfit={message.outfit}
          isAnimated={false}
        />
        <span>Tamizhi</span>
      </div>
      <div className="tamizhi-message__body" aria-busy={isStreaming}>
        {message.text ? (
          <Markdown
            components={{
              a: ({ children, ...props }) => (
                <a {...props} target="_blank" rel="noreferrer">
                  {children}
                </a>
              )
            }}>
            {message.text}
          </Markdown>
        ) : (
          <span className="tamizhi-message__thinking">
            A little thought in progress<span aria-hidden="true">...</span>
          </span>
        )}
        {isStreaming && (
          <span
            className="tamizhi-message__cursor"
            data-animated={isAnimated}
            aria-hidden="true"
          />
        )}
      </div>
      {message.tasks && (
        <Card className="tamizhi-message__checklist" variant="secondary">
          <Card.Header>
            <Card.Title>A little plan for today</Card.Title>
            <Card.Description>
              {message.tasks.filter(task => task.done).length} of{' '}
              {message.tasks.length} small steps complete
            </Card.Description>
          </Card.Header>
          <Card.Content className="flex flex-col gap-3">
            {message.tasks.map((task, index) => (
              <Checkbox
                key={task.label}
                isSelected={task.done}
                onChange={done => onToggleTask(message.id, index, done)}>
                <Checkbox.Content>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <Label className={task.done ? 'text-muted line-through' : ''}>
                    {task.label}
                  </Label>
                </Checkbox.Content>
              </Checkbox>
            ))}
          </Card.Content>
        </Card>
      )}
      {!isStreaming && message.text && (
        <div className="tamizhi-message__actions">
          <ChatMessageActions>
            <IconButton
              label={isCopied ? 'Copied' : 'Copy response'}
              size="sm"
              onPress={copyResponse}>
              {isCopied ? (
                <CheckRead size={16} aria-hidden="true" />
              ) : (
                <Copy size={16} aria-hidden="true" />
              )}
            </IconButton>
            <ChatMessageActions.ThumbsUp
              aria-label="Good response"
              tooltip="Good response"
              aria-pressed={message.rating === 'up'}
              onPress={() => onRate(message.id, 'up')}
            />
            <ChatMessageActions.ThumbsDown
              aria-label="Bad response"
              tooltip="Bad response"
              aria-pressed={message.rating === 'down'}
              onPress={() => onRate(message.id, 'down')}
            />
            <IconButton
              label="Branch chat"
              isDisabled={!canBranch}
              size="sm"
              onPress={() => onBranch(message.id)}>
              <BranchingPathsUp size={16} aria-hidden="true" />
            </IconButton>
            {canRetry && (
              <IconButton
                label="Try response again"
                size="sm"
                onPress={onRetry}>
                <Refresh size={16} aria-hidden="true" />
              </IconButton>
            )}
            {onSpeak && (
              <IconButton
                label="Read aloud"
                size="sm"
                onPress={() => onSpeak(message.text)}>
                <VolumeLoud size={16} aria-hidden="true" />
              </IconButton>
            )}
            <TamizhiPluginSlot name="message-actions" message={message} />
          </ChatMessageActions>
          <span role="status">
            {isUnavailable
              ? 'Copy unavailable. Select the text to copy it.'
              : isCopied
                ? 'Copied'
                : ''}
          </span>
        </div>
      )}
    </article>
  )
}
