import { QueryClient } from '@tanstack/react-query'
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { Description } from '@vezham/react-v3'
import { Auth, type AuthProviderProps } from '@vezham/react/auth'

import { type PreviewClient, createPreviewClient } from './demo-client'

type DemoContextValue = {
  authClient: PreviewClient
  navigate: AuthProviderProps['navigate']
  theme: string
  setTheme: (theme: string) => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

export const DemoProvider = ({
  children,
  authenticated = false
}: {
  children: ReactNode
  authenticated?: boolean
}) => {
  const [authClient] = useState(() => createPreviewClient(authenticated))
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false }
        }
      })
  )
  const [destination, setDestination] = useState<string | null>(null)
  const [theme, setTheme] = useState('system')
  const navigate = useCallback<AuthProviderProps['navigate']>(({ to }) => {
    if (to.includes('/auth/') || to.includes('/settings')) setDestination(to)
  }, [])
  const segment = destination
    ?.split(/[?#]/, 1)[0]
    .split('/')
    .filter(Boolean)
    .pop()
  useEffect(() => () => queryClient.clear(), [queryClient])

  return (
    <DemoContext.Provider value={{ authClient, navigate, theme, setTheme }}>
      <div
        className="flex w-full max-w-xl flex-col items-center gap-5"
        onClickCapture={event => {
          const target = event.target
          if (!(target instanceof Element)) return
          const href = target.closest('a')?.getAttribute('href')
          if (href === '#') event.preventDefault()
          else if (
            href?.startsWith('/auth/') ||
            href?.startsWith('/settings')
          ) {
            event.preventDefault()
            navigate({ to: href })
          }
        }}>
        <Description className="text-center">
          Local preview. Use ada@example.com to sign in. Account changes are
          simulated.
        </Description>
        <Auth.Provider
          authClient={authClient}
          queryClient={queryClient}
          navigate={navigate}
          socialProviders={['github', 'google']}
          redirectTo="/settings/security">
          {destination?.includes('/settings') ? (
            <Auth.Settings path={segment ?? 'account'} />
          ) : destination ? (
            <Auth path={segment ?? 'sign-in'} />
          ) : (
            children
          )}
        </Auth.Provider>
      </div>
    </DemoContext.Provider>
  )
}

export const useDemo = () => {
  const value = useContext(DemoContext)
  if (!value) throw new Error('Auth examples require DemoProvider')
  return value
}

export const useDemoTheme = () => {
  const { theme, setTheme } = useDemo()
  return { theme, setTheme, themes: ['system', 'light', 'dark'] }
}
