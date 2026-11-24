// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ArrowUpRightFromSquare,
  ChevronDown,
  ChevronRight,
  Globe,
  LogoGithub,
  LogoGitlab,
  LogoSlack
} from '@gravity-ui/icons'

import {
  ItemCard,
  ItemCardGroup,
  PressableFeedback
} from '@vezham/react-pro-v3'
import { Button, Dropdown, Label, Separator } from '@vezham/react-v3'

export function DeveloperSettings() {
  return (
    <div className="flex w-[600px] flex-col gap-6 p-6">
      <ItemCardGroup variant="transparent">
        <ItemCardGroup.Header className="mb-1 flex items-center justify-between px-1.5">
          <ItemCardGroup.Title>Source Control</ItemCardGroup.Title>
          <Dropdown>
            <Button size="sm" variant="outline">
              Add Provider
              <ChevronDown className="size-3" />
            </Button>
            <Dropdown.Popover className="min-w-[180px]" placement="bottom end">
              <Dropdown.Menu>
                <Dropdown.Item textValue="GitHub Enterprise">
                  <LogoGithub className="size-4" />
                  <Label>GitHub Enterprise</Label>
                </Dropdown.Item>
                <Dropdown.Item textValue="GitLab Self Hosted">
                  <LogoGitlab className="size-4" />
                  <Label>GitLab Self Hosted</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </ItemCardGroup.Header>

        <ItemCardGroup className="overflow-hidden">
          <ItemCard>
            <ItemCard.Icon>
              <LogoGithub />
            </ItemCard.Icon>
            <ItemCard.Content>
              <ItemCard.Title>GitHub</ItemCard.Title>
              <ItemCard.Description className="max-w-xs">
                Connected as @jrgarciadev to repositories in organizations:
                heroui-inc
              </ItemCard.Description>
            </ItemCard.Content>
            <ItemCard.Action>
              <Button size="sm" variant="outline">
                Manage
                <ChevronDown className="size-3" />
              </Button>
            </ItemCard.Action>
          </ItemCard>
          <Separator />
          <ItemCard>
            <ItemCard.Icon>
              <LogoGitlab />
            </ItemCard.Icon>
            <ItemCard.Content>
              <ItemCard.Title>GitLab</ItemCard.Title>
              <ItemCard.Description className="max-w-xs">
                Connect GitLab for Cloud Agents, Bugbot and enhanced codebase
                context
              </ItemCard.Description>
            </ItemCard.Content>
            <ItemCard.Action>
              <Button size="sm" variant="outline">
                Connect
                <ArrowUpRightFromSquare className="size-3" />
              </Button>
            </ItemCard.Action>
          </ItemCard>
          <Separator />
          <ItemCard<'button'>
            className="hover:bg-default/20 active:bg-default-hover/50 relative w-full cursor-pointer overflow-hidden transition-colors"
            render={props => <button type="button" {...props} />}>
            <PressableFeedback.Ripple />
            <ItemCard.Icon>
              <LogoGithub />
            </ItemCard.Icon>
            <ItemCard.Content>
              <ItemCard.Title>GitHub Enterprise</ItemCard.Title>
              <ItemCard.Description>
                Register a GitHub Enterprise App via Manifest
              </ItemCard.Description>
            </ItemCard.Content>
            <ItemCard.Action>
              <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
            </ItemCard.Action>
          </ItemCard>
          <Separator />
          <ItemCard<'button'>
            className="hover:bg-default/20 active:bg-default-hover/50 relative w-full cursor-pointer overflow-hidden transition-colors"
            render={props => <button type="button" {...props} />}>
            <PressableFeedback.Ripple />
            <ItemCard.Icon>
              <LogoGitlab />
            </ItemCard.Icon>
            <ItemCard.Content>
              <ItemCard.Title>GitLab Self Hosted</ItemCard.Title>
              <ItemCard.Description>
                Register a self-hosted GitLab instance
              </ItemCard.Description>
            </ItemCard.Content>
            <ItemCard.Action>
              <ChevronRight className="text-muted size-4 rtl:-scale-x-100" />
            </ItemCard.Action>
          </ItemCard>
        </ItemCardGroup>
      </ItemCardGroup>

      <ItemCardGroup variant="transparent">
        <ItemCardGroup.Header className="mb-1 px-1.5">
          <ItemCardGroup.Title>Integrations</ItemCardGroup.Title>
        </ItemCardGroup.Header>

        <ItemCardGroup className="overflow-hidden">
          <ItemCard>
            <ItemCard.Icon>
              <LogoSlack />
            </ItemCard.Icon>
            <ItemCard.Content>
              <ItemCard.Title>Slack</ItemCard.Title>
              <ItemCard.Description>
                Work with Cloud Agents from Slack
              </ItemCard.Description>
            </ItemCard.Content>
            <ItemCard.Action>
              <Button size="sm" variant="outline">
                Connect
                <ArrowUpRightFromSquare className="size-3" />
              </Button>
            </ItemCard.Action>
          </ItemCard>
          <Separator />
          <ItemCard>
            <ItemCard.Icon>
              <Globe />
            </ItemCard.Icon>
            <ItemCard.Content>
              <ItemCard.Title>Linear</ItemCard.Title>
              <ItemCard.Description>
                Connect a Linear workspace to delegate issues to Cloud Agents
              </ItemCard.Description>
            </ItemCard.Content>
            <ItemCard.Action>
              <Button size="sm" variant="outline">
                Connect
                <ArrowUpRightFromSquare className="size-3" />
              </Button>
            </ItemCard.Action>
          </ItemCard>
        </ItemCardGroup>
      </ItemCardGroup>
    </div>
  )
}
