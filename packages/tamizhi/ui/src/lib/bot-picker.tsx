import { AltArrowDown } from '@vezham/icons-react'
import { Dropdown } from '@vezham/react-v3'
import type { TamizhiProfile } from '@vezham/tamizhi-contracts'

interface Props {
  headingId: string
  profile: TamizhiProfile
  profiles: readonly TamizhiProfile[]
  onSelect: (id: string) => void
}

export const BotPicker = ({
  profile,
  profiles,
  onSelect,
  headingId
}: Props) => (
  <h1 id={headingId} className="tamizhi-welcome__question">
    Who’s helping?
    <Dropdown>
      <Dropdown.Trigger
        className="tamizhi-welcome__bot"
        aria-label="Choose an assistant">
        {profile.name}
        <AltArrowDown size={22} aria-hidden="true" />
      </Dropdown.Trigger>
      <Dropdown.Popover className="tamizhi-bots">
        <Dropdown.Menu
          aria-label="Assistants"
          selectionMode="single"
          selectedKeys={[profile.id]}>
          {profiles.map(item => (
            <Dropdown.Item
              key={item.id}
              id={item.id}
              textValue={item.name}
              onAction={() => onSelect(item.id)}>
              {item.name}
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  </h1>
)
