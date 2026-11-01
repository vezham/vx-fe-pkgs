# @vezham/hooks

## useLocalStore

```tsx
import { useLocalStore } from '@vezham/hooks'

const DEFAULTS = { sounds: true }
const Preferences = () => {
  const { value, setValue, reset, isReady, isSaved, error } = useLocalStore(
    'my-app:preferences:v1',
    DEFAULTS,
    { debounceMs: 150 }
  )
  // Use setValue(next) or setValue(current => next).
}
```

Provide a stable default and an optional `parse(unknown)` function to validate
or migrate stored JSON. One key represents one schema. Reads start after mount,
so static/prerendered HTML has a deterministic initial value. Failed reads and
writes retain a usable in-memory value and expose `error`/`isSaved`. Defaults
are not saved during hydration; successful parser migrations are persisted.

Updates notify consumers in the current document and listen to `storage`
events from other tabs. Cross-tab conflicts use the latest storage event.
`reset()` removes only this key. Debounced writes flush on pagehide and final
unsubscribe; `flush()` can explicitly retry a failed write. Scope keys by host,
workspace, and user where needed. Do not store credentials.

## useCopyToClipboard

```tsx
import { useCopyToClipboard } from '@vezham/hooks'

const CopyButton = ({ text }: { text: string }) => {
  const { copy, isCopied, isUnavailable } = useCopyToClipboard()
  return (
    <button onClick={() => void copy(text)}>
      {isCopied ? 'Copied' : isUnavailable ? 'Copy unavailable' : 'Copy'}
    </button>
  )
}
```

Uses the Clipboard API when available and falls back to a temporary selection for
restricted origins. The hook exposes the last copy result as `status`, `isCopied`,
and `isUnavailable`.
