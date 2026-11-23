import { type ReactNode, useState } from 'react'

import type {
  ListedUserTeam,
  OrganizationTeamsAuthClient
} from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import {
  useListUserTeams,
  useSetActiveTeam
} from '@vezham/auth-ui-react/plugins/organization'
import {
  CheckRead as Check,
  SortVertical as ChevronsExpandVertical,
  UsersGroupRounded as Persons
} from '@vezham/icons-react'
import {
  Button,
  type ButtonProps,
  Dropdown,
  type DropdownPopoverProps,
  Label,
  Skeleton,
  cn
} from '@vezham/react-v3'

export type TeamSwitcherProps = {
  organizationId: string
  teamId?: string | null
  onTeamChange?: (team: ListedUserTeam | null) => void
  syncSession?: boolean
  allowClear?: boolean
  className?: string
  placement?: DropdownPopoverProps['placement']
  trigger?: ReactNode
}

export const TeamSwitcher = ({
  organizationId,
  teamId,
  onTeamChange,
  syncSession = false,
  allowClear = true,
  className,
  placement,
  trigger,
  variant = 'outline',
  ...props
}: TeamSwitcherProps & ButtonProps) => {
  const { authClient } = useAuth<OrganizationTeamsAuthClient>()
  const { localization } = useAuthPlugin(organizationPlugin)
  const [open, setOpen] = useState(false)
  const teams = useListUserTeams(authClient, {
    query: { organizationId }
  })
  const setActiveTeam = useSetActiveTeam(authClient)
  const selectedTeam = teams.data?.find(team => team.id === teamId)

  const selectTeam = (team: ListedUserTeam | null) => {
    onTeamChange?.(team)
    setOpen(false)

    if (syncSession) {
      setActiveTeam.mutate({ organizationId, teamId: team?.id ?? null })
    }
  }

  return (
    <Dropdown isOpen={open} onOpenChange={setOpen}>
      {trigger ? (
        <Dropdown.Trigger>{trigger}</Dropdown.Trigger>
      ) : (
        <Button
          variant={variant}
          className={cn('justify-between gap-3', className)}
          isDisabled={teams.isPending || setActiveTeam.isPending}
          {...props}>
          <span className="flex min-w-0 items-center gap-2">
            <Persons size={16} className="text-muted size-4 shrink-0" />
            {teams.isPending ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <Label className="truncate">
                {selectedTeam?.name ?? localization.selectTeam}
              </Label>
            )}
          </span>
          <ChevronsExpandVertical
            size={16}
            className="text-muted size-3 shrink-0"
          />
        </Button>
      )}
      <Dropdown.Popover placement={placement}>
        <Dropdown.Menu>
          {allowClear && (
            <Dropdown.Item
              textValue={localization.allTeams}
              onPress={() => selectTeam(null)}>
              <Label className="min-w-0 flex-1 truncate">
                {localization.allTeams}
              </Label>
              {!teamId && <Check size={16} className="size-4" />}
            </Dropdown.Item>
          )}
          {teams.data?.map(team => (
            <Dropdown.Item
              key={team.id}
              textValue={team.name}
              onPress={() => selectTeam(team)}>
              <Label className="min-w-0 flex-1 truncate">{team.name}</Label>
              {team.id === teamId && <Check size={16} className="size-4" />}
            </Dropdown.Item>
          ))}
          {!teams.isPending && teams.data?.length === 0 && (
            <Dropdown.Item isDisabled textValue={localization.noTeams}>
              <Label className="text-muted">{localization.noTeams}</Label>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
