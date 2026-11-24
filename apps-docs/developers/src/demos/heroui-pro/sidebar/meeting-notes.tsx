// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ArrowsRotateRight,
  Check,
  ChevronsExpandVertical,
  CircleQuestion,
  Code,
  Comment,
  FileText,
  FolderPlus,
  Gear,
  House,
  LayoutCellsLarge,
  Lock,
  Magnifier,
  Person,
  Persons,
  Plus,
  Smartphone
} from '@gravity-ui/icons'
import type { CSSProperties, ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { Command, Sidebar, useSidebar } from '@vezham/react-pro-v3'
import {
  Breadcrumbs,
  Button,
  Dropdown,
  Kbd,
  Label,
  Separator
} from '@vezham/react-v3'

const SidebarStoryHeader = ({
  items
}: {
  items: Array<{
    icon?: ReactNode
    label: string
  }>
}) => (
  <div className="flex items-center gap-3 p-4">
    <Sidebar.Trigger />
    <Breadcrumbs className="min-w-0">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <Breadcrumbs.Item
            key={`${item.label}-${index}`}
            className={`min-w-0 ${isLast ? 'font-semibold' : 'text-muted'}`}
            href={isLast ? undefined : '#'}>
            <span className="flex min-w-0 items-center gap-2 overflow-hidden">
              {item.icon}
              <span className="truncate">{item.label}</span>
            </span>
          </Breadcrumbs.Item>
        )
      })}
    </Breadcrumbs>
  </div>
)

const WorkspaceLogo = ({ className = 'size-6' }: { className?: string }) => (
  <div
    className={`${className} flex shrink-0 items-center justify-center rounded-lg bg-black`}>
    <Code className="size-3/5 text-white" />
  </div>
)

const topNav = [
  { icon: House, label: 'Home' },
  { icon: Persons, label: 'Shared with me' }
]

const chatItems = [
  { label: 'Call Prep Notes for Upco...', time: '4m' },
  { label: 'Q2 Marketing Strategy', time: '12m' },
  { label: 'Design System Migration', time: '1h' },
  { label: 'Sprint Retro Action Items', time: '3h' }
]

const spaces = [
  {
    children: [{ icon: FileText, label: 'Personal' }],
    color: 'bg-neutral-400',
    icon: Lock,
    label: 'My notes'
  },
  { color: 'bg-indigo-600', icon: Persons, isTeam: true, label: 'Design team' }
]

