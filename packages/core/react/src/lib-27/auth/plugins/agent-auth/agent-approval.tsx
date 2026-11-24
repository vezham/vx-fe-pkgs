'use client'

import { type ComponentProps, useEffect, useMemo, useState } from 'react'

import type {
  AgentApproval as AgentApprovalData,
  AgentApprovalRequest,
  AgentAuthClient,
  AgentAuthLocalization,
  AgentCapabilityGrant
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

import { useBrowserSearch } from '../../lib/use-browser-search'
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
  const search = useBrowserSearch()
  const request = useMemo<AgentApprovalRequest | undefined>(() => {
    if (search === null || !search) return undefined
    const query = new URLSearchParams(search)
    const agentId = query.get('agent_id')
    if (!agentId) return undefined
    return {
      agentId,
      approvalId: query.get('approval_id') ?? undefined,
      userCode: query.get('code') ?? query.get('user_code') ?? undefined
    }
  }, [search])
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
  if (search === null) {
    return (
      <Card className={cn('w-full max-w-md', className)} variant={variant}>
        <Card.Content className="flex justify-center py-8">
          <Spinner aria-label={plugin.localization.approvalTitle} />
        </Card.Content>
      </Card>
    )
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
    return (
      <ApprovalResultCard
        className={className}
        variant={variant}
        result={result}
        localization={plugin.localization}
      />
    )
  }

  return (
    <ApprovalRequestCard
      className={className}
      variant={variant}
      approval={approval.data}
      isApprovalPending={approval.isPending}
      isApprovalError={approval.isError}
      isApprovalFetching={approval.isFetching}
      session={session.data}
      isSessionPending={session.isPending}
      grants={requested}
      selected={selected}
      isApprovePending={approve.isPending}
      isDenyPending={deny.isPending}
      localization={plugin.localization}
      onToggleCapability={updateSelection}
      onApprove={() =>
        approve.mutate(
          { ...request, capabilities: [...selected] },
          { onSuccess: () => setResult('approved') }
        )
      }
      onDeny={() =>
        deny.mutate(request, { onSuccess: () => setResult('denied') })
      }
    />
  )
}

const ApprovalResultCard = ({
  className,
  variant,
  result,
  localization
}: {
  className?: string
  variant?: CardProps['variant']
  result: ApprovalResult
  localization: AgentAuthLocalization
}) => {
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
            {approved ? localization.approvedTitle : localization.deniedTitle}
          </h1>
          <p className="text-muted text-sm">
            {approved
              ? localization.approvedDescription
              : localization.deniedDescription}
          </p>
        </div>
      </Card.Content>
    </Card>
  )
}

type ApprovalSummary = {
  hostId: AgentApprovalData['hostId']
  hostName?: AgentApprovalData['hostName']
  mode: AgentApprovalData['mode']
  name: AgentApprovalData['name']
}

const ApprovalHeader = ({
  approval,
  isApprovalPending,
  isSessionPending,
  localization,
  user,
  userName
}: {
  approval?: ApprovalSummary
  isApprovalPending: boolean
  isSessionPending: boolean
  localization: AgentAuthLocalization
  user?: ComponentProps<typeof UserAvatar>['user']
  userName?: string
}) => (
  <Card.Header className="flex flex-col items-stretch gap-5 p-6">
    <div className="flex items-center justify-center gap-5">
      <div className="bg-surface-secondary flex size-16 shrink-0 items-center justify-center rounded-full">
        <FaceRobot size={16} aria-hidden="true" className="size-7" />
      </div>
      <Ellipsis size={16} aria-hidden="true" className="text-muted size-5" />
      <UserAvatar
        className="size-16"
        user={user}
        isPending={isSessionPending}
      />
    </div>
    <div className="grid justify-items-center gap-1 text-center">
      <Card.Title className="max-w-full text-xl font-semibold break-words">
        {approval ? (
          approval.name
        ) : isApprovalPending ? (
          <Skeleton className="h-6 w-40" />
        ) : (
          localization.approvalTitle
        )}
      </Card.Title>
      <Card.Description>{localization.approvalDescription}</Card.Description>
      {approval ? (
        <p className="text-muted text-sm">
          {approval.hostName ?? approval.hostId} ·{' '}
          {approval.mode === 'autonomous'
            ? localization.autonomousAgent
            : localization.delegatedAgent}
        </p>
      ) : isApprovalPending ? (
        <Skeleton className="h-4 w-48" />
      ) : null}
      <div className="text-muted mt-2 flex max-w-full flex-wrap justify-center gap-x-1 text-sm">
        <span>{localization.signedInAs}</span>
        {userName ? (
          <span className="text-foreground font-medium break-all">
            {userName}
          </span>
        ) : isSessionPending ? (
          <Skeleton className="h-4 w-32" />
        ) : null}
      </div>
    </div>
  </Card.Header>
)

