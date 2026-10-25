import { type ReactNode, useState } from 'react'

import {
  AltArrowLeft,
  AltArrowRight,
  Bell,
  CheckRead,
  Logout2 as LogoutIcon,
  Settings as SettingsIcon,
  VezhamTamizhi
} from '@vezham/icons-react'
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Separator,
  Tooltip,
  useMediaQuery
} from '@vezham/react-v3'

import { MenuSheet } from '../../menu/sheet'
import {
  ACCOUNT_BUBBLE_MEDIA_QUERY,
  APPLICATION_MENU_SHEET_MEDIA_QUERY
} from '../responsive'
import {
  DEFAULT_STATUS_OPTION,
  STATUS_OPTIONS,
  STATUS_TIMING_OPTIONS,
  SUGGESTED_STATUS_OPTIONS,
  isColorStatus
} from './data'
import type {
  StatusTimingOption,
  SuggestedStatusOption,
  UserInfo,
  UserStatus,
  UserStatusOption
} from './types'

type Props = {
  user: UserInfo
  onLogout: () => void
  onProfile?: () => void
  onPreferences?: () => void
  showAI?: boolean
  showControlCenter?: boolean
  showNotifications?: boolean
  notificationCount?: number
  onAI?: () => void
  onControlCenter?: () => void
  onNotifications?: () => void
}

type AccountSection = {
  id: string
  title: string
  label: string
  selected?: string
  options: { id: string; label: string; visual?: ReactNode }[]
  onSelect: (key: string) => void
}

type AccountAction = {
  label: string
  icon: ReactNode
  onPress?: () => void
}

const StatusVisual = ({ status }: { status: UserStatusOption }) => {
  if (isColorStatus(status.id)) {
    return <span className={`h-2 w-2 rounded-full ${status.color ?? ''}`} />
  }

  return <span className="text-xs">{status.icon}</span>
}

const useAccountSections = (user: UserInfo) => {
  const [userStatus, setUserStatus] = useState<UserStatus>('active')
  const [selectedStatus, setSelectedStatus] = useState<SuggestedStatusOption>()
  const [selectedTiming, setSelectedTiming] = useState<StatusTimingOption>()

  const currentStatus =
    STATUS_OPTIONS.find(status => status.id === userStatus) ??
    DEFAULT_STATUS_OPTION

  const tooltipText = selectedStatus
    ? `${selectedStatus.emoji} ${selectedStatus.label}${
        selectedTiming ? ` • ${selectedTiming.label}` : ''
      }`
    : `${user.name} - ${currentStatus.icon} ${currentStatus.label}`

  const accountSections: AccountSection[] = [
    {
      id: 'availability',
      title: 'Availability',
      label: currentStatus.label,
      selected: userStatus,
      options: STATUS_OPTIONS.map(status => ({
        id: status.id,
        label: status.label,
        visual: <StatusVisual status={status} />
      })),
      onSelect: key => {
        const status = STATUS_OPTIONS.find(option => option.id === key)
        if (status) setUserStatus(status.id)
      }
    },
    {
      id: 'custom-status',
      title: 'Custom status',
      label: selectedStatus
        ? `${selectedStatus.emoji} ${selectedStatus.label}`
        : 'Update your status',
      selected: selectedStatus?.id,
      options: [
        ...SUGGESTED_STATUS_OPTIONS.map(status => ({
          id: status.id,
          label: `${status.emoji} ${status.label}`
        })),
        { id: 'clear', label: 'Clear status' }
      ],
      onSelect: key => {
        if (key === 'clear') {
          setSelectedStatus(undefined)
          setSelectedTiming(undefined)
          return
        }
        const status = SUGGESTED_STATUS_OPTIONS.find(
          option => option.id === key
        )
        if (status) {
          setSelectedStatus(status)
          setSelectedTiming(STATUS_TIMING_OPTIONS[0])
        }
      }
    },
    ...(selectedStatus
      ? [
          {
            id: 'duration',
            title: 'Status duration',
            label: selectedTiming?.label ?? 'Select duration',
            selected: selectedTiming?.id,
            options: STATUS_TIMING_OPTIONS.map(timing => ({
              id: timing.id,
              label: timing.label
            })),
            onSelect: (key: string) => {
              const timing = STATUS_TIMING_OPTIONS.find(
                option => option.id === key
              )
              if (timing) setSelectedTiming(timing)
            }
          }
        ]
      : [])
  ]
  return { currentStatus, tooltipText, accountSections }
}