const MeetingNotesInner = ({
  idPrefix,
  onOpenSearch
}: {
  idPrefix: string
  onOpenSearch: () => void
}) => {
  const { isMobile } = useSidebar()

  return (
    <>
      <Sidebar.Content className="pt-3">
        <Sidebar.Group>
          <div className="pb-2">
            <Button
              className="text-muted w-full justify-start gap-2 text-sm"
              size="sm"
              variant="outline"
              onPress={onOpenSearch}>
              <Magnifier className="size-3.5" />
              <span className="flex-1 text-left text-xs">Search</span>
              <Kbd className="bg-transparent text-xs leading-none">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>K</Kbd.Content>
              </Kbd>
            </Button>
          </div>
          <Sidebar.Menu
            aria-label="Main navigation"
            defaultExpandedKeys={[`${idPrefix}-nav-Chat`]}>
            {topNav.map(item => (
              <Sidebar.MenuItem
                key={item.label}
                href="#"
                id={`${idPrefix}-nav-${item.label}`}
                isCurrent={item.label === 'Home'}
                textValue={item.label}>
                <Sidebar.MenuIcon>
                  <item.icon className="size-4" />
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>{item.label}</Sidebar.MenuLabel>
              </Sidebar.MenuItem>
            ))}
            <Sidebar.MenuItem id={`${idPrefix}-nav-Chat`} textValue="Chat">
              <Sidebar.MenuIcon>
                <Comment className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel>
                Chat
                <Sidebar.MenuTrigger>
                  <Sidebar.MenuIndicator />
                </Sidebar.MenuTrigger>
              </Sidebar.MenuLabel>
              <Sidebar.Submenu>
                {chatItems.map(chat => (
                  <Sidebar.MenuItem
                    key={chat.label}
                    href="#"
                    id={`${idPrefix}-chat-${chat.label}`}
                    textValue={chat.label}>
                    <Sidebar.MenuLabel>{chat.label}</Sidebar.MenuLabel>
                    <Sidebar.MenuChip>
                      <span className="text-muted text-[10px] leading-none">
                        {chat.time}
                      </span>
                    </Sidebar.MenuChip>
                  </Sidebar.MenuItem>
                ))}
              </Sidebar.Submenu>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>

        <Sidebar.Group>
          <Sidebar.GroupLabel>Spaces</Sidebar.GroupLabel>
          <Sidebar.Menu
            aria-label="Spaces"
            defaultExpandedKeys={[`${idPrefix}-space-My notes`]}>
            {spaces.map(space => (
              <Sidebar.MenuItem
                key={space.label}
                href={space.children ? undefined : '#'}
                id={`${idPrefix}-space-${space.label}`}
                textValue={space.label}>
                <Sidebar.MenuIcon>
                  {space.isTeam ? (
                    <div
                      className={`flex size-4 items-center justify-center rounded ${space.color}`}>
                      <space.icon className="size-2.5 text-white" />
                    </div>
                  ) : (
                    <space.icon className="size-4" />
                  )}
                </Sidebar.MenuIcon>
                <Sidebar.MenuLabel>
                  {space.label}
                  {space.children ? (
                    <Sidebar.MenuTrigger>
                      <Sidebar.MenuIndicator />
                    </Sidebar.MenuTrigger>
                  ) : null}
                </Sidebar.MenuLabel>
                {space.children ? (
                  <Sidebar.Submenu>
                    {space.children.map(child => (
                      <Sidebar.MenuItem
                        key={child.label}
                        href="#"
                        id={`${idPrefix}-space-${child.label}`}
                        textValue={child.label}>
                        <Sidebar.MenuIcon>
                          <child.icon className="size-4" />
                        </Sidebar.MenuIcon>
                        <Sidebar.MenuLabel>{child.label}</Sidebar.MenuLabel>
                      </Sidebar.MenuItem>
                    ))}
                  </Sidebar.Submenu>
                ) : null}
              </Sidebar.MenuItem>
            ))}
            <Sidebar.MenuItem
              id={`${idPrefix}-add-folder`}
              textValue="Add folder">
              <Sidebar.MenuIcon>
                <FolderPlus className="size-4" />
              </Sidebar.MenuIcon>
              <Sidebar.MenuLabel className="text-muted">
                Add folder
              </Sidebar.MenuLabel>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>

      <Sidebar.Footer className="gap-0 px-2 pb-2">
        {!isMobile && (
          <>
            <div className="text-muted flex items-center gap-0.5 py-1">
              <Button isIconOnly aria-label="Notes" size="sm" variant="ghost">
                <FileText />
              </Button>
              <Button isIconOnly aria-label="People" size="sm" variant="ghost">
                <Person />
              </Button>
              <Button isIconOnly aria-label="Teams" size="sm" variant="ghost">
                <Persons />
              </Button>
            </div>
            <Sidebar.Separator />
          </>
        )}
        <div>
          <Dropdown>
            <Dropdown.Trigger className="hover:bg-default flex w-full items-center gap-2.5 rounded-xl px-1.5 py-1.5 text-left outline-none">
              <WorkspaceLogo />
              <span
                className="text-foreground text-sm font-medium"
                data-sidebar="label">
                Sarah
              </span>
              <ChevronsExpandVertical
                className="text-muted size-3"
                data-sidebar="label"
              />
            </Dropdown.Trigger>
            <Dropdown.Popover
              className="w-64"
              placement="top start"
              style={
                {
                  '--radius': '0.2rem',
                  '--spacing': '0.2rem',
                  '--text-sm': '0.80rem',
                  '--text-xs': '0.70rem'
                } as CSSProperties
              }>
              <div className="flex items-center gap-3 px-3 pt-3 pb-2">
                <WorkspaceLogo className="size-8" />
                <div className="flex flex-col">
                  <span className="text-foreground text-sm font-semibold">
                    Sarah
                  </span>
                  <span className="text-muted text-xs">1 member</span>
                </div>
              </div>
              <div className="px-3 pb-2">
                <Button className="w-full" size="sm" variant="tertiary">
                  <Persons className="size-3.5" />
                  Invite teammates
                </Button>
              </div>
              <Dropdown.Menu>
                <Dropdown.Section>
                  <Dropdown.Item
                    id={`${idPrefix}-dd-email`}
                    textValue="sarah@acme.com">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label className="text-muted">sarah@acme.com</Label>
                      <ArrowsRotateRight className="text-muted size-3.5" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${idPrefix}-dd-workspace`}
                    textValue="Sarah">
                    <WorkspaceLogo className="size-4" />
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Sarah</Label>
                      <Check className="text-foreground size-3.5" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${idPrefix}-dd-add-workspace`}
                    textValue="Add workspace">
                    <Plus className="text-muted size-4 shrink-0" />
                    <Label>Add workspace</Label>
                  </Dropdown.Item>
                </Dropdown.Section>
                <Separator />
                <Dropdown.Section>
                  <Dropdown.Item
                    id={`${idPrefix}-dd-templates`}
                    textValue="Manage templates">
                    <LayoutCellsLarge className="text-muted size-4 shrink-0" />
                    <Label>Manage templates</Label>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${idPrefix}-dd-mobile`}
                    textValue="Get app for iPhone">
                    <Smartphone className="text-muted size-4 shrink-0" />
                    <Label>Get app for iPhone</Label>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${idPrefix}-dd-help`}
                    textValue="Help Center">
                    <CircleQuestion className="text-muted size-4 shrink-0" />
                    <Label>Help Center</Label>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id={`${idPrefix}-dd-settings`}
                    textValue="Settings">
                    <Gear className="text-muted size-4 shrink-0" />
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Settings</Label>
                      <Kbd className="text-xs">
                        <Kbd.Abbr keyValue="command" />
                        <Kbd.Content>,</Kbd.Content>
                      </Kbd>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Section>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </Sidebar.Footer>
    </>
  )
}