const CapabilityGrantRow = ({
  grant,
  isSelected,
  isDisabled,
  localization,
  onChange
}: {
  grant: AgentCapabilityGrant
  isSelected: boolean
  isDisabled: boolean
  localization: AgentAuthLocalization
  onChange: (selected: boolean) => void
}) => (
  <div className="flex items-start gap-3">
    <Checkbox
      isSelected={isSelected}
      isDisabled={isDisabled}
      aria-label={grant.capability}
      onChange={onChange}>
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
        <p className="text-muted text-sm leading-5">{grant.description}</p>
      ) : null}
      {grant.reason ? (
        <p className="text-muted text-sm leading-5">
          {localization.requestReason}: {grant.reason}
        </p>
      ) : null}
      {grant.approvalStrength !== 'none' ? (
        <p className="text-muted flex items-center gap-1.5 text-sm">
          {grant.approvalStrength === 'webauthn' ? (
            <>
              <Fingerprint size={16} aria-hidden="true" className="size-4" />
              {localization.approvalWebauthn}
            </>
          ) : (
            localization.approvalSession
          )}
        </p>
      ) : null}
      {grant.constraints ? (
        <details className="text-muted mt-1 text-sm">
          <summary className="focus-visible:outline-focus w-fit cursor-pointer rounded-sm focus-visible:outline-2">
            {localization.constraints}
          </summary>
          <pre className="bg-background/50 mt-2 max-w-full overflow-x-auto rounded-md p-3 text-xs">
            {JSON.stringify(grant.constraints, null, 2)}
          </pre>
        </details>
      ) : null}
    </div>
  </div>
)

const ApprovalCapabilities = ({
  grants,
  selected,
  isApprovalError,
  isApprovalPending,
  isSessionPending,
  isMutationPending,
  localization,
  onToggleCapability
}: {
  grants: AgentCapabilityGrant[]
  selected: Set<string>
  isApprovalError: boolean
  isApprovalPending: boolean
  isSessionPending: boolean
  isMutationPending: boolean
  localization: AgentAuthLocalization
  onToggleCapability: (capability: string, selected: boolean) => void
}) => (
  <Card.Content className="px-4 pb-6 sm:px-6">
    <div className="bg-surface-secondary grid gap-4 rounded-lg p-5">
      <h2 className="text-sm font-medium">
        {localization.requestedCapabilities}
      </h2>
      {isApprovalError ? (
        <p className="text-danger text-sm">{localization.approvalError}</p>
      ) : isApprovalPending || isSessionPending ? (
        <div className="flex gap-3">
          <Skeleton className="size-4 shrink-0" />
          <div className="grid flex-1 gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ) : grants.length ? (
        <div className="grid gap-5">
          {grants.map(grant => (
            <CapabilityGrantRow
              key={grant.capability}
              grant={grant}
              isSelected={selected.has(grant.capability)}
              isDisabled={isMutationPending}
              localization={localization}
              onChange={value => onToggleCapability(grant.capability, value)}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted text-sm">{localization.noCapabilities}</p>
      )}
    </div>
  </Card.Content>
)

const ApprovalActions = ({
  isApprovePending,
  isDenyPending,
  isDisabled,
  hasSelection,
  localization,
  onApprove,
  onDeny
}: {
  isApprovePending: boolean
  isDenyPending: boolean
  isDisabled: boolean
  hasSelection: boolean
  localization: AgentAuthLocalization
  onApprove: () => void
  onDeny: () => void
}) => (
  <Card.Footer className="border-separator grid shrink-0 grid-cols-2 gap-3 border-t p-4 sm:p-6">
    <Button
      className="h-11 w-full"
      isDisabled={isDisabled}
      variant="secondary"
      onPress={onDeny}>
      {isDenyPending && <Spinner color="current" size="sm" />}
      {localization.deny}
    </Button>
    <Button
      className="h-11 w-full"
      isDisabled={isDisabled || !hasSelection}
      onPress={onApprove}>
      {isApprovePending && <Spinner color="current" size="sm" />}
      {localization.allow}
    </Button>
  </Card.Footer>
)

const ApprovalRequestCard = ({
  className,
  variant,
  approval,
  isApprovalPending,
  isApprovalError,
  isApprovalFetching,
  session,
  isSessionPending,
  grants,
  selected,
  isApprovePending,
  isDenyPending,
  localization,
  onToggleCapability,
  onApprove,
  onDeny
}: {
  className?: string
  variant?: CardProps['variant']
  approval?: ApprovalSummary
  isApprovalPending: boolean
  isApprovalError: boolean
  isApprovalFetching: boolean
  session?: { user: { name: string; email: string } } | null
  isSessionPending: boolean
  grants: AgentCapabilityGrant[]
  selected: Set<string>
  isApprovePending: boolean
  isDenyPending: boolean
  localization: AgentAuthLocalization
  onToggleCapability: (capability: string, selected: boolean) => void
  onApprove: () => void
  onDeny: () => void
}) => {
  const isDisabled =
    isApprovePending ||
    isDenyPending ||
    !approval ||
    !session ||
    isApprovalFetching ||
    isApprovalError

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
        aria-label={localization.approvalTitle}
        tabIndex={0}>
        <ApprovalHeader
          approval={approval}
          isApprovalPending={isApprovalPending}
          isSessionPending={isSessionPending}
          localization={localization}
          user={session?.user}
          userName={session?.user.name || session?.user.email}
        />
        <ApprovalCapabilities
          grants={grants}
          selected={selected}
          isApprovalError={isApprovalError}
          isApprovalPending={isApprovalPending}
          isSessionPending={isSessionPending}
          isMutationPending={isApprovePending || isDenyPending}
          localization={localization}
          onToggleCapability={onToggleCapability}
        />
      </ScrollShadow>
      <ApprovalActions
        isApprovePending={isApprovePending}
        isDenyPending={isDenyPending}
        isDisabled={isDisabled}
        hasSelection={selected.size > 0}
        localization={localization}
        onApprove={onApprove}
        onDeny={onDeny}
      />
    </Card>
  )
}
