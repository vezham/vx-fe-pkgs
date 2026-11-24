// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import CircleCheckFill from '@gravity-ui/icons/CircleCheckFill'

import { CheckboxButtonGroup, NumberValue } from '@vezham/react-pro-v3'
import { Button, Description, Label, Link } from '@vezham/react-v3'

const green = '#89c75a'
const greenDark = '#4d8429'

const subscriptions = [
  {
    daily: 0.4,
    description:
      'Full suite of saving, investing, and learning tools for you and your family.',
    monthly: 12,
    title: 'Gold',
    value: 'gold'
  },
  {
    daily: 0.2,
    description:
      'Level up your saving and investing skills with even more tools.',
    monthly: 6,
    title: 'Silver',
    value: 'silver'
  },
  {
    daily: 0.1,
    description:
      'Investing tools to get you started on your financial journey.',
    monthly: 3,
    title: 'Bronze',
    value: 'bronze'
  }
]

export function SubscriptionPlans() {
  return (
    <div className="flex w-[420px] flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Choose a subscription
        </h2>
        <p className="text-muted text-sm">
          Pick a plan.{' '}
          <Link
            className="text-sm font-semibold no-underline"
            href="#"
            style={{ color: greenDark }}>
            Try a month on us!
          </Link>
        </p>
      </div>

      <CheckboxButtonGroup
        className="w-full"
        defaultValue={['silver']}
        name="subscription-plan"
        style={
          {
            '--accent': green
          } as React.CSSProperties
        }>
        {subscriptions.map(sub => (
          <CheckboxButtonGroup.Item
            key={sub.value}
            className="data-[selected=true]:border-[--sub-green] data-[selected=true]:bg-[--sub-green]/10"
            style={{ '--sub-green': green } as React.CSSProperties}
            value={sub.value}>
            {({ isSelected }) => (
              <>
                <CheckboxButtonGroup.Indicator>
                  <CircleCheckFill style={{ color: green }} />
                </CheckboxButtonGroup.Indicator>
                <CheckboxButtonGroup.ItemContent>
                  <Label className="text-lg font-bold">{sub.title}</Label>
                  <Description>{sub.description}</Description>
                  <p className="mt-3 text-sm">
                    <span style={isSelected ? { color: greenDark } : undefined}>
                      <NumberValue
                        className="font-semibold"
                        currency="USD"
                        style="currency"
                        value={sub.daily}>
                        <NumberValue.Suffix>/day</NumberValue.Suffix>
                      </NumberValue>
                    </span>{' '}
                    <span className="text-muted">
                      (
                      <NumberValue
                        currency="USD"
                        maximumFractionDigits={0}
                        style="currency"
                        value={sub.monthly}
                      />{' '}
                      billed monthly)
                    </span>
                  </p>
                </CheckboxButtonGroup.ItemContent>
              </>
            )}
          </CheckboxButtonGroup.Item>
        ))}
      </CheckboxButtonGroup>

      <div className="flex w-full flex-col items-center gap-4">
        <p className="text-muted px-2 text-center text-xs">
          *APY is variable and subject to change at our discretion, without
          prior notice.
        </p>
        <Button
          fullWidth
          className="rounded-full text-white"
          size="lg"
          style={{ background: green }}>
          Try a month on us
        </Button>
        <Link
          className="text-sm font-semibold no-underline"
          href="#"
          style={{ color: greenDark }}>
          Compare plans
        </Link>
      </div>
    </div>
  )
}
