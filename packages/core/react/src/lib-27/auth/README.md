# Vezham Auth

Adapted from Better Auth UI HeroUI 1.7.34, commit `f4dde31f636ed51c48c43e13e6e0982e74a9a2ce` (MIT). See [third-party notices](../../../THIRD_PARTY_NOTICES.md).

Import `Auth` from `@vezham/react/auth`. Compose `Auth.Provider`, `Auth.SignIn`, `Auth.User.Button`, and `Auth.Settings.Security`. Optional UI features live under `@vezham/react/auth/plugins/<feature>`, expose a compound namespace and `.plugin(options)`, and are absent from the core entry. Email templates use `@vezham/react/auth/email`. No upstream flat aliases are published.

The full reference UI is included. Better Auth supplies the backend and typed client; the local workspace packages `@vezham/auth-ui-core` and `@vezham/auth-ui-react` own validation, localization, session queries, mutations, adapters, plugin contracts, and server helpers. Register matching server, client, and UI plugins. Configuration, routing, delivery, database, and provider credentials belong to the application.

| Feature              | Public namespace      |
| -------------------- | --------------------- |
| admin                | `Admin`               |
| agent-auth           | `AgentAuth`           |
| anonymous            | `Anonymous`           |
| api-key              | `ApiKey`              |
| billing              | `Billing`             |
| dash                 | `Activity`            |
| delete-user          | `DeleteUser`          |
| device-authorization | `DeviceAuthorization` |
| email-otp            | `EmailOtp`            |
| last-login-method    | `LastLoginMethod`     |
| magic-link           | `MagicLink`           |
| multi-session        | `MultiSession`        |
| oauth-provider       | `OAuthProvider`       |
| organization         | `Organization`        |
| passkey              | `Passkey`             |
| phone-number         | `PhoneNumber`         |
| siwe                 | `Wallet`              |
| sso                  | `Sso`                 |
| theme                | `AuthTheme`           |
| two-factor           | `TwoFactor`           |
| username             | `Username`            |

Use the developers app's Authentication docs for setup, public parts, examples, and feature guides. The ported behavior suite and public-entry tests run with `pnpm nx run react:test src/lib-27/auth`.

`@vezham/auth-ui-core` and `@vezham/auth-ui-react` contain the headless implementation locally in `packages/auth-ui/{core,react}` and use workspace links. No `@better-auth-ui/*` dependency is used. The `@vezham/auth` engine and plugin SDK dependencies remain npm aliases declared in `pnpm-workspace.yaml`; update their catalog targets and upstream peer overrides together when the engine forks are published.
