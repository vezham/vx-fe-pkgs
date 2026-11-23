import { useDebouncer } from '@tanstack/react-pacer'
import { useEffect } from 'react'

import type { OrganizationAuthClient } from '@vezham/auth-ui-core/plugins/organization'
import { organizationPlugin } from '@vezham/auth-ui-core/plugins/organization'
import { useAuth, useAuthPlugin } from '@vezham/auth-ui-react'
import { useCheckSlug } from '@vezham/auth-ui-react/plugins/organization'
import { CheckRead as Check, Close as Xmark } from '@vezham/icons-react'
import {
  FieldError,
  InputGroup,
  type InputProps,
  Label,
  Spinner,
  TextField,
  type TextFieldProps
} from '@vezham/react-v3'

import { sanitizeSlug } from './sanitize-slug'

/** Props for the {@link SlugField} component. */
export type SlugFieldProps = {
  value: string
  onChange: (value: string) => void
  currentSlug?: string
  isDisabled?: boolean
  variant?: InputProps['variant']
}

/**
 * Organization slug field with debounced availability checking.
 */
export const SlugField = ({
  value,
  onChange,
  currentSlug,
  variant,
  ...props
}: SlugFieldProps & TextFieldProps) => {
  const { authClient, localization: authLocalization } =
    useAuth<OrganizationAuthClient>()
  const {
    localization,
    checkSlug: checkSlugEnabled,
    slugPrefix
  } = useAuthPlugin(organizationPlugin)

  const {
    mutate: checkSlug,
    data: checkSlugData,
    error: checkSlugError,
    reset: resetCheckSlug
  } = useCheckSlug(authClient)

  const debouncer = useDebouncer(
    nextValue => {
      if (
        !checkSlugEnabled ||
        !nextValue.trim() ||
        nextValue.trim() === currentSlug
      )
        return

      checkSlug({ slug: nextValue.trim() })
    },
    { wait: 500 }
  )

  useEffect(() => {
    if (!checkSlugEnabled) return

    resetCheckSlug()
    debouncer.maybeExecute(value)
  }, [checkSlugEnabled, value, debouncer, resetCheckSlug])

  const handleChange = (next: string) => {
    onChange(sanitizeSlug(next))
  }

  return (
    <TextField
      id="slug"
      name="slug"
      {...props}
      value={value}
      onChange={handleChange}
      validate={val => {
        if (!val) return authLocalization.auth.fieldRequired
        return undefined
      }}>
      <Label>{localization.slug}</Label>

      <InputGroup variant={variant}>
        {slugPrefix && (
          <InputGroup.Prefix className="text-muted pr-1.5">
            {slugPrefix}
          </InputGroup.Prefix>
        )}

        <InputGroup.Input placeholder={localization.slugPlaceholder} required />

        {checkSlugEnabled && !!value.trim() && value.trim() !== currentSlug && (
          <InputGroup.Suffix className="px-2">
            {checkSlugData?.status ? (
              <Check size={16} className="text-success" />
            ) : checkSlugError ? (
              <Xmark size={16} className="text-danger" />
            ) : (
              <Spinner size="sm" color="current" />
            )}
          </InputGroup.Suffix>
        )}
      </InputGroup>

      <FieldError />
    </TextField>
  )
}
