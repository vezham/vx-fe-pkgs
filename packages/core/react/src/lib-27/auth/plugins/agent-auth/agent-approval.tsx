'use client'

import { useEffect, useMemo, useState } from 'react'

import type {
  AgentApprovalRequest,
  AgentAuthClient
} from '@vezham/auth-ui-core/plugins/agent-auth'
import { agentAuthPlugin } from '@vezham/auth-ui-core/plugins/agent-auth'
import { useAuth, useAuthPlugin, useSession } from '@vezham/auth-ui-react'
import {
  useAgentApproval,
  useApproveAgent,
  useDenyAgent
} from '@vezham/auth-ui-react/plugins/agent-auth'
import {
  CheckRead as Check,
  CheckCircle as CircleCheck,
  CloseCircle as CircleXmark,
  MenuDots as Ellipsis,
  Cpu as FaceRobot,
  Scanner as Fingerprint
} from '@vezham/icons-react'
import {
  Button,
  Card,
  type CardProps,
  Checkbox,
  ScrollShadow,
  Skeleton,
  Spinner,
  cn
} from '@vezham/react-v3'

import { UserAvatar } from '../../user/user-avatar'

type ApprovalResult = 'approved' | 'denied'

export type AgentApprovalProps = {
  className?: string
  variant?: CardProps['variant']
}

