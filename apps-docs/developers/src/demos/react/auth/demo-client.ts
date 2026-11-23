import { apiKeyClient } from '@vezham/auth-api-key/client'
import { passkeyClient } from '@vezham/auth-passkey/client'
import {
  deviceAuthorizationClient,
  magicLinkClient,
  multiSessionClient,
  organizationClient,
  usernameClient
} from '@vezham/auth/client/plugins'
import { type ReactAuthClient, createAuthClient } from '@vezham/auth/react'

export const demoUser = {
  id: 'auth-preview-user',
  name: 'Ada Lovelace',
  username: 'ada',
  displayUsername: 'ada',
  email: 'ada@example.com',
  emailVerified: true,
  image: null,
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-01-01')
}

type PreviewPlugins = [
  ReturnType<typeof apiKeyClient>,
  ReturnType<typeof passkeyClient>,
  ReturnType<typeof organizationClient>,
  ReturnType<typeof usernameClient>,
  ReturnType<typeof magicLinkClient>,
  ReturnType<typeof multiSessionClient>,
  ReturnType<typeof deviceAuthorizationClient>
]

export type PreviewClient = ReactAuthClient<{ plugins: PreviewPlugins }>

export const createPreviewClient = (authenticated: boolean): PreviewClient => {
  let signedIn = authenticated
  const organization = {
    id: 'preview-organization',
    name: 'Analytical Engines',
    slug: 'analytical-engines',
    logo: null,
    createdAt: new Date('2026-01-01')
  }
  const member = {
    id: 'preview-member',
    organizationId: organization.id,
    userId: demoUser.id,
    role: 'owner',
    createdAt: new Date('2026-01-01'),
    user: demoUser
  }
  const session = {
    user: demoUser,
    session: {
      id: 'auth-preview-session',
      token: 'local-preview-token',
      userId: demoUser.id,
      activeOrganizationId: organization.id,
      expiresAt: new Date('2099-01-01'),
      createdAt: new Date('2026-01-01'),
      updatedAt: new Date('2026-01-01'),
      ipAddress: '127.0.0.1',
      userAgent: 'Vezham authentication preview'
    }
  }

  return createAuthClient<{
    plugins: PreviewPlugins
    baseURL: string
    fetchOptions: { customFetchImpl: typeof fetch }
  }>({
    baseURL: 'https://auth-preview.invalid',
    plugins: [
      apiKeyClient(),
      passkeyClient(),
      organizationClient({ teams: { enabled: true } }),
      usernameClient(),
      magicLinkClient(),
      multiSessionClient(),
      deviceAuthorizationClient()
    ],
    fetchOptions: {
      customFetchImpl: async (input, init) => {
        const url = new URL(
          input instanceof Request ? input.url : String(input)
        )
        const path = url.pathname
        if (path.endsWith('/get-session'))
          return Response.json(signedIn ? session : null)
        if (path.endsWith('/list-sessions'))
          return Response.json(signedIn ? [session.session] : [])
        if (path.endsWith('/list-accounts'))
          return Response.json([
            {
              id: 'credential',
              providerId: 'credential',
              accountId: demoUser.id
            }
          ])
        if (path.endsWith('/sign-out')) {
          signedIn = false
          return Response.json({ success: true })
        }
        if (
          path.endsWith('/sign-in/email') ||
          path.endsWith('/sign-in/username')
        ) {
          const values = JSON.parse(String(init?.body)) as {
            email?: string
            username?: string
          }
          if (
            values.email?.toLowerCase() === demoUser.email ||
            values.username === demoUser.username
          ) {
            signedIn = true
            return Response.json({
              token: session.session.token,
              user: demoUser
            })
          }
        }
        if (path.endsWith('/is-username-available'))
          return Response.json({ available: true })
        if (path.endsWith('/multi-session/list-device-sessions'))
          return Response.json([session])
        if (path.endsWith('/api-key/list'))
          return Response.json({ apiKeys: [], total: 0, limit: 10, offset: 0 })
        if (path.endsWith('/passkey/list-user-passkeys'))
          return Response.json([])
        if (path.endsWith('/organization/list'))
          return Response.json([organization])
        if (path.endsWith('/organization/get-full-organization'))
          return Response.json({
            ...organization,
            members: [member],
            invitations: [],
            teams: []
          })
        if (path.endsWith('/organization/get-active-member'))
          return Response.json(member)
        if (path.endsWith('/organization/get-active-member-role'))
          return Response.json({ role: member.role })
        if (path.endsWith('/organization/list-members'))
          return Response.json({ members: [member], total: 1 })
        if (path.endsWith('/organization/has-permission'))
          return Response.json({ success: true, error: null })
        if (
          /\/organization\/(list-invitations|list-user-invitations|list-teams|list-user-teams|list-organization-teams|list-roles)$/.test(
            path
          )
        )
          return Response.json([])
        return Response.json(
          {
            code: 'PREVIEW_VALIDATION',
            message:
              'Preview response: use ada@example.com to sign in. Account changes are disabled in this demo.'
          },
          { status: 400 }
        )
      }
    }
  })
}
