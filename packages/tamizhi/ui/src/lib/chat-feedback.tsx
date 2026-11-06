import { Button, Card } from '@vezham/react-v3'

import type { TamizhiChatProps } from './chat'
import { MODEL_SETUP_MESSAGE } from './models'
import { ResearchSources } from './research-sources'

interface Props {
  chat: TamizhiChatProps['chat']
  speechError: string | null
}

export const ChatFeedback = ({ chat, speechError }: Props) => (
  <>
    {chat.needsProvider && (
      <p role="status" className="text-muted px-4 py-2 text-sm">
        {MODEL_SETUP_MESSAGE}
      </p>
    )}
    {chat.error &&
      !(chat.needsProvider && chat.error === MODEL_SETUP_MESSAGE) && (
        <p role="alert" className="text-danger px-4 py-2 text-sm">
          {chat.error}
        </p>
      )}
    {speechError && (
      <p role="alert" className="text-danger px-4 text-xs">
        {speechError}
      </p>
    )}
    {chat.runEvents.length > 0 && (
      <div
        className="text-muted flex flex-wrap gap-2 px-4 py-1 text-xs"
        role="status">
        {chat.runEvents
          .filter(event => event.type !== 'subagent-event')
          .slice(-3)
          .map(event =>
            event.type === 'client-action' ? (
              <a
                key={event.uiId}
                href={event.output.path}
                className="text-accent underline">
                Open {event.output.path}
              </a>
            ) : (
              <span key={event.uiId}>
                {event.type === 'status' ? event.name : 'Delegated task'}
              </span>
            )
          )}
      </div>
    )}
    {chat.approvals.map(approval => (
      <Card
        key={`${approval.runId}-${approval.callId}`}
        className="mx-4 mb-2"
        variant="secondary">
        <Card.Header>
          <Card.Title>Allow {approval.name}?</Card.Title>
          <Card.Description>
            Review the requested action before continuing.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <pre className="max-h-32 overflow-auto text-xs whitespace-pre-wrap">
            {JSON.stringify(approval.input, null, 2)}
          </pre>
        </Card.Content>
        <Card.Footer className="gap-2">
          <Button
            size="sm"
            variant="secondary"
            onPress={() => void chat.approve(approval, false)}>
            Deny
          </Button>
          <Button
            size="sm"
            variant="primary"
            onPress={() => void chat.approve(approval, true)}>
            Allow
          </Button>
        </Card.Footer>
      </Card>
    ))}
    {chat.activities.length > 0 && (
      <p role="status" className="text-muted truncate px-4 py-1 text-xs">
        {chat.activities.at(-1)?.name} ·{' '}
        {chat.activities.at(-1)?.type === 'tool-result'
          ? 'Complete'
          : 'Running'}
      </p>
    )}
    <ResearchSources activities={chat.activities} />
    <span className="sr-only" role="status">
      {chat.isStreaming
        ? 'Tamizhi is responding.'
        : chat.messages.length
          ? 'Response complete.'
          : 'Ready for a conversation.'}
    </span>
  </>
)
