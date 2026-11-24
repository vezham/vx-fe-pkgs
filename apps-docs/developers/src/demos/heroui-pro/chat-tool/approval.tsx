// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import type { ReactNode } from 'react'

import { ChatMessage } from '@vezham/react-pro-v3'
import type { ToolPartState } from '@vezham/react-pro-v3/chat-tool'
import { ChatTool, ChatToolGroup } from '@vezham/react-pro-v3/chat-tool'

function AssistantMessage({ children }: { children: ReactNode }) {
  return (
    <ChatMessage.Assistant>
      <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
      <ChatMessage.Body>{children}</ChatMessage.Body>
    </ChatMessage.Assistant>
  )
}

export function Default() {
  return (
    <AssistantMessage>
      <ChatMessage.Content>
        Completed tool call with JSON args and result.
      </ChatMessage.Content>
      <ChatTool
        argsText='{"city":"Paris"}'
        defaultExpanded={false}
        output={{ summary: '18°C, partly cloudy' }}
        state="output-available"
        toolName="getWeather"
        triggerPrefix="Used tool: "
      />
    </AssistantMessage>
  )
}

export function Streaming() {
  return (
    <AssistantMessage>
      <ChatTool
        defaultExpanded
        argsText='{"query":"HeroUI Pro'
        state="input-streaming"
        toolName="searchDocs"
        triggerPrefix="Running tool: "
      />
    </AssistantMessage>
  )
}

export function ErrorState() {
  return (
    <AssistantMessage>
      <ChatTool
        defaultExpanded
        argsText='{"url":"https://example.com"}'
        errorText="Request timed out after 30s"
        state="output-error"
        toolName="fetchPage"
        triggerPrefix="Failed tool: "
      />
    </AssistantMessage>
  )
}

export function Approval() {
  return (
    <AssistantMessage>
      <ChatTool
        defaultExpanded
        approveLabel="Approve"
        argsText='{"to":"team@acme.com","subject":"Launch update"}'
        rejectLabel="Reject"
        state="requires-action"
        toolName="sendEmail"
        triggerPrefix="Approval needed: "
        onApprove={() => undefined}
        onReject={() => undefined}
      />
    </AssistantMessage>
  )
}

export function Composable() {
  return (
    <AssistantMessage>
      <ChatTool
        defaultExpanded={false}
        state="output-available"
        toolName="getWeather">
        <ChatTool.Trigger>
          <ChatTool.StatusIcon />
          Used tool: <strong>getWeather</strong>
        </ChatTool.Trigger>
        <ChatTool.Content>
          <ChatTool.Args input={{ city: 'Paris' }} label="Parameters" />
          <ChatTool.Result
            label="Result"
            value={{ summary: '18°C, partly cloudy' }}
          />
        </ChatTool.Content>
      </ChatTool>
    </AssistantMessage>
  )
}

export function Grouped() {
  const tools: Array<{ state: ToolPartState; toolName: string }> = [
    { state: 'output-available', toolName: 'searchDocs' },
    { state: 'output-available', toolName: 'fetchPage' }
  ]

  return (
    <AssistantMessage>
      <ChatToolGroup defaultExpanded={false}>
        <ChatToolGroup.Trigger>2 tool calls</ChatToolGroup.Trigger>
        <ChatToolGroup.Content>
          {tools.map(tool => (
            <ChatTool
              key={tool.toolName}
              defaultExpanded={false}
              state={tool.state}
              toolName={tool.toolName}
              triggerPrefix="Used tool: "
            />
          ))}
        </ChatToolGroup.Content>
      </ChatToolGroup>
    </AssistantMessage>
  )
}
