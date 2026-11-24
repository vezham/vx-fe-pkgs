// Adapted documented HeroUI Pro example; see ../README.md.
'use client'
import type { JSONContent } from '@tiptap/core'
import type {} from '@tiptap/starter-kit'
import { useMemo, useState } from 'react'

import type { RichTextEditorValueChangeDetails } from '@vezham/react-pro-v3/rich-text-editor'
import { RichTextEditor } from '@vezham/react-pro-v3/rich-text-editor'
import { Button } from '@vezham/react-v3'

import { BubbleToolbar, DefaultToolbar } from './default-toolbar'
import { controlledDocument, releaseNotes } from './documents'

export function Controlled() {
  const [value, setValue] = useState<JSONContent>(controlledDocument)
  const [details, setDetails] = useState<Pick<
    RichTextEditorValueChangeDetails,
    'characterCount' | 'isEmpty' | 'wordCount'
  > | null>(null)
  const preview = useMemo(() => JSON.stringify(value, null, 2), [value])

  return (
    <div className="flex w-full max-w-[760px] flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setValue(controlledDocument)}>
          Load Guide
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setValue(releaseNotes)}>
          Load Notes
        </Button>
        {details ? (
          <span className="text-muted text-xs sm:ml-auto">
            {details.characterCount} chars, {details.wordCount} words
          </span>
        ) : null}
      </div>

      <RichTextEditor
        value={value}
        onValueChange={(nextValue, nextDetails) => {
          setValue(nextValue)
          setDetails({
            characterCount: nextDetails.characterCount,
            isEmpty: nextDetails.isEmpty,
            wordCount: nextDetails.wordCount
          })
        }}>
        <RichTextEditor.Shell>
          <DefaultToolbar />
          <RichTextEditor.Content />
          <BubbleToolbar />
          <RichTextEditor.Footer>
            <span>
              {details?.isEmpty ? 'Empty document' : 'Controlled JSON value'}
            </span>
            <RichTextEditor.CharacterCount showWords />
          </RichTextEditor.Footer>
        </RichTextEditor.Shell>
      </RichTextEditor>

      <pre className="bg-default text-muted max-h-[220px] overflow-auto rounded-2xl p-3 text-xs break-words whitespace-pre-wrap">
        {preview}
      </pre>
    </div>
  )
}
