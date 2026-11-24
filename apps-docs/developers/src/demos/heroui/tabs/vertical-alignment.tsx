// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Tabs } from '@vezham/react-v3'

export function VerticalAlignment() {
  return (
    <Tabs
      align="start"
      className="w-full max-w-lg"
      orientation="vertical"
      variant="secondary">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Settings">
          <Tabs.Tab id="general">
            General
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="billing">
            Subscription &amp; Billing
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="appearance">
            Appearance
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="notifications">
            Notifications
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="privacy">
            Privacy
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel className="px-4" id="general">
        <h3 className="mb-2 font-semibold">General</h3>
        <p className="text-muted text-sm">
          Manage your account information and preferences.
        </p>
      </Tabs.Panel>
      <Tabs.Panel className="px-4" id="billing">
        <h3 className="mb-2 font-semibold">Subscription &amp; Billing</h3>
        <p className="text-muted text-sm">
          View and manage your plan and payment methods.
        </p>
      </Tabs.Panel>
      <Tabs.Panel className="px-4" id="appearance">
        <h3 className="mb-2 font-semibold">Appearance</h3>
        <p className="text-muted text-sm">
          Choose a theme and adjust the interface density.
        </p>
      </Tabs.Panel>
      <Tabs.Panel className="px-4" id="notifications">
        <h3 className="mb-2 font-semibold">Notifications</h3>
        <p className="text-muted text-sm">
          Choose how and when you want to receive notifications.
        </p>
      </Tabs.Panel>
      <Tabs.Panel className="px-4" id="privacy">
        <h3 className="mb-2 font-semibold">Privacy</h3>
        <p className="text-muted text-sm">
          Control what you share and who can see your activity.
        </p>
      </Tabs.Panel>
    </Tabs>
  )
}