export function MeetingNotes() {
  const [isCommandOpen, setCommandOpen] = useState(false)

  const openSearch = useCallback(() => setCommandOpen(true), [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Sidebar.Provider collapsible="offcanvas">
      <Sidebar
        style={
          {
            '--radius': '0.2rem',
            '--spacing': '0.2rem',
            '--text-sm': '0.80rem',
            '--text-xs': '0.70rem'
          } as CSSProperties
        }>
        <MeetingNotesInner idPrefix="meeting-notes" onOpenSearch={openSearch} />
      </Sidebar>
      <Sidebar.Mobile>
        <MeetingNotesInner
          idPrefix="meeting-notes-m"
          onOpenSearch={openSearch}
        />
      </Sidebar.Mobile>
      <Sidebar.Main>
        <SidebarStoryHeader
          items={[{ icon: <House className="size-4" />, label: 'Home' }]}
        />
        <div className="p-6">
          <p className="text-muted">
            Meeting notes sidebar with search, spaces, and user menu. Uses
            offcanvas collapsible mode.
          </p>
        </div>
      </Sidebar.Main>

      <Command>
        <Command.Backdrop isOpen={isCommandOpen} onOpenChange={setCommandOpen}>
          <Command.Container>
            <Command.Dialog>
              <Command.InputGroup>
                <Command.InputGroup.Input placeholder="Search people, folders, companies, or meetings" />
                <Command.InputGroup.ClearButton />
                <Command.InputGroup.Suffix>
                  <Kbd className="text-xs">
                    <Kbd.Content>Esc</Kbd.Content>
                  </Kbd>
                </Command.InputGroup.Suffix>
              </Command.InputGroup>
              <Command.List>
                <Command.Group heading="Folders">
                  <Command.Item textValue="Personal">
                    <FileText />
                    <span>Personal</span>
                  </Command.Item>
                  <Command.Item textValue="Design team">
                    <FileText />
                    <span>Design team</span>
                  </Command.Item>
                </Command.Group>
                <Command.Group heading="Companies">
                  <Command.Item textValue="Acme Corp">
                    <svg
                      className="size-6 shrink-0"
                      fill="none"
                      viewBox="0 0 40 40">
                      <path
                        d="M20 28.4356C16.5306 28.4357 13.3035 30.2166 11.4521 33.1512L9.1543 36.7934L10.0371 37.3511C10.3132 37.5101 10.5937 37.6622 10.8779 37.8082L13.1436 34.2188C14.6285 31.8648 17.2171 30.437 20 30.4369C22.783 30.4369 25.3714 31.8647 26.8564 34.2188L29.1211 37.8082C29.4053 37.6623 29.6858 37.5101 29.9619 37.3511L30.8457 36.7934L28.5479 33.1512C26.6964 30.2165 23.4695 28.4356 20 28.4356ZM20.123 36.4428L20 36.4379C19.3855 36.4381 18.8239 36.774 18.5312 37.3072L18.4766 37.4166L17.3691 39.834C18.0662 39.9256 18.7744 39.9821 19.4922 40L20 38.8914L20.5068 40C21.2249 39.9821 21.9335 39.9256 22.6309 39.834L21.5244 37.4166L21.4697 37.3072C21.1966 36.8096 20.689 36.4842 20.123 36.4428ZM21 12.4063V0H19V12.4063L15.7891.422921L13.8574.940585L17.0674 12.923L10.8662 2.18005L9.13379 3.18021L15.335 13.9222L6.56543 5.15124L5.15039 6.56651L13.9199 15.3375L3.17969 9.13529L2.17969 10.868L12.9209 17.0702L.94043 13.8597L.422852 15.7917L12.4053 19.0031H0V21.0035H12.4053L.422852 24.2149L.94043 26.1469L12.9209 22.9354L2.17969 29.1386L3.17969 30.8713L13.9199 24.6681L5.15039 33.4401L6.56543 34.8554L13.1216 28.2964C13.684 27.7337 14 26.9706 14 26.175V20.435C14 17.1209 16.6865 14.4342 20 14.434C23.3137 14.434 26 17.1208 26 20.435V26.1759C26 26.9716 26.316 27.7347 26.8785 28.2974L33.4346 34.8554L34.8496 33.4401L26.0801 24.6691L36.8203 30.8713L37.8203 29.1386L27.0791 22.9354L39.0596 26.1469L39.5771 24.2149L27.5957 21.0035H40V19.0031H27.5947L39.5771 15.7917L39.0596 13.8597L27.0791 17.0692L37.8203 10.868L36.8203 9.13529L26.0781 15.3375L34.8496 6.56554L33.4355 5.15124L24.6641 13.9232L30.8662 3.18021L29.1338 2.18005L22.9316 12.923L26.1426.940585L24.2109.422921L21 12.4063ZM20 32.4372C18.0122 32.4374 16.1792 33.5112 15.207 35.2453L13.2021 38.8201C13.8407 39.051 14.4942 39.2501 15.1611 39.4159L16.9512 36.224C17.5694 35.1209 18.7357 34.4377 20 34.4376C21.2645 34.4376 22.4305 35.1208 23.0488 36.224L24.8379 39.4159C25.5048 39.2502 26.1583 39.0509 26.7969 38.8201L24.793 35.2453C23.8208 33.5111 21.9879 32.4372 20 32.4372Z"
                        fill="#FF2121"
                      />
                    </svg>
                    <span>Acme Corp</span>
                    <span className="text-muted text-sm">acme.com</span>
                  </Command.Item>
                  <Command.Item textValue="Truewind">
                    <svg
                      className="size-6 shrink-0"
                      fill="none"
                      viewBox="0 0 40 40">
                      <path
                        d="M20 0C25.3043 0 30.3919 2.10669 34.1426 5.85742C34.8157 6.53058 35.4354 7.24719 36 8H20C16.8174 8 13.7651 9.26421 11.5146 11.5146C9.26421 13.7651 8 16.8174 8 20H20L36.9102 9.31934C38.1656 11.3074 39.0611 13.5027 39.5547 15.8027L32 20H40L39.9941 20.4971C39.8669 25.6213 37.776 30.5092 34.1426 34.1426C30.3919 37.8933 25.3043 40 20 40C14.6957 40 9.60815 37.8933 5.85742 34.1426C5.18426 33.4694 4.56459 32.7528 4 32H20C23.1826 32 26.2349 30.7358 28.4854 28.4854C30.5952 26.3755 31.8383 23.5608 31.9854 20.5947L32 20H20L3.08984 30.6787C1.83452 28.6906.941002 26.4951.447266 24.1953L8 20H0C0 14.6957 2.1067 9.60815 5.85742 5.85742C9.60815 2.1067 14.6957 0 20 0Z"
                        fill="#0094F7"
                      />
                    </svg>
                    <span>Truewind</span>
                    <span className="text-muted text-sm">truewind.com</span>
                  </Command.Item>
                  <Command.Item textValue="Polaris">
                    <svg
                      className="size-6 shrink-0"
                      fill="none"
                      viewBox="0 0 40 40">
                      <path
                        d="M0 20C0 12.5231 0 8.78461 1.60769 6C2.66091 4.17577 4.17577 2.66091 6 1.60769C8.78461 0 12.5231 0 20 0C27.4769 0 31.2154 0 34 1.60769C35.8242 2.66091 37.3391 4.17577 38.3923 6C40 8.78461 40 12.5231 40 20C40 27.4769 40 31.2154 38.3923 34C37.3391 35.8242 35.8242 37.3391 34 38.3923C31.2154 40 27.4769 40 20 40C12.5231 40 8.78461 40 6 38.3923C4.17577 37.3391 2.66091 35.8242 1.60769 34C0 31.2154 0 27.4769 0 20Z"
                        fill="#00DC33"
                      />
                      <path
                        clipRule="evenodd"
                        d="M28.0441 7.60927C28.8868 6.80331 30.2152 6.79965 31.0622 7.58229L31.1425 7.66005L31.4164 7.94729C34.1911 10.9318 35.2251 14.4098 34.9599 17.8065C34.6908 21.2511 33.1012 24.4994 30.8836 27.0664C28.6673 29.6316 25.7084 31.6519 22.51 32.5287C19.2714 33.4164 15.7294 33.1334 12.6547 30.9629C10.0469 29.1218 9.05406 26.1465 8.98661 23.2561C7.52323 22.5384 5.98346 21.6463 4.36789 20.5615L3.941 20.2716L3.85006 20.206C2.93285 19.5053 2.72313 18.2084 3.39161 17.2564C4.06029 16.3043 5.36233 16.046 6.34665 16.6512L6.44134 16.7126L6.83024 16.9771C7.79805 17.6269 8.72153 18.1903 9.59966 18.6767C10.1661 16.6889 11.1047 14.7802 12.3413 13.207C14.1938 10.8501 16.9713 8.96525 20.374 9.24647C23.439 9.49995 25.7036 11.081 26.8725 13.3122C28.0044 15.4728 28.0211 18.0719 27.0319 20.307C26.0234 22.5857 23.976 24.484 21.0309 25.2662C18.9114 25.8291 16.4284 25.7905 13.6267 25.0367V25.0377C12.5115 24.7375 11.3427 24.323 10.1212 23.7846C9.8472 23.6638 9.60873 23.8483 10.1212 24.1686C11.5636 25.1924 13.5956 26.0505 14.1836 26.3385C14.4615 26.788 14.8061 27.1568 15.2011 27.4356C17.0188 28.7188 19.1451 28.9539 21.3396 28.3523C23.5743 27.7397 25.8141 26.2625 27.5514 24.2516C29.2873 22.2423 30.4065 19.8348 30.5909 17.4727C30.765 15.2439 30.1218 12.9543 28.1842 10.8736L27.9927 10.6731L27.9162 10.5906C27.1538 9.72748 27.2018 8.41516 28.0441 7.60927ZM20.0092 13.5651C18.6033 13.4489 17.1196 14.189 15.8013 15.8662C14.7973 17.1436 14.0376 18.8033 13.6503 20.5112C16.4093 21.4544 18.4655 21.4608 19.8942 21.0814C21.5481 20.6422 22.5399 19.6477 23.0172 18.5693C23.5137 17.4472 23.4628 16.2245 22.9813 15.3055C22.5369 14.4571 21.6422 13.7002 20.0092 13.5651Z"
                        fill="white"
                        fillRule="evenodd"
                      />
                    </svg>
                    <span>Polaris</span>
                    <span className="text-muted text-sm">polaris.io</span>
                  </Command.Item>
                  <Command.Item textValue="Vertix">
                    <svg
                      className="size-6 shrink-0"
                      fill="none"
                      viewBox="0 0 51 40">
                      <path
                        d="M12.446 0L22.7801 8.82887C23.3936 9.35302 23.7473 10.1222 23.7473 10.9323V17.5862L13.4131 8.75734C12.7996 8.23319 12.446 7.464 12.446 6.65386V0Z"
                        fill="#7B19D8"
                      />
                      <path
                        d="M12.446 40L22.7801 31.1711C23.3936 30.647 23.7473 29.8778 23.7473 29.0677V22.4138L13.4131 31.2427C12.7996 31.7668 12.446 32.536 12.446 33.3461V40Z"
                        fill="#7B19D8"
                      />
                      <path
                        d="M0.117188 9.31033L10.3108 17.9705C10.805 18.3904 11.4308 18.6207 12.0775 18.6207H20.2982L10.1297 9.96252C9.63514 9.5414 9.00837 9.31033 8.36065 9.31033H0.117188Z"
                        fill="#7B19D8"
                      />
                      <path
                        d="M0.117188 30.6897L10.2481 22.0345C10.7432 21.6115 11.3713 21.3793 12.0206 21.3793H20.3227L10.1291 30.0394C9.63487 30.4593 9.00904 30.6897 8.36236 30.6897H0.117188Z"
                        fill="#7B19D8"
                      />
                      <path
                        d="M37.7884 0L27.4542 8.82887C26.8407 9.35302 26.4871 10.1222 26.4871 10.9323V17.5862L36.8212 8.75734C37.4347 8.23319 37.7884 7.464 37.7884 6.65386V0Z"
                        fill="#7B19D8"
                      />
                      <path
                        d="M37.7884 40L27.4542 31.1711C26.8407 30.647 26.4871 29.8778 26.4871 29.0677V22.4138L36.8212 31.2427C37.4347 31.7668 37.7884 32.536 37.7884 33.3461V40Z"
                        fill="#7B19D8"
                      />
                      <path
                        d="M50.1173 9.31033L39.9237 17.9705C39.4295 18.3904 38.8036 18.6207 38.157 18.6207H29.9362L40.1048 9.96252C40.5993 9.5414 41.2261 9.31033 41.8738 9.31033H50.1173Z"
                        fill="#7B19D8"
                      />
                      <path
                        d="M50.1172 30.6897L39.9863 22.0345C39.4912 21.6115 38.863 21.3793 38.2137 21.3793H29.9117L40.1052 30.0394C40.5995 30.4593 41.2253 30.6897 41.872 30.6897H50.1172Z"
                        fill="#7B19D8"
                      />
                    </svg>
                    <span>Vertix</span>
                    <span className="text-muted text-sm">vertix.dev</span>
                  </Command.Item>
                  <Command.Item textValue="Orbitl">
                    <svg
                      className="size-6 shrink-0"
                      fill="none"
                      viewBox="0 0 43 41">
                      <path
                        clipRule="evenodd"
                        d="M23.8054 9.04883C22.4346 9.04883 21.0772 9.31863 19.8107 9.84277C18.5443 10.3669 17.3935 11.1351 16.4243 12.1037C15.4549 13.0721 14.686 14.2219 14.1614 15.4873C13.6949 16.6127 13.4297 17.8099 13.3768 19.0246C13.3646 19.3026 13.2098 19.5571 12.9612 19.6812L9.59712 21.3619C9.34853 21.4861 9.18921 21.7405 9.20133 22.0186C9.25429 23.2332 9.51947 24.4304 9.98602 25.5558C10.5106 26.8212 11.2795 27.971 12.2488 28.9395C13.2181 29.908 14.3689 30.6762 15.6353 31.2004C16.9018 31.7245 18.2592 31.9943 19.63 31.9943C21.0008 31.9943 22.3582 31.7245 23.6247 31.2004C24.8911 30.6762 26.0419 29.908 27.0112 28.9395C27.9805 27.971 28.7494 26.8212 29.274 25.5558C29.7405 24.4304 30.0057 23.2332 30.0587 22.0186C30.0708 21.7405 30.2256 21.4861 30.4742 21.3619L33.8383 19.6812C34.0869 19.5571 34.2462 19.3026 34.2341 19.0246C34.1811 17.8099 33.9159 16.6127 33.4494 15.4873C32.9248 14.2219 32.1559 13.0721 31.1866 12.1037C30.2173 11.1351 29.0666 10.3669 27.8001 9.84277C26.5336 9.31863 25.1762 9.04883 23.8054 9.04883ZM28.6274 17.483C28.8316 17.9755 28.9587 18.4956 29.0049 19.025C29.0291 19.3022 28.8676 19.5571 28.619 19.6812L25.2549 21.3619C25.0064 21.4861 24.8537 21.7409 24.8295 22.0181C24.7832 22.5475 24.6562 23.0676 24.452 23.5602C24.1897 24.1929 23.8052 24.7678 23.3206 25.252C22.8359 25.7362 22.2605 26.1204 21.6273 26.3824C20.9941 26.6445 20.3154 26.7794 19.63 26.7794C18.9446 26.7794 18.2659 26.6445 17.6327 26.3824C16.9994 26.1204 16.4241 25.7362 15.9394 25.252C15.4548 24.7678 15.0703 24.1929 14.808 23.5602C14.6038 23.0676 14.4768 22.5475 14.4305 22.0181C14.4063 21.7409 14.5678 21.4861 14.8164 21.3619L18.1805 19.6812C18.429 19.5571 18.5817 19.3022 18.6059 19.025C18.6522 18.4956 18.7792 17.9755 18.9834 17.483C19.2457 16.8503 19.6302 16.2754 20.1148 15.7911C20.5995 15.3069 21.1749 14.9227 21.8081 14.6607C22.4413 14.3986 23.12 14.2637 23.8054 14.2637C24.4908 14.2637 25.1695 14.3986 25.8027 14.6607C26.436 14.9227 27.0113 15.3069 27.496 15.7911C27.9807 16.2754 28.3651 16.8503 28.6274 17.483Z"
                        fill="#E22935"
                        fillRule="evenodd"
                      />
                      <path
                        clipRule="evenodd"
                        d="M23.8055.705017C21.338.705017 18.8947 1.19061 16.6151 2.13407C14.3354 3.07753 12.2641 4.46039 10.5194 6.20366C8.77462 7.94696 7.39061 10.0165 6.44634 12.2942C5.56009 14.432 5.07753 16.7138 5.02157 19.0244C5.01483 19.3026 4.85898 19.5571 4.6104 19.6812L1.24631 21.3619C.997745 21.486.839417 21.7404.846154 22.0186C.90211 24.3292 1.38467 26.6111 2.27092 28.7488C3.21517 31.0266 4.59919 33.0961 6.34393 34.8394C8.08871 36.5827 10.16 37.9657 12.4397 38.9088C14.7193 39.8523 17.1626 40.3382 19.6301 40.3382C22.0975 40.3382 24.5408 39.8523 26.8205 38.9088C29.1001 37.9657 31.1714 36.5827 32.9162 34.8394C34.6609 33.0961 36.045 31.0266 36.9892 28.7488C37.8756 26.6111 38.358 24.3292 38.414 22.0186C38.4206 21.7404 38.5766 21.486 38.8249 21.3619L42.1891 19.6812C42.4378 19.5571 42.596 19.3026 42.5894 19.0244C42.5334 16.7138 42.051 14.432 41.1646 12.2942C40.2204 10.0165 38.8363 7.94696 37.0916 6.20366C35.3468 4.46039 33.2755 3.07753 30.9959 2.13407C28.7162 1.19061 26.2729.705017 23.8055.705017ZM33.1926 22.0186C33.2019 21.7405 33.3573 21.486 33.6058 21.3619L36.9699 19.6812C37.2185 19.5571 37.3775 19.3026 37.3679 19.0245C37.3134 17.3988 36.9666 15.7949 36.3426 14.2899C35.6607 12.6449 34.6611 11.1502 33.401 9.89114C32.1409 8.6321 30.6449 7.63338 28.9985 6.95199C27.3521 6.27059 25.5875 5.91988 23.8055 5.91988C22.0234 5.91988 20.2588 6.27059 18.6124 6.95199C16.966 7.63338 15.47 8.6321 14.21 9.89114C12.9499 11.1502 11.9503 12.6449 11.2683 14.2899C10.6444 15.7949 10.2975 17.3988 10.243 19.0245C10.2336 19.3026 10.0783 19.5571 9.82968 19.6812L6.46561 21.3619C6.21702 21.486 6.05821 21.7405 6.06755 22.0186C6.12205 23.6442 6.46898 25.2481 7.09291 26.7532C7.77486 28.3982 8.77443 29.8929 10.0345 31.1519C11.2946 32.411 12.7906 33.4097 14.437 34.0911C16.0834 34.7725 17.848 35.1232 19.6301 35.1232C21.4121 35.1232 23.1767 34.7725 24.8231 34.0911C26.4695 33.4097 27.9655 32.411 29.2256 31.1519C30.4857 29.8929 31.4852 28.3982 32.1672 26.7532C32.7912 25.2481 33.1381 23.6442 33.1926 22.0186Z"
                        fill="#E22935"
                        fillRule="evenodd"
                      />
                      <path
                        d="M42.5894 19.0536H37.3683C37.3661 19.3203 37.2097 19.5614 36.97 19.6812L33.6058 21.3619C33.366 21.4817 33.2129 21.7228 33.1941 21.9894H38.4151C38.4319 21.7228 38.5854 21.4817 38.8253 21.3619L42.1894 19.6812C42.429 19.5614 42.585 19.3204 42.5894 19.0536Z"
                        fill="#FF6670"
                      />
                      <path
                        d="M.846069 21.9894H6.06721C6.06949 21.7228 6.22577 21.4817 6.4656 21.3619L9.82971 19.6812C10.0696 19.5614 10.2226 19.3203 10.2415 19.0536H5.02032C5.0038 19.3204 4.85026 19.5614 4.61043 19.6812L1.24633 21.3619C1.00649 21.4817.850664 21.7228.846069 21.9894Z"
                        fill="#FF6670"
                      />
                      <path
                        d="M13.3751 19.0536C13.3538 19.3202 13.2012 19.5614 12.9613 19.6812L9.59721 21.3619C9.35735 21.4817 9.20059 21.7229 9.20081 21.9894H14.4288C14.4177 21.7234 14.5765 21.4818 14.8165 21.3619L18.1806 19.6812C18.4206 19.5614 18.5711 19.3197 18.6031 19.0536H13.3751Z"
                        fill="#FF6670"
                      />
                      <path
                        d="M29.0068 19.0536C29.0179 19.3197 28.8591 19.5614 28.6191 19.6812L25.255 21.3619C25.015 21.4818 24.8644 21.7234 24.8325 21.9894H30.0605C30.0818 21.7229 30.2344 21.4817 30.4742 21.3619L33.8384 19.6812C34.0782 19.5614 34.235 19.3202 34.2348 19.0536H29.0068Z"
                        fill="#FF6670"
                      />
                    </svg>
                    <span>Orbitl</span>
                    <span className="text-muted text-sm">orbitl.com</span>
                  </Command.Item>
                </Command.Group>
                <Command.Group heading="People">
                  <Command.Item textValue="Tom Rivera">
                    <div className="flex size-6 items-center justify-center rounded-full bg-amber-400">
                      <span className="text-xs font-bold text-white">T</span>
                    </div>
                    <span>Tom Rivera</span>
                    <span className="text-muted text-sm">tom@truewind.com</span>
                  </Command.Item>
                  <Command.Item textValue="Lena Kim">
                    <div className="flex size-6 items-center justify-center rounded-full bg-sky-500">
                      <span className="text-xs font-bold text-white">L</span>
                    </div>
                    <span>Lena Kim</span>
                    <span className="text-muted text-sm">lena@acme.com</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command.Dialog>
          </Command.Container>
        </Command.Backdrop>
      </Command>
    </Sidebar.Provider>
  )
}
