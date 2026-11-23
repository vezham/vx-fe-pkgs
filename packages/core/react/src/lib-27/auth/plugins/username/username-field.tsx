import { useDebouncer } from '@tanstack/react-pacer'

import { getFormFieldErrorMessage } from '@vezham/auth-ui-core'
import type { UsernameAuthClient } from '@vezham/auth-ui-core/plugins/username'
import { usernamePlugin } from '@vezham/auth-ui-core/plugins/username'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useIsUsernameAvailable } from '@vezham/auth-ui-react/plugins/username'
import { CheckRead as Check, Close as Xmark } from '@vezham/icons-react'
import {
  FieldError,
  InputGroup,
  Label,
  Spinner,
  TextField
} from '@vezham/react-v3'

import type { AdditionalFieldProps } from '../../additional-field'

/**
 * Renderer for the `username` additional field. Owns availability checking,
 * length limits, and visual indicators. `FieldError` automatically surfaces
 * native validation messages. Availability feedback is shown via the icon and
 * aria-label without affecting the field's invalid state.
 */
export const UsernameField = ({
  name,
  field,
  value,
  onBlur,
  onChange,
  isInvalid,
  errors,
  isPending,
  variant
}: AdditionalFieldProps) => {
  const { authClient } = useAuth<UsernameAuthClient>()
  const {
    localization,
    minUsernameLength,
    maxUsernameLength,
    isUsernameAvailable: checkAvailability,
    usernamePrefix
  } = useAuthPlugin(usernamePlugin)

  const currentUsername = String(field.defaultValue ?? '')
  const username = typeof value === 'string' ? value : ''
  const errorMessage = getFormFieldErrorMessage(errors ?? [])

  const {
    mutate: requestAvailability,
    data: availability,
    error: availabilityError,
    reset: resetAvailability
  } = useIsUsernameAvailable(authClient, {
    // vx-bot/NOTE: Bypass global error toast
    onError: () => undefined
  })

  const debouncer = useDebouncer(
    (next: string) => {
      const trimmed = next.trim()
      // vx-bot/NOTE: Skip blank input and the user's own current username (profile view).
      if (!trimmed || trimmed === currentUsername) {
        resetAvailability()
        return
      }

      requestAvailability({ username: trimmed })
    },
    { wait: 500 }
  )

  const handleChange = (next: string) => {
    onChange(next || null)
    resetAvailability()

    if (checkAvailability) {
      debouncer.maybeExecute(next)
    }
  }

  const isCheckingAvailability =
    !!checkAvailability &&
    !!username.trim() &&
    username.trim() !== currentUsername

  const { localization: authLocalization } = useAuth()

  return (
    <TextField
      name={name}
      type="text"
      autoComplete="username"
      minLength={minUsernameLength}
      maxLength={maxUsernameLength}
      isDisabled={isPending}
      isReadOnly={field.readOnly}
      value={username}
      onBlur={onBlur}
      onChange={handleChange}
      isInvalid={isInvalid}
      validate={val => {
        if (!val) {
          if (field.required) return authLocalization.auth.fieldRequired
          return undefined
        }
        if (minUsernameLength && val.length < minUsernameLength)
          return authLocalization.auth.tooShort.replace(
            '{{min}}',
            String(minUsernameLength)
          )
        if (maxUsernameLength && val.length > maxUsernameLength)
          return authLocalization.auth.tooLong.replace(
            '{{max}}',
            String(maxUsernameLength)
          )
        return undefined
      }}>
      <Label>{field.label}</Label>

      <InputGroup variant={variant === 'transparent' ? 'primary' : 'secondary'}>
        {usernamePrefix && (
          <InputGroup.Prefix className="text-muted pr-1.5">
            {usernamePrefix}
          </InputGroup.Prefix>
        )}

        <InputGroup.Input
          placeholder={field.placeholder}
          required={field.required}
        />

        {isCheckingAvailability && (
          <InputGroup.Suffix
            aria-label={
              availability?.available
                ? localization.usernameAvailable
                : availability?.available === false
                  ? localization.usernameTaken
                  : undefined
            }
            className="px-2">
            {availability?.available ? (
              <Check size={16} className="text-success" />
            ) : availabilityError || availability?.available === false ? (
              <Xmark size={16} className="text-danger" />
            ) : (
              <Spinner size="sm" color="current" />
            )}
          </InputGroup.Suffix>
        )}
      </InputGroup>

      <FieldError>{errorMessage}</FieldError>
    </TextField>
  )
}
