import { useEffect, useState } from 'react'

import { Button, Modal } from '@vezham/react-v3'
import type { TamizhiAPIClient } from '@vezham/tamizhi-client'
import type { TamizhiAPI } from '@vezham/tamizhi-contracts'

export const AccountControls = ({ api }: { api: TamizhiAPIClient }) => {
  const [session, setSession] = useState<TamizhiAPI.AuthSession | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [connectionNotice, setConnectionNotice] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    void api
      .authSession(controller.signal)
      .then(user => {
        setSession(user)
        const url = new URL(window.location.href)
        const connection = url.searchParams.get('tamizhi_oauth')
        if (connection === 'connected')
          setConnectionNotice(
            'Google account connected. Its models are now available.'
          )
        if (connection === 'failed')
          setError('Google connection was not saved. Try again in AI settings.')
        if (connection) {
          url.searchParams.delete('tamizhi_oauth')
          window.history.replaceState(window.history.state, '', url)
        }
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setError('Unable to check your sign-in status.')
      })
    return () => controller.abort()
  }, [api])
  const logout = async () => {
    setBusy(true)
    setError(null)
    try {
      await api.logout()
      window.location.reload()
    } catch {
      setError('Unable to sign out. Try again.')
      setBusy(false)
    }
  }
  return (
    <div
      className="flex shrink-0 flex-wrap items-center justify-end gap-2 px-4 py-2 text-sm"
      aria-label="Tamizhi account">
      {connectionNotice && (
        <p role="status" className="text-muted text-xs">
          {connectionNotice}
        </p>
      )}
      {error && (
        <p role="alert" className="text-danger text-xs">
          {error}
        </p>
      )}
      {session?.user ? (
        <>
          <span className="text-muted truncate">
            {session.user.name || 'Signed in'}
          </span>
          {session.canLogout && (
            <Button
              size="sm"
              variant="ghost"
              isDisabled={busy}
              onPress={() => void logout()}>
              Sign out
            </Button>
          )}
        </>
      ) : session?.loginEnabled ? (
        <Button
          size="sm"
          variant="primary"
          onPress={() =>
            session.methods.length
              ? setOpen(true)
              : window.location.assign(api.getLoginURL(window.location.href))
          }>
          Sign in
        </Button>
      ) : (
        session && (
          <span className="text-muted text-xs">
            Browser sign-in is not configured.
          </span>
        )
      )}
      <Modal isOpen={open} onOpenChange={setOpen}>
        <Modal.Backdrop>
          <Modal.Container size="sm">
            <Modal.Dialog>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Sign in to Tamizhi</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="flex flex-col gap-2">
                {session?.methods.map(method => (
                  <Button
                    key={method.id}
                    variant="secondary"
                    onPress={() =>
                      window.location.assign(
                        api.getLoginURL(window.location.href, method.id)
                      )
                    }>
                    Continue with {method.name}
                  </Button>
                ))}
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  )
}
