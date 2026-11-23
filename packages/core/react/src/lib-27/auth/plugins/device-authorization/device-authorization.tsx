import {
  type ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'

import type {
  DeviceAuthorizationAuthClient,
  DeviceAuthorizationLocalization
} from '@vezham/auth-ui-core/plugins/device-authorization'
import { deviceAuthorizationPlugin } from '@vezham/auth-ui-core/plugins/device-authorization'
import { useAuth, useAuthPlugin, useSession } from '@vezham/auth-ui-react'
import {
  useApproveDevice,
  useDenyDevice,
  useVerifyDeviceCode
} from '@vezham/auth-ui-react/plugins/device-authorization'
import {
  CheckCircle as CircleCheck,
  CloseCircle as CircleXmark
} from '@vezham/icons-react'
import {
  Button,
  Card,
  type CardProps,
  InputOTP,
  Label,
  REGEXP_ONLY_DIGITS_AND_CHARS,
  Spinner,
  cn,
  useIsHydrated
} from '@vezham/react-v3'

import { submitAuthForm, useAuthForm } from '../../auth-form'
import { UserAvatar } from '../../user/user-avatar'

type DeviceAuthorizationStep = 'code' | 'approval' | 'approved' | 'denied'

type DeviceAuthorizationState = {
  step: DeviceAuthorizationStep
  codeError: string
}

type DeviceAuthorizationAction =
  | { type: 'codeChanged' }
  | { type: 'verificationFailed'; message: string }
  | { type: 'verificationSucceeded'; status: string }
  | { type: 'approved' }
  | { type: 'denied' }

const initialDeviceAuthorizationState: DeviceAuthorizationState = {
  step: 'code',
  codeError: ''
}

const deviceAuthorizationReducer = (
  state: DeviceAuthorizationState,
  action: DeviceAuthorizationAction
): DeviceAuthorizationState => {
  switch (action.type) {
    case 'codeChanged':
      return state.codeError ? { ...state, codeError: '' } : state
    case 'verificationFailed':
      return { step: 'code', codeError: action.message }
    case 'verificationSucceeded':
      if (action.status === 'approved') {
        return { step: 'approved', codeError: '' }
      }
      if (action.status === 'denied') {
        return { step: 'denied', codeError: '' }
      }
      return { step: 'approval', codeError: '' }
    case 'approved':
      return { step: 'approved', codeError: '' }
    case 'denied':
      return { step: 'denied', codeError: '' }
    default:
      return action satisfies never
  }
}

const normalizeDeviceCode = (value: string) => {
  return value.replaceAll('-', '').trim().toUpperCase()
}

const createDeviceCodeSlots = (length: number) => {
  return Array.from({ length }, (_, slotIndex) => ({
    id: `device-code-character-${String(slotIndex + 1)}`,
    index: slotIndex
  }))
}

export type DeviceAuthorizationProps = {
  className?: string
  variant?: CardProps['variant']
}

/**
 * Render Better Auth's browser-side device authorization ceremony.
 *
 * The view accepts a user code, sends unauthenticated users through sign-in
 * with a return URL, verifies and claims the code for the current session,
 * and lets the user approve or deny the device.
 *
 * @param className - Additional CSS classes applied to the card.
 * @param variant - HeroUI card variant.
 */
export const DeviceAuthorization = ({
  className,
  variant
}: DeviceAuthorizationProps) => {
  const { authClient, basePaths, navigate, redirectTo, viewPaths } =
    useAuth<DeviceAuthorizationAuthClient>()
  const {
    localization,
    userCodeLength,
    viewPaths: deviceAuthorizationViewPaths
  } = useAuthPlugin(deviceAuthorizationPlugin)

  const deviceAuthClient = authClient
  const { data: session, isPending: isSessionPending } =
    useSession(deviceAuthClient)
  const isHydrated = useIsHydrated()
  const [enteredCode, setUserCode] = useState<string>()
  const initialCode = isHydrated
    ? (new URLSearchParams(window.location.search).get('user_code') ?? '')
    : ''
  const userCode =
    enteredCode ??
    normalizeDeviceCode(initialCode)
      .replaceAll(/[^A-Z0-9]/g, '')
      .slice(0, userCodeLength)
  const [authorizedCode, setAuthorizedCode] = useState('')
  const [state, dispatch] = useReducer(
    deviceAuthorizationReducer,
    initialDeviceAuthorizationState
  )
  const submittedCodeRef = useRef<string | null>(null)

  const handleAuthorizationError = () => {
    dispatch({
      type: 'verificationFailed',
      message: localization.invalidDeviceCode
    })
  }

  const { mutateAsync: verifyDeviceCode, isPending: isVerifying } =
    useVerifyDeviceCode(deviceAuthClient, {
      onError: handleAuthorizationError,
      onSuccess: ({ status }) => {
        dispatch({ type: 'verificationSucceeded', status })
      }
    })

  const { mutate: approveDevice, isPending: isApproving } = useApproveDevice(
    deviceAuthClient,
    {
      onError: handleAuthorizationError,
      onSuccess: () => dispatch({ type: 'approved' })
    }
  )

  const { mutate: denyDevice, isPending: isDenying } = useDenyDevice(
    deviceAuthClient,
    {
      onError: handleAuthorizationError,
      onSuccess: () => dispatch({ type: 'denied' })
    }
  )

  const handleCodeChange = (value: string) => {
    const nextCode = normalizeDeviceCode(value)
      .replaceAll(/[^A-Z0-9]/g, '')
      .slice(0, userCodeLength)

    if (nextCode !== submittedCodeRef.current) {
      submittedCodeRef.current = null
    }

    setUserCode(nextCode)
    dispatch({ type: 'codeChanged' })
  }

  const submitCode = useCallback(
    async (completedCode: string) => {
      const normalizedCode = normalizeDeviceCode(completedCode)

      if (
        isSessionPending ||
        isVerifying ||
        normalizedCode.length !== userCodeLength ||
        normalizedCode === submittedCodeRef.current
      ) {
        return
      }

      submittedCodeRef.current = normalizedCode
      setAuthorizedCode(normalizedCode)

      if (!session) {
        const verificationPath = `${basePaths.auth}/${deviceAuthorizationViewPaths.auth.deviceAuthorization}?user_code=${encodeURIComponent(normalizedCode)}`
        const signInPath = `${basePaths.auth}/${viewPaths.auth.signIn}?redirectTo=${encodeURIComponent(verificationPath)}`
        navigate({ to: signInPath })
        return
      }

      await verifyDeviceCode({
        query: { user_code: normalizedCode }
      })
    },
    [
      basePaths.auth,
      deviceAuthorizationViewPaths.auth.deviceAuthorization,
      isSessionPending,
      isVerifying,
      navigate,
      session,
      userCodeLength,
      verifyDeviceCode,
      viewPaths.auth.signIn
    ]
  )

  const handleSubmit = useCallback(
    async (code: string) => {
      const normalizedCode = normalizeDeviceCode(code)
      if (normalizedCode.length !== userCodeLength) {
        dispatch({
          type: 'verificationFailed',
          message: localization.invalidDeviceCode
        })
        return
      }
      await submitCode(normalizedCode)
    },
    [localization.invalidDeviceCode, submitCode, userCodeLength]
  )

  useEffect(() => {
    if (
      !isSessionPending &&
      normalizeDeviceCode(userCode).length === userCodeLength
    ) {
      void submitCode(userCode).catch(() => undefined)
    }
  }, [isSessionPending, submitCode, userCode, userCodeLength])

  const cardClassName = cn('w-full max-w-sm gap-4 md:p-6', className) ?? ''

  if (state.step === 'approval' && session) {
    return (
      <DeviceApproval
        className={className ?? ''}
        localization={localization}
        userCode={authorizedCode}
        user={session.user}
        variant={variant}
        isApproving={isApproving}
        isDenying={isDenying}
        onApprove={() => approveDevice({ userCode: authorizedCode })}
        onDeny={() => denyDevice({ userCode: authorizedCode })}
      />
    )
  }

  if (state.step === 'approved' || state.step === 'denied') {
    return (
      <DeviceAuthorizationResult
        className={cardClassName}
        localization={localization}
        status={state.step}
        variant={variant}
        action={
          <Button
            className="w-full"
            onPress={() => navigate({ to: redirectTo })}>
            {localization.returnToApplication}
          </Button>
        }
      />
    )
  }

  return (
    <DeviceCodeForm
      className={cardClassName}
      codeError={state.codeError}
      isSessionPending={isSessionPending}
      isVerifying={isVerifying}
      localization={localization}
      initialUserCode={userCode}
      userCodeLength={userCodeLength}
      variant={variant}
      onCodeChange={handleCodeChange}
      onSubmitCode={handleSubmit}
    />
  )
}

type DeviceCodeFormProps = {
  className: string
  codeError: string
  isSessionPending: boolean
  isVerifying: boolean
  localization: DeviceAuthorizationLocalization
  initialUserCode: string
  userCodeLength: number
  variant?: CardProps['variant']
  onCodeChange: (value: string) => void
  onSubmitCode: (code: string) => Promise<void>
}

function DeviceCodeForm({
  className,
  codeError,
  isSessionPending,
  isVerifying,
  localization,
  initialUserCode,
  userCodeLength,
  variant,
  onCodeChange,
  onSubmitCode
}: DeviceCodeFormProps) {
  const slots = createDeviceCodeSlots(userCodeLength)
  const groupBreak = Math.ceil(userCodeLength / 2)
  const firstGroup = slots.slice(0, groupBreak)
  const secondGroup = slots.slice(groupBreak)
  const errorId = 'device-code-error'
  const form = useAuthForm({
    defaultValues: { userCode: initialUserCode },
    onSubmit: async ({ value }) => onSubmitCode(value.userCode)
  })

  useEffect(() => {
    form.setFieldValue('userCode', initialUserCode)
    if (initialUserCode.length === userCodeLength) {
      void submitAuthForm(form, localization.invalidDeviceCode)
    }
  }, [form, initialUserCode, localization.invalidDeviceCode, userCodeLength])

  return (
    <Card className={className} variant={variant}>
      <Card.Header>
        <Card.Title className="mb-1 text-xl font-semibold">
          {localization.deviceAuthorization}
        </Card.Title>
        <Card.Description>
          {localization.deviceAuthorizationDescription}
        </Card.Description>
      </Card.Header>

      <Card.Content>
        <form.AppForm>
          <form.AuthFormRoot className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="device-code">{localization.deviceCode}</Label>

              <form.AppField name="userCode">
                {field => (
                  <InputOTP
                    id="device-code"
                    aria-describedby={codeError ? errorId : undefined}
                    aria-label={localization.deviceCode}
                    className="w-full flex-col items-center justify-center gap-2 sm:flex-row"
                    inputMode="text"
                    isDisabled={isVerifying}
                    isInvalid={Boolean(codeError)}
                    maxLength={userCodeLength}
                    name={field.name}
                    pasteTransformer={normalizeDeviceCode}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    value={field.state.value}
                    variant={
                      variant === 'transparent' ? 'primary' : 'secondary'
                    }
                    onChange={value => {
                      const nextCode = normalizeDeviceCode(value)
                        .replaceAll(/[^A-Z0-9]/g, '')
                        .slice(0, userCodeLength)
                      field.handleChange(nextCode)
                      onCodeChange(nextCode)
                      if (nextCode.length === userCodeLength) {
                        void submitAuthForm(
                          form,
                          localization.invalidDeviceCode
                        )
                      }
                    }}>
                    <InputOTP.Group className="gap-1">
                      {firstGroup.map(slot => (
                        <InputOTP.Slot
                          className="size-8 text-sm sm:size-9"
                          key={slot.id}
                          index={slot.index}
                        />
                      ))}
                    </InputOTP.Group>

                    {secondGroup.length > 0 ? (
                      <>
                        <InputOTP.Separator className="hidden sm:block" />
                        <InputOTP.Group className="gap-1">
                          {secondGroup.map(slot => (
                            <InputOTP.Slot
                              className="size-8 text-sm sm:size-9"
                              key={slot.id}
                              index={slot.index}
                            />
                          ))}
                        </InputOTP.Group>
                      </>
                    ) : null}
                  </InputOTP>
                )}
              </form.AppField>

              <span
                className="field-error"
                data-visible={Boolean(codeError)}
                id={errorId}>
                {codeError}
              </span>
            </div>

            <form.Subscribe
              selector={state =>
                state.values.userCode.length === userCodeLength
              }>
              {complete => (
                <form.AuthFormSubmitButton
                  isPending={isVerifying}
                  className="w-full"
                  isDisabled={!complete || isSessionPending || isVerifying}>
                  {localization.continue}
                </form.AuthFormSubmitButton>
              )}
            </form.Subscribe>
            <form.AuthFormServerError />
          </form.AuthFormRoot>
        </form.AppForm>
      </Card.Content>
    </Card>
  )
}

type DeviceApprovalProps = {
  className: string
  isApproving: boolean
  isDenying: boolean
  localization: DeviceAuthorizationLocalization
  user: {
    email: string
    name: string
  }
  userCode: string
  variant?: CardProps['variant']
  onApprove: () => void
  onDeny: () => void
}

function DeviceApproval({
  className,
  isApproving,
  isDenying,
  localization,
  user,
  userCode,
  variant,
  onApprove,
  onDeny
}: DeviceApprovalProps) {
  const isPending = isApproving || isDenying

  return (
    <Card
      className={cn('w-full max-w-lg gap-0 overflow-hidden p-0', className)}
      variant={variant}>
      <Card.Header className="grid justify-items-center gap-5 p-6 text-center">
        <UserAvatar className="size-16" user={user} />
        <div className="grid gap-1">
          <Card.Title className="text-xl font-semibold">
            {localization.approveDevice}
          </Card.Title>
          <Card.Description>
            {localization.approveDeviceDescription}
          </Card.Description>
        </div>
        <div className="text-muted grid max-w-full gap-1 text-sm">
          <span>{localization.signedInAs}</span>
          <span className="text-foreground font-medium break-all">
            {user.name || user.email}
          </span>
          {user.name ? <span className="break-all">{user.email}</span> : null}
        </div>
      </Card.Header>
      <Card.Content className="px-4 pb-6 sm:px-6">
        <div className="bg-surface-secondary grid justify-items-center gap-2 rounded-lg p-5">
          <p className="text-muted text-sm">{localization.deviceCode}</p>
          <p className="font-mono text-2xl font-semibold tracking-widest">
            {userCode}
          </p>
        </div>
      </Card.Content>
      <Card.Footer className="border-separator grid grid-cols-2 gap-3 border-t p-4 sm:p-6">
        <Button
          className="h-11 w-full"
          isDisabled={isPending}
          variant="secondary"
          onPress={onDeny}>
          {isDenying ? <Spinner color="current" size="sm" /> : null}
          {localization.deny}
        </Button>
        <Button
          className="h-11 w-full"
          isDisabled={isPending}
          onPress={onApprove}>
          {isApproving ? <Spinner color="current" size="sm" /> : null}
          {localization.approve}
        </Button>
      </Card.Footer>
    </Card>
  )
}

type DeviceAuthorizationResultProps = {
  action: ReactNode
  className: string
  localization: DeviceAuthorizationLocalization
  status: 'approved' | 'denied'
  variant?: CardProps['variant']
}

function DeviceAuthorizationResult({
  action,
  className,
  localization,
  status,
  variant
}: DeviceAuthorizationResultProps) {
  const approved = status === 'approved'
  const Icon = approved ? CircleCheck : CircleXmark

  return (
    <Card className={className} variant={variant}>
      <Card.Header className="items-center text-center">
        <Icon
          aria-hidden="true"
          className={cn(
            'mb-2 size-10',
            approved ? 'text-success' : 'text-danger'
          )}
        />
        <Card.Title className="text-xl font-semibold">
          {approved ? localization.deviceApproved : localization.deviceDenied}
        </Card.Title>
        <Card.Description>
          {approved
            ? localization.deviceApprovedDescription
            : localization.deviceDeniedDescription}
        </Card.Description>
      </Card.Header>

      <Card.Footer>{action}</Card.Footer>
    </Card>
  )
}
