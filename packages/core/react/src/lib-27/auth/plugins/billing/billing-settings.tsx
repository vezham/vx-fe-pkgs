'use client'

import { useState } from 'react'

import { formatLocaleDate } from '@vezham/auth-ui-core'
import {
  type BillingAdapter,
  type BillingInterval,
  type BillingLocalization,
  type BillingPlan,
  type BillingScope,
  type BillingSubscription,
  type BillingUsage,
  billingPlugin,
  followBillingAction
} from '@vezham/auth-ui-core/plugins/billing'
import { useAuth, useAuthPlugin, useSession } from '@vezham/auth-ui-react'
import {
  useBillingCheckout,
  useBillingPlans,
  useBillingPortal,
  useBillingState,
  useCancelBillingSubscription,
  useRestoreBillingSubscription,
  useUpdateBillingSeats
} from '@vezham/auth-ui-react/plugins/billing'
import {
  Refresh as ArrowRotateLeft,
  CheckRead as Check,
  Card as CreditCard,
  Settings as Gear,
  Close as Xmark
} from '@vezham/icons-react'
import {
  AlertDialog,
  Button,
  Card,
  type CardProps,
  Chip,
  Label,
  ListBox,
  NumberField,
  ProgressBar,
  Select,
  Spinner,
  cn
} from '@vezham/react-v3'

type SubscriptionAction = 'cancel' | 'restore'

export type BillingSettingsProps = {
  adapter: BillingAdapter
  scope: BillingScope
  className?: string
  variant?: CardProps['variant']
}

const formatPrice = (amount: number, currency: string, languageTag: string) => {
  const fractionDigits =
    new Intl.NumberFormat(languageTag, {
      style: 'currency',
      currency
    }).resolvedOptions().maximumFractionDigits ?? 2
  const divisor = 10 ** fractionDigits

  return new Intl.NumberFormat(languageTag, {
    style: 'currency',
    currency,
    maximumFractionDigits: amount % divisor === 0 ? 0 : fractionDigits
  }).format(amount / divisor)
}

const availableIntervals = (plans: BillingPlan[]) =>
  Array.from(
    new Set(plans.flatMap(plan => plan.prices.map(price => price.interval)))
  )

