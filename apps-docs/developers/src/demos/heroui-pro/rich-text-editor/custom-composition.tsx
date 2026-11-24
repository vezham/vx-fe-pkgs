// Adapted documented HeroUI Pro example; see ../README.md.
'use client'
import { Bold, Italic, Link as LinkIcon, ListUl } from '@gravity-ui/icons'
import type {} from '@tiptap/starter-kit'

import { RichTextEditor } from '@vezham/react-pro-v3/rich-text-editor'

import { compositionGuide } from './documents'

export function CustomComposition() {
  return (
    <RichTextEditor className="w-[600px]" defaultValue={compositionGuide}>
      <RichTextEditor.Shell>
        <RichTextEditor.Content />
        <RichTextEditor.Footer>
          <RichTextEditor.Toolbar
            aria-label="Compact editor toolbar"
            className="min-h-0 border-0 p-0">
            <RichTextEditor.ToolbarGroup>
              <RichTextEditor.ToggleButton command="bold" tooltip="Bold">
                <Bold className="size-4" />
              </RichTextEditor.ToggleButton>
              <RichTextEditor.ToggleButton command="italic" tooltip="Italic">
                <Italic className="size-4" />
              </RichTextEditor.ToggleButton>
              <RichTextEditor.ToggleButton
                command="bulletList"
                tooltip="Bulleted list">
                <ListUl className="size-4" />
              </RichTextEditor.ToggleButton>
              <RichTextEditor.LinkPopover>
                <RichTextEditor.LinkPopover.Trigger>
                  <LinkIcon className="size-4" />
                </RichTextEditor.LinkPopover.Trigger>
                <RichTextEditor.LinkPopover.Content>
                  <RichTextEditor.LinkPopover.Input />
                  <RichTextEditor.LinkPopover.Actions>
                    <RichTextEditor.LinkPopover.UnsetButton />
                    <RichTextEditor.LinkPopover.ApplyButton />
                  </RichTextEditor.LinkPopover.Actions>
                </RichTextEditor.LinkPopover.Content>
              </RichTextEditor.LinkPopover>
            </RichTextEditor.ToolbarGroup>
          </RichTextEditor.Toolbar>
          <RichTextEditor.CharacterCount />
        </RichTextEditor.Footer>
      </RichTextEditor.Shell>
    </RichTextEditor>
  )
}
