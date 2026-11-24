// Adapted documented HeroUI Pro example; see ../README.md.
'use client'
import {
  ArrowRotateLeft,
  ArrowRotateRight,
  Bold,
  BroomMotion,
  Code,
  CurlyBrackets,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link as LinkIcon,
  ListOl,
  ListUl,
  QuoteOpen,
  Strikethrough,
  TrashBin,
  Underline
} from '@gravity-ui/icons'
import type {} from '@tiptap/starter-kit'

import { RichTextEditor } from '@vezham/react-pro-v3/rich-text-editor'

const iconClassName = 'size-4'

function LinkControls() {
  return (
    <RichTextEditor.LinkPopover>
      <RichTextEditor.LinkPopover.Trigger tooltip="Link">
        <LinkIcon className={iconClassName} />
      </RichTextEditor.LinkPopover.Trigger>
      <RichTextEditor.LinkPopover.Content>
        <RichTextEditor.LinkPopover.Input />
        <RichTextEditor.LinkPopover.Actions>
          <RichTextEditor.LinkPopover.UnsetButton />
          <RichTextEditor.LinkPopover.ApplyButton />
        </RichTextEditor.LinkPopover.Actions>
      </RichTextEditor.LinkPopover.Content>
    </RichTextEditor.LinkPopover>
  )
}

export function DefaultToolbar() {
  return (
    <RichTextEditor.Toolbar>
      <RichTextEditor.ToolbarGroup aria-label="History">
        <RichTextEditor.ActionButton action="undo" tooltip="Undo">
          <ArrowRotateLeft className={iconClassName} />
        </RichTextEditor.ActionButton>
        <RichTextEditor.ActionButton action="redo" tooltip="Redo">
          <ArrowRotateRight className={iconClassName} />
        </RichTextEditor.ActionButton>
      </RichTextEditor.ToolbarGroup>

      <RichTextEditor.ToolbarSeparator />

      <RichTextEditor.ToolbarGroup aria-label="Text style">
        <RichTextEditor.ToggleButton command="bold" tooltip="Bold">
          <Bold className={iconClassName} />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="italic" tooltip="Italic">
          <Italic className={iconClassName} />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="underline" tooltip="Underline">
          <Underline className={iconClassName} />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="strike" tooltip="Strikethrough">
          <Strikethrough className={iconClassName} />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="code" tooltip="Inline code">
          <Code className={iconClassName} />
        </RichTextEditor.ToggleButton>
      </RichTextEditor.ToolbarGroup>

      <RichTextEditor.ToolbarSeparator />

      <RichTextEditor.ToolbarGroup aria-label="Blocks">
        <RichTextEditor.ToggleButton command="heading-1" tooltip="Heading 1">
          <Heading1 className={iconClassName} />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="heading-2" tooltip="Heading 2">
          <Heading2 className={iconClassName} />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="heading-3" tooltip="Heading 3">
          <Heading3 className={iconClassName} />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="blockquote" tooltip="Blockquote">
          <QuoteOpen className={iconClassName} />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton command="codeBlock" tooltip="Code block">
          <CurlyBrackets className={iconClassName} />
        </RichTextEditor.ToggleButton>
      </RichTextEditor.ToolbarGroup>

      <RichTextEditor.ToolbarSeparator />

      <RichTextEditor.ToolbarGroup aria-label="Lists and links">
        <RichTextEditor.ToggleButton
          command="bulletList"
          tooltip="Bulleted list">
          <ListUl className={iconClassName} />
        </RichTextEditor.ToggleButton>
        <RichTextEditor.ToggleButton
          command="orderedList"
          tooltip="Numbered list">
          <ListOl className={iconClassName} />
        </RichTextEditor.ToggleButton>
        <LinkControls />
      </RichTextEditor.ToolbarGroup>

      <RichTextEditor.ToolbarSeparator />

      <RichTextEditor.ToolbarGroup aria-label="Clear">
        <RichTextEditor.ActionButton
          action="clearFormatting"
          tooltip="Clear formatting">
          <BroomMotion className={iconClassName} />
        </RichTextEditor.ActionButton>
        <RichTextEditor.ActionButton
          action="clearContent"
          tooltip="Clear content">
          <TrashBin className={iconClassName} />
        </RichTextEditor.ActionButton>
      </RichTextEditor.ToolbarGroup>
    </RichTextEditor.Toolbar>
  )
}

export function BubbleToolbar() {
  return (
    <RichTextEditor.BubbleMenu>
      <RichTextEditor.ToggleButton command="bold" tooltip="Bold">
        <Bold className={iconClassName} />
      </RichTextEditor.ToggleButton>
      <RichTextEditor.ToggleButton command="italic" tooltip="Italic">
        <Italic className={iconClassName} />
      </RichTextEditor.ToggleButton>
      <RichTextEditor.ToggleButton command="underline" tooltip="Underline">
        <Underline className={iconClassName} />
      </RichTextEditor.ToggleButton>
      <RichTextEditor.ToggleButton command="strike" tooltip="Strikethrough">
        <Strikethrough className={iconClassName} />
      </RichTextEditor.ToggleButton>
      <LinkControls />
    </RichTextEditor.BubbleMenu>
  )
}
