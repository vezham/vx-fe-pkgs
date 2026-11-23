import { getAuthResultMessage, parseAuthResult } from '@vezham/auth-ui-core'
import { useAuth } from '@vezham/auth-ui-react'
import {
  CheckCircle as CircleCheck,
  CloseCircle as CircleXmark,
  DangerTriangle as TriangleExclamation
} from '@vezham/icons-react'
import {
  Button,
  Card,
  type CardProps,
  cn,
  useIsHydrated
} from '@vezham/react-v3'

type Props = {
  className?: string
  fallbackIntent: 'danger' | 'success'
  variant?: CardProps['variant']
}

const AuthResultView = ({ className, fallbackIntent, variant }: Props) => {
  const { basePaths, localization, navigate, viewPaths } = useAuth()
  const isHydrated = useIsHydrated()
  const result = parseAuthResult(
    isHydrated ? window.location.search : '',
    fallbackIntent
  )

  const message = getAuthResultMessage(result, localization)
  const action = (() => {
    switch (result.action) {
      case 'accountSettings':
        return {
          label: localization.auth.callbackViewAccountSettings,
          to: `${basePaths.settings}/${viewPaths.settings.security}`
        }
      case 'continue':
        return {
          label: localization.auth.callbackContinue,
          to: result.redirectTo ?? '/'
        }
      case 'forgotPassword':
        return {
          label: localization.auth.forgotPassword,
          to: `${basePaths.auth}/${viewPaths.auth.forgotPassword}`
        }
      case 'signUp':
        return {
          label: localization.auth.signUp,
          to: `${basePaths.auth}/${viewPaths.auth.signUp}`
        }
      case 'verifyEmail':
        return {
          label: localization.auth.verifyEmail,
          to: `${basePaths.auth}/${viewPaths.auth.verifyEmail}`
        }
      case 'signIn':
      default:
        return {
          label: localization.auth.signIn,
          to: `${basePaths.auth}/${viewPaths.auth.signIn}`
        }
    }
  })()
  const Icon =
    result.intent === 'success'
      ? CircleCheck
      : result.intent === 'warning'
        ? TriangleExclamation
        : CircleXmark

  return (
    <Card
      className={cn('w-full max-w-sm gap-4 md:p-6', className)}
      variant={variant}>
      <Card.Header className="items-center text-center">
        <Icon
          aria-hidden="true"
          className={cn(
            'mb-2 size-10',
            result.intent === 'success'
              ? 'text-success'
              : result.intent === 'warning'
                ? 'text-warning'
                : 'text-danger'
          )}
        />
        <Card.Title className="text-xl font-semibold">
          {message.title}
        </Card.Title>
        <Card.Description>{message.description}</Card.Description>
      </Card.Header>
      <Card.Footer>
        <Button className="w-full" onPress={() => navigate({ to: action.to })}>
          {action.label}
        </Button>
      </Card.Footer>
    </Card>
  )
}

export const AuthCallback = (props: Omit<Props, 'fallbackIntent'>) => {
  return <AuthResultView {...props} fallbackIntent="success" />
}

export const AuthError = (props: Omit<Props, 'fallbackIntent'>) => {
  return <AuthResultView {...props} fallbackIntent="danger" />
}
