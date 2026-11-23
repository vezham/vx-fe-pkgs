'use client'

import {
  QueryClient,
  QueryClientContext,
  QueryClientProvider,
  environmentManager
} from '@tanstack/react-query'
import {
  type PropsWithChildren,
  type ReactNode,
  useContext,
  useMemo,
  useState
} from 'react'

import {
  type AuthClient,
  type AuthConfig,
  type AuthConfigOptions,
  type NavigateFn,
  authQueryKeys,
  createAuthQueryRetryOptions,
  resolveAuthConfig
} from '@vezham/auth-ui-core'

import { MutationInvalidator } from '../mutation-invalidator'
import { AuthContext } from './auth-context'
import { FetchOptionsProvider } from './fetch-options-provider'

const authQueryRetryOptions = createAuthQueryRetryOptions(() =>
  environmentManager.isServer()
)

const fallbackQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000
    }
  }
})

const useShallowStableObject = <T extends object>(value: T): T => {
  const [stable, setStable] = useState(() => value)
  const previousKeys = Object.keys(stable)
  const nextKeys = Object.keys(value)
  const isStable =
    previousKeys.length === nextKeys.length &&
    nextKeys.every(key =>
      Object.is(Reflect.get(stable, key), Reflect.get(value, key))
    )

  if (stable !== value && !isStable) {
    setStable(() => value)
    return value
  }

  return stable
}

declare module '@vezham/auth-ui-core' {
  /** Widen `AdditionalField.label` to `ReactNode` in the React package. */
  interface AdditionalFieldRegister {
    label: ReactNode
  }

  /** Custom social provider icons can be SVG components or rendered nodes. */
  interface SocialProviderRegister {
    icon: ReactNode
  }
}

export type AuthProviderProps<TAuthClient extends AuthClient = AuthClient> =
  PropsWithChildren<
    Omit<AuthConfigOptions<TAuthClient>, 'navigate'> & {
      navigate: NavigateFn
      /** TanStack QueryClient to use for your application's queries */
      queryClient?: QueryClient
    }
  >

/**
 * Provides merged authentication configuration and a resolved React Query client to descendant components.
 *
 * The component merges the provided auth config with the library defaults,
 * resolves `redirectTo` from the current URL whenever it is read, wires a
 * QueryClient (prop, context, or fallback), applies retry defaults for auth
 * queries, and installs an error handler that surfaces query errors via the
 * configured toast. It then supplies the merged config via AuthContext and
 * wraps children with QueryClientProvider.
 *
 * @returns The children wrapped with AuthContext.Provider and QueryClientProvider configured for auth.
 */
export const AuthProvider = <TAuthClient extends AuthClient = AuthClient>({
  children,
  queryClient,
  ...config
}: AuthProviderProps<TAuthClient>) => {
  const stableConfig = useShallowStableObject(config)
  const mergedConfig = useMemo(() => {
    const { authClient, ...partialConfig } = stableConfig
    const resolvedConfig = resolveAuthConfig<TAuthClient>({
      ...partialConfig,
      authClient
    })
    const configuredRedirectTo = resolvedConfig.redirectTo

    Object.defineProperty(resolvedConfig, 'redirectTo', {
      configurable: true,
      enumerable: true,
      get: () =>
        // oxlint-disable-next-line typescript/prefer-optional-chain -- The typeof guard avoids a ReferenceError where window is undeclared; optional chaining would throw.
        (typeof window !== 'undefined' &&
          window.location &&
          new URLSearchParams(window.location.search)
            .get('redirectTo')
            ?.trim()) ||
        configuredRedirectTo
    })

    return resolvedConfig
  }, [stableConfig])

  const contextQueryClient = useContext(QueryClientContext)
  const resolvedQueryClient =
    queryClient ?? contextQueryClient ?? fallbackQueryClient

  const configuredQueryClient = useMemo(() => {
    // vx-bot/NOTE: Descendant queries resolve their defaults during render, so this
    // vx-bot/NOTE: idempotent initialization must happen before they render.
    resolvedQueryClient.setQueryDefaults(
      authQueryKeys.all,
      authQueryRetryOptions
    )

    return resolvedQueryClient
  }, [resolvedQueryClient])

  return (
    <QueryClientProvider client={configuredQueryClient}>
      <AuthContext.Provider value={mergedConfig}>
        <FetchOptionsProvider>
          <MutationInvalidator />

          {children}
        </FetchOptionsProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  )
}

/**
 * Accesses the current authentication configuration from AuthContext.
 *
 * UI packages widen the plugin type globally via the `Register` interface
 * (see module augmentation in `@vezham/react/auth`), so callers don't
 * need to pass a generic.
 *
 * @returns The merged authentication configuration provided by AuthProvider.
 * @throws If no AuthProvider is present in the component tree.
 */
export const useAuth = <TAuthClient extends AuthClient = AuthClient>() => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('[Vezham Auth] AuthProvider is required')
  }

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- the context erases the client type; callers name the plugin client they configured
  return context as AuthConfig<TAuthClient>
}