/** Render the Agent Auth device-approval page configured on the server. */
export const AgentApproval = ({ className, variant }: AgentApprovalProps) => {
  const { authClient, basePaths, navigate, viewPaths } =
    useAuth<AgentAuthClient>()
  const plugin = useAuthPlugin(agentAuthPlugin)
  const session = useSession(authClient)
  const request = useMemo<AgentApprovalRequest | undefined>(() => {
    if (typeof window === 'undefined') return undefined
    const query = new URLSearchParams(window.location.search)
    const agentId = query.get('agent_id')
    if (!agentId) return undefined
    return {
      agentId,
      approvalId: query.get('approval_id') ?? undefined,
      userCode: query.get('code') ?? query.get('user_code') ?? undefined
    }
  }, [])
  const approval = useAgentApproval(authClient, plugin.adapter, request)
  const approve = useApproveAgent(authClient, plugin.adapter)
  const deny = useDenyAgent(authClient, plugin.adapter)
  const [selection, setSelection] = useState<Set<string> | null>(null)
  const [result, setResult] = useState<ApprovalResult>()

  useEffect(() => {
    if (session.isPending || session.data || typeof window === 'undefined') {
      return
    }
    const returnPath = `${window.location.pathname}${window.location.search}`
    navigate({
      to: `${basePaths.auth}/${viewPaths.auth.signIn}?redirectTo=${encodeURIComponent(returnPath)}`
    })
  }, [
    basePaths.auth,
    navigate,
    session.data,
    session.isPending,
    viewPaths.auth.signIn
  ])

  const requested = approval.data?.requestedCapabilities ?? []
  const selected =
    selection ?? new Set(requested.map(grant => grant.capability))
  const updateSelection = (capability: string, isSelected: boolean) => {
    const next = new Set(selected)
    if (isSelected) next.add(capability)
    else next.delete(capability)
    setSelection(next)
  }
  const decision = {
    ...request,
    agentId: request?.agentId ?? '',
    capabilities: [...selected]
  }
  const denyDecision = {
    ...request,
    agentId: request?.agentId ?? ''
  }

  if (!request) {
    return (
      <Card className={cn('w-full max-w-md', className)} variant={variant}>
        <Card.Content className="text-danger text-sm">
          {plugin.localization.invalidRequest}
        </Card.Content>
      </Card>
    )
  }

  if (result) {
    const approved = result === 'approved'
    return (
      <Card className={cn('w-full max-w-md', className)} variant={variant}>
        <Card.Content className="flex flex-col items-center gap-4 py-8 text-center">
          {approved ? (
            <CircleCheck size={16} className="text-success size-10" />
          ) : (
            <CircleXmark size={16} className="text-muted size-10" />
          )}
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold">
              {approved
                ? plugin.localization.approvedTitle
                : plugin.localization.deniedTitle}
            </h1>
            <p className="text-muted text-sm">
              {approved
                ? plugin.localization.approvedDescription
                : plugin.localization.deniedDescription}
            </p>
          </div>
        </Card.Content>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        'max-h-[calc(100dvh-2rem)] w-full max-w-lg gap-0 overflow-hidden p-0',
        className
      )}
      variant={variant}>
      <ScrollShadow
        className="focus-visible:outline-focus min-h-0 overflow-y-auto overscroll-contain focus-visible:outline-2 focus-visible:-outline-offset-2"
        role="region"
        aria-label={plugin.localization.approvalTitle}
        tabIndex={0}>
        <Card.Header className="flex flex-col items-stretch gap-5 p-6">
          <div className="flex items-center justify-center gap-5">
            <div className="bg-surface-secondary flex size-16 shrink-0 items-center justify-center rounded-full">
              <FaceRobot size={16} aria-hidden="true" className="size-7" />
            </div>
            <Ellipsis
              size={16}
              aria-hidden="true"
              className="text-muted size-5"
            />
            <UserAvatar
              className="size-16"
              user={session.data?.user}
              isPending={session.isPending}
            />
          </div>
          <div className="grid justify-items-center gap-1 text-center">
            <Card.Title className="max-w-full text-xl font-semibold break-words">
              {approval.data ? (
                approval.data.name
              ) : approval.isPending ? (
                <Skeleton className="h-6 w-40" />
              ) : (
                plugin.localization.approvalTitle
              )}
            </Card.Title>
            <Card.Description>
              {plugin.localization.approvalDescription}
            </Card.Description>
            {approval.data ? (
              <p className="text-muted text-sm">
                {approval.data.hostName ?? approval.data.hostId} ·{' '}
                {approval.data.mode === 'autonomous'
                  ? plugin.localization.autonomousAgent
                  : plugin.localization.delegatedAgent}
              </p>
            ) : approval.isPending ? (
              <Skeleton className="h-4 w-48" />
            ) : null}
            <div className="text-muted mt-2 flex max-w-full flex-wrap justify-center gap-x-1 text-sm">
              <span>{plugin.localization.signedInAs}</span>
              {session.data ? (
                <span className="text-foreground font-medium break-all">
                  {session.data.user.name || session.data.user.email}
                </span>
              ) : session.isPending ? (
                <Skeleton className="h-4 w-32" />
              ) : null}
            </div>
          </div>
        </Card.Header>
        <Card.Content className="px-4 pb-6 sm:px-6">
          <div className="bg-surface-secondary grid gap-4 rounded-lg p-5">
            <h2 className="text-sm font-medium">
              {plugin.localization.requestedCapabilities}
            </h2>
            {approval.isError ? (
              <p className="text-danger text-sm">
                {plugin.localization.approvalError}
              </p>
            ) : approval.isPending || session.isPending ? (
              <div className="flex gap-3">
                <Skeleton className="size-4 shrink-0" />
                <div className="grid flex-1 gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ) : requested.length ? (
              <div className="grid gap-5">
                {requested.map(grant => (
                  <div
                    key={grant.capability}
                    className="flex items-start gap-3">
                    <Checkbox
                      isSelected={selected.has(grant.capability)}
                      isDisabled={approve.isPending || deny.isPending}
                      aria-label={grant.capability}
                      onChange={checked =>
                        updateSelection(grant.capability, checked)
                      }>
                      <Checkbox.Content>
                        <Checkbox.Control className="mt-1">
                          <Checkbox.Indicator>
                            <Check size={16} />
                          </Checkbox.Indicator>
                        </Checkbox.Control>
                      </Checkbox.Content>
                    </Checkbox>
                    <div className="grid min-w-0 flex-1 gap-1">
                      <span className="text-base leading-6 break-words">
                        {grant.capability}
                      </span>
                      {grant.description ? (
                        <p className="text-muted text-sm leading-5">
                          {grant.description}
                        </p>
                      ) : null}
                      {grant.reason ? (
                        <p className="text-muted text-sm leading-5">
                          {plugin.localization.requestReason}: {grant.reason}
                        </p>
                      ) : null}
                      {grant.approvalStrength !== 'none' ? (
                        <p className="text-muted flex items-center gap-1.5 text-sm">
                          {grant.approvalStrength === 'webauthn' ? (
                            <>
                              <Fingerprint
                                size={16}
                                aria-hidden="true"
                                className="size-4"
                              />
                              {plugin.localization.approvalWebauthn}
                            </>
                          ) : (
                            plugin.localization.approvalSession
                          )}
                        </p>
                      ) : null}
                      {grant.constraints ? (
                        <details className="text-muted mt-1 text-sm">
                          <summary className="focus-visible:outline-focus w-fit cursor-pointer rounded-sm focus-visible:outline-2">
                            {plugin.localization.constraints}
                          </summary>
                          <pre className="bg-background/50 mt-2 max-w-full overflow-x-auto rounded-md p-3 text-xs">
                            {JSON.stringify(grant.constraints, null, 2)}
                          </pre>
                        </details>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-sm">
                {plugin.localization.noCapabilities}
              </p>
            )}
          </div>
        </Card.Content>
      </ScrollShadow>
      <Card.Footer className="border-separator grid shrink-0 grid-cols-2 gap-3 border-t p-4 sm:p-6">
        <Button
          className="h-11 w-full"
          isDisabled={
            approve.isPending ||
            deny.isPending ||
            !approval.data ||
            !session.data ||
            approval.isFetching ||
            approval.isError
          }
          variant="secondary"
          onPress={() =>
            deny.mutate(denyDecision, { onSuccess: () => setResult('denied') })
          }>
          {deny.isPending && <Spinner color="current" size="sm" />}
          {plugin.localization.deny}
        </Button>
        <Button
          className="h-11 w-full"
          isDisabled={
            approve.isPending ||
            deny.isPending ||
            !selected.size ||
            !approval.data ||
            !session.data ||
            approval.isFetching ||
            approval.isError
          }
          onPress={() =>
            approve.mutate(decision, { onSuccess: () => setResult('approved') })
          }>
          {approve.isPending && <Spinner color="current" size="sm" />}
          {plugin.localization.allow}
        </Button>
      </Card.Footer>
    </Card>
  )
}