const PlanCard = ({
  plan,
  interval,
  currentPlanId,
  isPending,
  onChoose,
  variant
}: {
  plan: BillingPlan
  interval: BillingInterval
  currentPlanId?: string
  isPending: boolean
  onChoose: (plan: BillingPlan, priceId: string) => void
  variant?: CardProps['variant']
}) => {
  const { locale } = useAuth()
  const { localization } = useAuthPlugin(billingPlugin)
  const price = plan.prices.find(entry => entry.interval === interval)
  if (!price) return null
  const isCurrent = currentPlanId === plan.id
  const suffix =
    price.interval === 'month'
      ? localization.perMonth
      : price.interval === 'year'
        ? localization.perYear
        : localization.oneTime

  return (
    <Card
      variant={plan.highlighted ? 'tertiary' : variant}
      className={cn(
        'relative h-full',
        plan.highlighted && 'ring-accent ring-1'
      )}>
      <Card.Header className="flex-row items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <Card.Title>{plan.name}</Card.Title>
          {plan.description && (
            <Card.Description>{plan.description}</Card.Description>
          )}
        </div>
        {plan.highlighted && <Chip size="sm">{localization.popular}</Chip>}
      </Card.Header>
      <Card.Content className="flex flex-1 flex-col gap-4">
        <div>
          <span className="text-2xl font-semibold tracking-tight">
            {formatPrice(price.amount, price.currency, locale.languageTag)}
          </span>
          <span className="text-muted ml-1 text-xs">{suffix}</span>
        </div>
        {plan.features?.length ? (
          <ul className="flex flex-col gap-2 text-sm">
            {plan.features.map(feature => (
              <li key={feature} className="flex items-start gap-2">
                <Check
                  size={16}
                  className="text-success mt-0.5 size-4 shrink-0"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </Card.Content>
      <Card.Footer>
        <Button
          fullWidth
          variant={isCurrent ? 'outline' : 'primary'}
          isDisabled={isCurrent || isPending}
          onPress={() => onChoose(plan, price.id)}>
          {isCurrent ? localization.currentPlan : localization.choosePlan}
        </Button>
      </Card.Footer>
    </Card>
  )
}

const SubscriptionDetails = ({
  adapter,
  isPending,
  isSeatsPending,
  locale,
  localization,
  onUpdateSeats,
  subscription
}: {
  adapter: BillingAdapter
  isPending: boolean
  isSeatsPending: boolean
  locale: string
  localization: BillingLocalization
  onUpdateSeats: (subscriptionId: string, seats: number) => void
  subscription?: BillingSubscription
}) => {
  if (isPending) {
    return (
      <div className="flex min-h-20 items-center justify-center">
        <Spinner aria-label={localization.loadingBilling} />
      </div>
    )
  }

  if (!subscription) {
    return <p className="text-muted text-sm">{localization.noSubscription}</p>
  }

  return (
    <>
      {subscription.currentPeriodEnd ? (
        <p className="text-muted text-sm">
          {(subscription.cancelAtPeriodEnd
            ? localization.endsOn
            : localization.renewsOn
          ).replace(
            '{{date}}',
            formatLocaleDate(subscription.currentPeriodEnd, locale, {
              dateStyle: 'medium'
            })
          )}
        </p>
      ) : null}
      {typeof subscription.seats === 'number' && adapter.supports.seats ? (
        <SeatsEditor
          key={subscription.id}
          seats={subscription.seats}
          isPending={isSeatsPending}
          onSave={seats => onUpdateSeats(subscription.id, seats)}
        />
      ) : null}
    </>
  )
}

const BillingSubscriptionActions = ({
  adapter,
  isPortalPending,
  localization,
  onManage,
  onOpenAction,
  subscription
}: {
  adapter: BillingAdapter
  isPortalPending: boolean
  localization: BillingLocalization
  onManage: () => void
  onOpenAction: (action: SubscriptionAction) => void
  subscription?: BillingSubscription
}) => (
  <Card.Footer className="flex-wrap gap-2">
    <Button variant="outline" isPending={isPortalPending} onPress={onManage}>
      <Gear size={16} />
      {localization.manageBilling}
    </Button>
    {subscription?.cancelAtPeriodEnd && adapter.supports.restore ? (
      <Button variant="outline" onPress={() => onOpenAction('restore')}>
        <ArrowRotateLeft size={16} />
        {localization.restoreSubscription}
      </Button>
    ) : subscription && adapter.supports.cancel ? (
      <Button variant="ghost" onPress={() => onOpenAction('cancel')}>
        <Xmark size={16} />
        {localization.cancelSubscription}
      </Button>
    ) : null}
  </Card.Footer>
)

const BillingSubscriptionCard = ({
  adapter,
  isPending,
  isPortalPending,
  isSeatsPending,
  locale,
  localization,
  onManage,
  onOpenAction,
  onUpdateSeats,
  subscription,
  variant
}: {
  adapter: BillingAdapter
  isPending: boolean
  isPortalPending: boolean
  isSeatsPending: boolean
  locale: string
  localization: BillingLocalization
  onManage: () => void
  onOpenAction: (action: SubscriptionAction) => void
  onUpdateSeats: (subscriptionId: string, seats: number) => void
  subscription?: BillingSubscription
  variant?: CardProps['variant']
}) => (
  <Card variant={variant}>
    <Card.Header className="flex-row items-start justify-between gap-3">
      <div>
        <Card.Title>{localization.subscription}</Card.Title>
        <Card.Description>
          {subscription
            ? (subscription.planName ?? subscription.planId)
            : localization.noSubscriptionDescription}
        </Card.Description>
      </div>
      {subscription ? <Chip size="sm">{subscription.status}</Chip> : null}
    </Card.Header>
    <Card.Content className="flex flex-col gap-4">
      <SubscriptionDetails
        adapter={adapter}
        isPending={isPending}
        isSeatsPending={isSeatsPending}
        locale={locale}
        localization={localization}
        onUpdateSeats={onUpdateSeats}
        subscription={subscription}
      />
    </Card.Content>
    <BillingSubscriptionActions
      adapter={adapter}
      isPortalPending={isPortalPending}
      localization={localization}
      onManage={onManage}
      onOpenAction={onOpenAction}
      subscription={subscription}
    />
  </Card>
)

const BillingUsageCard = ({
  usage,
  localization,
  variant
}: {
  usage: BillingUsage[]
  localization: BillingLocalization
  variant?: CardProps['variant']
}) =>
  usage.length ? (
    <Card variant={variant}>
      <Card.Header>
        <Card.Title>{localization.usage}</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col gap-4">
        {usage.map(entry => (
          <ProgressBar
            key={entry.id}
            value={entry.used}
            maxValue={entry.limit ?? Math.max(entry.used, 1)}
            valueLabel={
              entry.limit
                ? `${entry.used} / ${entry.limit}${entry.unit ? ` ${entry.unit}` : ''}`
                : localization.used.replace('{{used}}', String(entry.used))
            }>
            <Label>{entry.label}</Label>
            <ProgressBar.Output />
            <ProgressBar.Track>
              <ProgressBar.Fill />
            </ProgressBar.Track>
          </ProgressBar>
        ))}
      </Card.Content>
    </Card>
  ) : null

const BillingPlansSection = ({
  checkoutPending,
  currentPlanId,
  interval,
  intervals,
  isPending,
  localization,
  onChoosePlan,
  onIntervalChange,
  plans,
  variant
}: {
  checkoutPending: boolean
  currentPlanId?: string
  interval: BillingInterval
  intervals: BillingInterval[]
  isPending: boolean
  localization: BillingLocalization
  onChoosePlan: (plan: BillingPlan, priceId: string) => void
  onIntervalChange: (interval: BillingInterval) => void
  plans: BillingPlan[]
  variant?: CardProps['variant']
}) => (
  <section
    className="flex flex-col gap-3"
    aria-labelledby="billing-plans-heading">
    <div className="flex items-end justify-between gap-3">
      <h3 id="billing-plans-heading" className="text-sm font-semibold">
        {localization.plans}
      </h3>
      {intervals.length > 1 ? (
        <Select
          aria-label={localization.plans}
          value={interval}
          onChange={value => {
            const nextInterval = intervals.find(
              candidate => candidate === value
            )
            if (nextInterval) onIntervalChange(nextInterval)
          }}>
          <Select.Trigger className="w-36">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {intervals.map(entry => (
                <ListBox.Item key={entry} id={entry}>
                  {entry === 'month'
                    ? localization.perMonth
                    : entry === 'year'
                      ? localization.perYear
                      : localization.oneTime}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      ) : null}
    </div>
    {isPending ? (
      <div className="flex min-h-40 items-center justify-center">
        <Spinner aria-label={localization.loadingBilling} />
      </div>
    ) : (
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {plans.map(plan => (
          <PlanCard
            key={plan.id}
            plan={plan}
            interval={interval}
            currentPlanId={currentPlanId}
            isPending={checkoutPending}
            variant={variant}
            onChoose={onChoosePlan}
          />
        ))}
      </div>
    )}
  </section>
)

const SubscriptionActionDialog = ({
  action,
  actionError,
  isPending,
  localization,
  onClose,
  onConfirm
}: {
  action?: SubscriptionAction
  actionError: string
  isPending: boolean
  localization: BillingLocalization
  onClose: () => void
  onConfirm: () => void
}) => (
  <AlertDialog.Backdrop
    isOpen={Boolean(action)}
    onOpenChange={open => !open && onClose()}>
    <AlertDialog.Container>
      <AlertDialog.Dialog>
        <AlertDialog.CloseTrigger />
        <AlertDialog.Header>
          <AlertDialog.Icon status={action === 'cancel' ? 'danger' : 'default'}>
            <CreditCard size={16} />
          </AlertDialog.Icon>
          <AlertDialog.Heading>
            {action === 'cancel'
              ? localization.cancelSubscriptionTitle
              : localization.restoreSubscriptionTitle}
          </AlertDialog.Heading>
        </AlertDialog.Header>
        <AlertDialog.Body>
          <p>
            {action === 'cancel'
              ? localization.cancelSubscriptionDescription
              : localization.restoreSubscriptionDescription}
          </p>
          {actionError ? (
            <p className="text-danger mt-2" role="alert">
              {actionError}
            </p>
          ) : null}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button variant="ghost" onPress={onClose}>
            {localization.cancel}
          </Button>
          <Button
            variant={action === 'cancel' ? 'danger' : 'primary'}
            isPending={isPending}
            onPress={onConfirm}>
            {localization.confirm}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Dialog>
    </AlertDialog.Container>
  </AlertDialog.Backdrop>
)

const SeatsEditor = ({
  seats,
  isPending,
  onSave
}: {
  seats: number
  isPending: boolean
  onSave: (seats: number) => void
}) => {
  const { localization } = useAuthPlugin(billingPlugin)
  const [value, setValue] = useState(seats)

  return (
    <div className="flex items-end gap-2">
      <NumberField
        className="max-w-40"
        minValue={1}
        value={value}
        onChange={next => setValue(next ?? 1)}
        variant="secondary">
        <Label>{localization.seats}</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input />
          <NumberField.IncrementButton />
        </NumberField.Group>
      </NumberField>
      <Button
        size="sm"
        variant="outline"
        isPending={isPending}
        isDisabled={value === seats}
        onPress={() => onSave(value)}>
        {localization.updateSeats}
      </Button>
    </div>
  )
}

export const BillingSettings = ({
  adapter,
  scope,
  className,
  variant
}: BillingSettingsProps) => {
  const { locale } = useAuth()
  const { localization } = useAuthPlugin(billingPlugin)
  const plans = useBillingPlans(adapter, scope)
  const state = useBillingState(adapter, scope)
  const checkout = useBillingCheckout(adapter, scope)
  const portal = useBillingPortal(adapter, scope)
  const cancelSubscription = useCancelBillingSubscription(adapter, scope)
  const restoreSubscription = useRestoreBillingSubscription(adapter, scope)
  const updateSeats = useUpdateBillingSeats(adapter, scope)
  const [interval, setSelectedInterval] = useState<BillingInterval>('month')
  const [action, setAction] = useState<SubscriptionAction>()
  const [actionError, setActionError] = useState('')
  const subscription = state.data?.subscription
  const intervals = availableIntervals(plans.data ?? [])
  const resolvedInterval = intervals.includes(interval)
    ? interval
    : (intervals[0] ?? 'month')
  const isActionPending =
    cancelSubscription.isPending || restoreSubscription.isPending

  const handleAction = () => {
    if (!subscription || !action) return
    setActionError('')
    const mutation =
      action === 'cancel' ? cancelSubscription : restoreSubscription
    mutation.mutate(subscription.id, {
      onError: error => setActionError(error.message),
      onSuccess: result => {
        setAction(undefined)
        followBillingAction(result)
      }
    })
  }

  const openAction = (nextAction: SubscriptionAction) => {
    setActionError('')
    setAction(nextAction)
  }

  const closeAction = () => {
    setAction(undefined)
    setActionError('')
  }

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold">{localization.billing}</h2>
        <p className="text-muted text-sm">{localization.billingDescription}</p>
      </div>
      <BillingSubscriptionCard
        adapter={adapter}
        isPending={state.isPending}
        isPortalPending={portal.isPending}
        isSeatsPending={updateSeats.isPending}
        locale={locale.languageTag}
        localization={localization}
        onManage={() =>
          portal.mutate(undefined, { onSuccess: followBillingAction })
        }
        onOpenAction={openAction}
        onUpdateSeats={(subscriptionId, seats) =>
          updateSeats.mutate(
            { subscriptionId, seats },
            { onSuccess: followBillingAction }
          )
        }
        subscription={subscription}
        variant={variant}
      />
      <BillingUsageCard
        usage={state.data?.usage ?? []}
        localization={localization}
        variant={variant}
      />
      <BillingPlansSection
        checkoutPending={checkout.isPending}
        currentPlanId={subscription?.planId}
        interval={resolvedInterval}
        intervals={intervals}
        isPending={plans.isPending}
        localization={localization}
        onChoosePlan={(selectedPlan, priceId) =>
          checkout.mutate(
            {
              planId: selectedPlan.id,
              priceId,
              seats: selectedPlan.seatBased ? 1 : undefined
            },
            { onSuccess: followBillingAction }
          )
        }
        onIntervalChange={setSelectedInterval}
        plans={plans.data ?? []}
        variant={variant}
      />
      <SubscriptionActionDialog
        action={action}
        actionError={actionError}
        isPending={isActionPending}
        localization={localization}
        onClose={closeAction}
        onConfirm={handleAction}
      />
    </div>
  )
}

export const UserBillingSettings = (
  props: Omit<BillingSettingsProps, 'adapter' | 'scope'>
) => {
  const { authClient } = useAuth()
  const { data: session } = useSession(authClient)
  const { adapter } = useAuthPlugin(billingPlugin)
  if (!session?.user.id) return null
  return (
    <BillingSettings
      {...props}
      adapter={adapter}
      scope={{ type: 'user', userId: session.user.id }}
    />
  )
}

export const OrganizationBillingSettings = ({
  organizationId,
  organizationSlug,
  ...props
}: Omit<BillingSettingsProps, 'adapter' | 'scope'> & {
  organizationId: string
  organizationSlug: string
}) => {
  const { adapter } = useAuthPlugin(billingPlugin)
  if (!organizationId || !organizationSlug) return null

  return (
    <BillingSettings
      {...props}
      adapter={adapter}
      scope={{ type: 'organization', organizationId, organizationSlug }}
    />
  )
}
