import { useEffect, useRef, useState } from 'react'

import { useLocalStore } from '@vezham/hooks'
import { Button, Input, Label, Modal, TextField } from '@vezham/react-v3'
import {
  DEFAULT_COMPANION_URL,
  companionTransport,
  companionURL,
  connectCompanion
} from '@vezham/tamizhi-client'
import type { CompanionConnectionPrompt } from '@vezham/tamizhi-client'

import {
  setCompanionConnection,
  useCompanionConnection
} from './companion-connection'

const parseEndpoint = (value: unknown) => {
  try {
    return typeof value === 'string' ? companionURL(value) : undefined
  } catch {
    return undefined
  }
}
export const CompanionSettings = ({
  isDisabled = false
}: {
  isDisabled?: boolean
}) => {
  const connection = useCompanionConnection()
  const { value: savedEndpoint, setValue: setEndpoint } = useLocalStore(
    'tamizhi.companion.endpoint',
    DEFAULT_COMPANION_URL,
    { parse: parseEndpoint }
  )
  const endpoint = savedEndpoint ?? DEFAULT_COMPANION_URL
  const [open, setOpen] = useState(false)
  const [verification, setVerification] =
    useState<CompanionConnectionPrompt | null>(null)
  const [request, setRequest] = useState<AbortController | null>(null)
  const busy = request !== null
  const [error, setError] = useState<string | null>(null)
  const pending = useRef<AbortController | null>(null)
  useEffect(() => () => pending.current?.abort(), [])
  const pair = async () => {
    if (isDisabled || pending.current) return
    setError(null)
    setVerification(null)
    const controller = new AbortController()
    pending.current = controller
    setRequest(controller)
    try {
      const transport = await companionTransport({
        baseURL: endpoint,
        origin: window.location.origin,
        isSecureContext: window.isSecureContext,
        signal: controller.signal
      })
      const client = await connectCompanion({
        baseURL: endpoint,
        onPending: prompt => {
          if (!controller.signal.aborted) setVerification(prompt)
        },
        fetch: transport,
        signal: controller.signal
      })
      await client.api?.session(controller.signal)
      if (controller.signal.aborted) return
      setCompanionConnection({ client, endpoint: companionURL(endpoint) })
      setVerification(null)
      setOpen(false)
    } catch (failure) {
      if (!controller.signal.aborted)
        setError(
          failure instanceof Error
            ? failure.message
            : 'Cannot reach the companion. Check that it is running and allow local network access in your browser.'
        )
    } finally {
      if (pending.current === controller) {
        pending.current = null
      }
      setRequest(active => (active === controller ? null : active))
    }
  }
  const disconnect = async () => {
    pending.current?.abort()
    try {
      await connection?.client.api?.logout()
    } catch {
      /* vx-bot/NOTE: A stopped companion cannot revoke the server token; always clear this UI's in-memory credential. */
    }
    setCompanionConnection(undefined)
    setOpen(false)
    setError(null)
  }
  return (
    <Modal
      isOpen={open}
      onOpenChange={value => {
        if (!value) {
          pending.current?.abort()
          setVerification(null)
        }
        setOpen(value)
      }}>
      <Button size="sm" variant="ghost" isDisabled={isDisabled}>
        {connection ? 'Local companion' : 'Connect companion'}
      </Button>
      <Modal.Backdrop>
        <Modal.Container size="sm">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Local Tamizhi companion</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="flex flex-col gap-4">
              {connection ? (
                <>
                  <p className="text-sm">Paired with {connection.endpoint}</p>
                  <p className="text-muted text-xs">
                    The companion must be running. Pair again after restarting
                    it or reloading this app.
                  </p>
                  <Button variant="secondary" onPress={() => void disconnect()}>
                    Disconnect
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-muted text-sm">
                    Start the Tamizhi CLI on this computer, then connect. New
                    app origins need approval in the terminal. Your browser may
                    request local network access.
                  </p>
                  <TextField
                    value={endpoint}
                    onChange={setEndpoint}
                    isDisabled={busy}>
                    <Label>Companion URL</Label>
                    <Input type="url" />
                  </TextField>
                  {verification && busy && (
                    <div role="status" className="flex flex-col gap-2 text-sm">
                      <p>Approve this connection in the Tamizhi CLI.</p>
                      <p className="text-muted">
                        App: {window.location.origin}
                      </p>
                      <p>
                        Verification code:{' '}
                        <strong className="font-mono">
                          {verification.code}
                        </strong>
                      </p>
                      <p className="text-muted">
                        Check that the origin and code match the terminal.
                      </p>
                    </div>
                  )}
                  {error && (
                    <p role="alert" className="text-danger text-sm">
                      {error}
                    </p>
                  )}
                  <Button
                    variant="primary"
                    isPending={busy}
                    onPress={() => void pair()}>
                    Connect
                  </Button>
                  {busy && (
                    <Button
                      variant="secondary"
                      onPress={() => pending.current?.abort()}>
                      Cancel connection
                    </Button>
                  )}
                </>
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
