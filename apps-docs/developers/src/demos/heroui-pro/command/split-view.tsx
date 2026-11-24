// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  CircleFill,
  FontCursor,
  Magnifier,
  PersonFill,
  Sliders,
  Square,
  Tag,
  ToggleOn
} from '@gravity-ui/icons'
import { useState } from 'react'

import { Command } from '@vezham/react-pro-v3'
import {
  Avatar,
  Button,
  Chip,
  Input,
  Kbd,
  Radio,
  RadioGroup,
  Slider,
  Switch
} from '@vezham/react-v3'

const splitItemClass = [
  'group rounded-xl',
  'data-[focused=true]:bg-blue-600 data-[focused=true]:text-white'
].join(' ')

function SplitViewPreview({ component }: { component: string }) {
  switch (component) {
    case 'Button':
      return <Button variant="primary">Primary</Button>
    case 'Input':
      return <Input placeholder="Placeholder" variant="secondary" />
    case 'Chip':
      return (
        <Chip color="accent" size="lg" variant="soft">
          Chip
        </Chip>
      )
    case 'Radio':
      return (
        <RadioGroup defaultValue="premium" name="plan" variant="secondary">
          <Radio value="basic">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Basic Plan
            </Radio.Content>
          </Radio>
          <Radio value="premium">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Premium Plan
            </Radio.Content>
          </Radio>
          <Radio value="business">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              Business Plan
            </Radio.Content>
          </Radio>
        </RadioGroup>
      )
    case 'Slider':
      return (
        <Slider className="w-full max-w-[200px]" defaultValue={30}>
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>
      )
    case 'Avatar':
      return (
        <Avatar size="md">
          <Avatar.Image
            alt="Medium Avatar"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
          />
          <Avatar.Fallback>MD</Avatar.Fallback>
        </Avatar>
      )
    case 'Switch':
      return (
        <Switch defaultSelected aria-label="Toggle">
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Content>
        </Switch>
      )
    default:
      return null
  }
}

const components = [
  { icon: <Square />, id: 'Button', subtitle: 'Trigger actions' },
  { icon: <FontCursor />, id: 'Input', subtitle: 'Retrieve user input' },
  { icon: <CircleFill />, id: 'Radio', subtitle: 'Single choice input' },
  { icon: <Tag />, id: 'Chip', subtitle: 'Annotate context' },
  { icon: <Sliders />, id: 'Slider', subtitle: 'Free range picker' },
  { icon: <PersonFill />, id: 'Avatar', subtitle: 'Illustrate the user' },
  { icon: <ToggleOn />, id: 'Switch', subtitle: 'Toggle a setting' }
]

export function SplitView() {
  const [isOpen, setOpen] = useState(false)
  const [selected, setSelected] = useState('Button')

  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        Split View{' '}
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>
      </Button>
      <Command>
        <Command.Backdrop
          isOpen={isOpen}
          onOpenChange={open => {
            setOpen(open)
            if (!open) setSelected('Button')
          }}>
          <Command.Container size="lg">
            <Command.Dialog>
              <Command.InputGroup>
                <Command.InputGroup.Prefix>
                  <Magnifier />
                </Command.InputGroup.Prefix>
                <Command.InputGroup.Input placeholder="Find components, packages, and interactions..." />
                <Command.InputGroup.ClearButton />
              </Command.InputGroup>
              <div className="flex min-h-[308px]">
                <Command.List
                  className="!w-2/5 !flex-none"
                  renderEmptyState={() => (
                    <div className="text-muted flex h-16 items-center justify-center text-sm">
                      No results found.
                    </div>
                  )}
                  onAction={key => setSelected(String(key))}>
                  <Command.Group heading="Components">
                    {components.map(({ icon, id, subtitle }) => (
                      <Command.Item
                        key={id}
                        className={splitItemClass}
                        id={id}
                        textValue={id}>
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-500 [&_svg]:text-white">
                          {icon}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium">{id}</span>
                          <span className="text-muted text-xs group-data-[focused=true]:text-white/70">
                            {subtitle}
                          </span>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>
                <div className="bg-separator w-px self-stretch" />
                <div className="flex flex-1 items-center justify-center rounded-lg p-4">
                  <SplitViewPreview component={selected} />
                </div>
              </div>
            </Command.Dialog>
          </Command.Container>
        </Command.Backdrop>
      </Command>
    </>
  )
}