const AccountActions = ({ actions }: { actions: AccountAction[] }) => {
  if (actions.length === 0) return null

  return (
    <div
      className="flex items-center justify-center gap-2"
      role="group"
      aria-label="Account actions">
      {actions.map(action => (
        <Tooltip key={action.label} delay={0}>
          <Tooltip.Trigger>
            <Button
              aria-label={action.label}
              isIconOnly
              size="lg"
              variant="ghost"
              onPress={action.onPress}>
              {action.icon}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content placement="top">{action.label}</Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  )
}

const AccountIdentity = ({
  user,
  currentStatus
}: {
  user: UserInfo
  currentStatus: UserStatusOption
}) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <Badge.Anchor>
      <Avatar className="size-20">
        {user.avatar ? (
          <Avatar.Image src={user.avatar} alt={user.name} />
        ) : null}
        <Avatar.Fallback className="text-xl">{user.name?.[0]}</Avatar.Fallback>
      </Avatar>
      <Badge
        placement="bottom-right"
        size="sm"
        className="border-surface flex items-center justify-center border-2">
        <StatusVisual status={currentStatus} />
      </Badge>
    </Badge.Anchor>
    <span className="text-base font-semibold">{user.name}</span>
    <span className="text-muted flex items-center gap-1 text-sm">
      <StatusVisual status={currentStatus} />
      {currentStatus.label}
    </span>
  </div>
)

const AccountSectionItems = ({
  section,
  onBack
}: {
  section: AccountSection
  onBack: () => void
}) => (
  <div className="flex flex-col gap-1">
    <Button
      variant="ghost"
      className="h-auto min-h-11 w-full justify-start gap-3 px-3 py-2 text-start"
      onPress={onBack}
      aria-label="Back to account menu">
      <AltArrowLeft size={18} aria-hidden="true" />
      {section.title}
    </Button>
    {section.options.map(option => (
      <Button
        key={option.id}
        variant="ghost"
        className={`h-auto min-h-11 w-full justify-start gap-3 px-3 py-2 text-start ${option.id === 'clear' ? 'text-danger' : ''}`}
        aria-pressed={section.selected === option.id}
        onPress={() => {
          section.onSelect(option.id)
          onBack()
        }}>
        {option.visual}
        <span className="min-w-0 flex-1 text-start">{option.label}</span>
        {section.selected === option.id ? (
          <CheckRead size={16} aria-hidden="true" />
        ) : null}
      </Button>
    ))}
  </div>
)

const AccountSheetContent = ({
  user,
  currentStatus,
  actions,
  sections,
  onSection,
  onPreferences,
  onLogout
}: {
  user: UserInfo
  currentStatus: UserStatusOption
  actions: AccountAction[]
  sections: AccountSection[]
  onSection: (id: string) => void
  onPreferences?: () => void
  onLogout: () => void
}) => (
  <div className="flex flex-col items-center gap-5 py-2">
    <AccountIdentity user={user} currentStatus={currentStatus} />
    <AccountActions actions={actions} />
    <Separator className="self-stretch" />
    <div className="flex w-full flex-col gap-1 p-2">
      {sections.map(item => (
        <Button
          key={item.id}
          variant="ghost"
          className="h-auto min-h-11 w-full justify-start gap-3 px-3 py-2 text-start"
          onPress={() => onSection(item.id)}>
          <span className="min-w-0 flex-1 truncate text-start">
            {item.label}
          </span>
          <AltArrowRight size={16} aria-hidden="true" />
        </Button>
      ))}
      <Separator />
      <Button
        variant="ghost"
        className="h-auto min-h-11 w-full justify-start gap-3 px-3 py-2 text-start"
        onPress={onPreferences}>
        <SettingsIcon size={18} aria-hidden="true" />
        Preferences
      </Button>
      <Button
        variant="ghost"
        className="text-danger h-auto min-h-11 w-full justify-start gap-3 px-3 py-2 text-start"
        onPress={onLogout}>
        <LogoutIcon size={18} aria-hidden="true" />
        Logout
      </Button>
    </div>
  </div>
)

const AccountDropdownContent = ({
  user,
  currentStatus,
  sections,
  onProfile,
  onPreferences,
  onLogout
}: {
  user: UserInfo
  currentStatus: UserStatusOption
  sections: AccountSection[]
  onProfile?: () => void
  onPreferences?: () => void
  onLogout: () => void
}) => (
  <>
    <button
      type="button"
      className="hover:bg-default-100 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left"
      onClick={onProfile}>
      <Avatar size="sm">
        {user.avatar ? (
          <Avatar.Image src={user.avatar} alt={user.name} />
        ) : null}
        <Avatar.Fallback>{user.name?.[0]}</Avatar.Fallback>
      </Avatar>
      <span>
        <span className="block font-medium">{user.name}</span>
        <span className="text-muted flex items-center gap-1 text-xs">
          <StatusVisual status={currentStatus} />
          {currentStatus.label}
        </span>
      </span>
    </button>

    <Separator />

    <Dropdown.Menu aria-label="Account actions">
      {sections.map(item => (
        <Dropdown.SubmenuTrigger key={item.id}>
          <Dropdown.Item id={item.id} textValue={item.label}>
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            <Dropdown.SubmenuIndicator />
          </Dropdown.Item>
          <Dropdown.Popover className="z-90 w-64 max-w-[calc(100vw-2rem)]">
            <Dropdown.Menu
              aria-label={item.title}
              selectionMode="single"
              selectedKeys={item.selected ? [item.selected] : []}
              onAction={key => item.onSelect(String(key))}>
              {item.options.map(option => (
                <Dropdown.Item
                  key={option.id}
                  id={option.id}
                  textValue={option.label}
                  className={option.id === 'clear' ? 'text-danger' : ''}>
                  {option.visual}
                  <span className="min-w-0 flex-1">{option.label}</span>
                  <Dropdown.ItemIndicator />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown.SubmenuTrigger>
      ))}
      <Separator />
      <Dropdown.Item id="preferences" onAction={onPreferences}>
        <SettingsIcon size={18} aria-hidden="true" />
        Preferences
      </Dropdown.Item>
      <Dropdown.Item id="logout" variant="danger" onAction={onLogout}>
        <LogoutIcon size={18} aria-hidden="true" />
        Logout
      </Dropdown.Item>
    </Dropdown.Menu>
  </>
)

const UserMenuTrigger = ({
  small,
  bubble,
  user,
  currentStatus,
  tooltipText,
  onPress
}: {
  small: boolean
  bubble: boolean
  user: UserInfo
  currentStatus: UserStatusOption
  tooltipText: string
  onPress: () => void
}) => {
  const Trigger = small ? Button : Dropdown.Trigger

  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger>
        <Trigger
          onPress={small ? onPress : undefined}
          aria-label={`Open ${user.name || 'user'} menu`}
          className={`button button--ghost relative flex h-12 w-12 items-center justify-center ${bubble ? 'rounded-full' : 'rounded-xl'}`}>
          <Badge.Anchor>
            <Avatar size="sm" className="h-6 w-6 rounded-md">
              {user.avatar ? (
                <Avatar.Image src={user.avatar} alt={user.name} />
              ) : null}
              <Avatar.Fallback>{user.name?.[0]}</Avatar.Fallback>
            </Avatar>
            <Badge
              placement="bottom-right"
              size="sm"
              className="border-background flex items-center justify-center border">
              <StatusVisual status={currentStatus} />
            </Badge>
          </Badge.Anchor>
        </Trigger>
      </Tooltip.Trigger>
      <Tooltip.Content placement={bubble ? 'bottom' : 'right'}>
        {tooltipText}
      </Tooltip.Content>
    </Tooltip>
  )
}

const UserMenu = ({
  user,
  onLogout,
  onProfile,
  onPreferences,
  showAI = false,
  showControlCenter = false,
  showNotifications = false,
  notificationCount = 0,
  onAI,
  onControlCenter,
  onNotifications
}: Props) => {
  const small = useMediaQuery(APPLICATION_MENU_SHEET_MEDIA_QUERY, {
    initializeWithValue: false
  })
  const bubble = useMediaQuery(ACCOUNT_BUBBLE_MEDIA_QUERY, {
    initializeWithValue: false
  })
  const [open, setOpen] = useState(false)
  const [section, setSection] = useState<string | null>(null)
  const { currentStatus, tooltipText, accountSections } =
    useAccountSections(user)
  const activeSection = accountSections.find(item => item.id === section)
  const changeOpen = (value: boolean) => {
    setOpen(value)
    if (!value) setSection(null)
  }
  const closeAndRun = (action?: () => void) => {
    setOpen(false)
    action?.()
  }
  const compactActions: AccountAction[] = [
    showControlCenter
      ? {
          label: 'Control center',
          icon: <SettingsIcon size={24} aria-hidden="true" />,
          onPress: onControlCenter
        }
      : null,
    showNotifications
      ? {
          label: 'Notifications',
          icon: (
            <Badge.Anchor>
              <Bell size={24} aria-hidden="true" />
              {notificationCount > 0 ? (
                <Badge
                  content={String(notificationCount)}
                  color="danger"
                  size="sm"
                />
              ) : null}
            </Badge.Anchor>
          ),
          onPress: onNotifications
        }
      : null,
    showAI
      ? {
          label: 'Tamizhi AI',
          icon: <VezhamTamizhi size={24} aria-hidden="true" />,
          onPress: onAI
        }
      : null
  ].filter((action): action is NonNullable<typeof action> => action !== null)
  const trigger = (
    <UserMenuTrigger
      small={small}
      bubble={bubble}
      user={user}
      currentStatus={currentStatus}
      tooltipText={tooltipText}
      onPress={() => setOpen(true)}
    />
  )

  return small ? (
    <>
      {trigger}
      <MenuSheet
        title="Account"
        hideTitle
        isOpen={open}
        onOpenChange={changeOpen}>
        {activeSection ? (
          <AccountSectionItems
            section={activeSection}
            onBack={() => setSection(null)}
          />
        ) : (
          <AccountSheetContent
            user={user}
            currentStatus={currentStatus}
            actions={compactActions}
            sections={accountSections}
            onSection={setSection}
            onPreferences={() => closeAndRun(onPreferences)}
            onLogout={() => closeAndRun(onLogout)}
          />
        )}
      </MenuSheet>
    </>
  ) : (
    <Dropdown isOpen={open} onOpenChange={changeOpen}>
      {trigger}
      <Dropdown.Popover
        placement={bubble ? 'bottom end' : 'right'}
        offset={8}
        className="w-72 max-w-[calc(100vw-2rem)]">
        <AccountDropdownContent
          user={user}
          currentStatus={currentStatus}
          sections={accountSections}
          onProfile={() => closeAndRun(onProfile)}
          onPreferences={() => closeAndRun(onPreferences)}
          onLogout={() => closeAndRun(onLogout)}
        />
      </Dropdown.Popover>
    </Dropdown>
  )
}

export { UserMenu }
