import {
  Close as CloseIcon,
  Hashtag as HashtagIcon,
  Link as LinkIcon,
  Pen as PenIcon,
  TrashBinTrash as TrashBinTrashIcon
} from '@vezham/icons-react'
import { ActionBar } from '@vezham/react-pro-v3/action-bar'
import { Button, Chip, Separator, Tooltip } from '@vezham/react-v3'

type Props = {
  ariaLabel: string
  selectedCount: number
  entityLabel?: string
  entityPluralLabel?: string
  editLabel?: string
  deleteLabel?: string
  onBulkEdit?: () => void
  onBulkCopyIds?: () => void
  onBulkCopyLinks?: () => void
  onBulkDelete?: () => void
  onEdit?: () => void
  onCopyIds?: () => void
  onCopyLinks?: () => void
  onDelete?: () => void
  onClearSelection: () => void
}

export const BulkActionBar = ({
  ariaLabel,
  entityLabel,
  entityPluralLabel,
  editLabel,
  deleteLabel,
  selectedCount,
  onBulkEdit,
  onBulkCopyIds,
  onBulkCopyLinks,
  onBulkDelete,
  onEdit,
  onCopyIds,
  onCopyLinks,
  onDelete,
  onClearSelection
}: Props) => {
  const resolvedEntityLabel = entityLabel ?? 'item'
  const resolvedEntityPluralLabel =
    entityPluralLabel ?? `${resolvedEntityLabel}s`
  const resolvedEdit = onBulkEdit ?? onEdit
  const resolvedCopyIds = onBulkCopyIds ?? onCopyIds
  const resolvedCopyLinks = onBulkCopyLinks ?? onCopyLinks
  const resolvedDelete = onBulkDelete ?? onDelete

  return (
    <ActionBar aria-label={ariaLabel} isOpen={selectedCount > 0}>
      <ActionBar.Prefix>
        <Chip className="shrink-0 tabular-nums" size="sm">
          {selectedCount}
        </Chip>
      </ActionBar.Prefix>
      <Separator />
      <ActionBar.Content>
        <Button
          aria-label={`Edit selected ${resolvedEntityPluralLabel}`}
          isDisabled={selectedCount !== 1}
          size="sm"
          variant="ghost"
          onPress={resolvedEdit}>
          <PenIcon size={16} aria-hidden="true" />
          <span className="action-bar__label">{editLabel ?? 'Edit'}</span>
        </Button>
        <Button
          aria-label={`Copy selected ${resolvedEntityPluralLabel} IDs`}
          size="sm"
          variant="ghost"
          onPress={resolvedCopyIds}>
          <HashtagIcon size={16} aria-hidden="true" />
          <span className="action-bar__label">Copy IDs</span>
        </Button>
        <Button
          aria-label={`Copy selected ${resolvedEntityPluralLabel} links`}
          size="sm"
          variant="ghost"
          onPress={resolvedCopyLinks}>
          <LinkIcon size={16} aria-hidden="true" />
          <span className="action-bar__label">Copy Links</span>
        </Button>
        <Button
          aria-label={`Delete selected ${resolvedEntityPluralLabel}`}
          className="text-danger bg-danger/10"
          size="sm"
          variant="ghost"
          onPress={resolvedDelete}>
          <TrashBinTrashIcon size={16} aria-hidden="true" />
          <span className="action-bar__label">{deleteLabel ?? 'Delete'}</span>
        </Button>
      </ActionBar.Content>
      <Separator />
      <ActionBar.Suffix>
        <Tooltip delay={0}>
          <Tooltip.Trigger>
            <Button
              isIconOnly
              aria-label="Clear selection"
              size="sm"
              variant="ghost"
              onPress={onClearSelection}>
              <CloseIcon size={16} aria-hidden="true" />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Clear selection</Tooltip.Content>
        </Tooltip>
      </ActionBar.Suffix>
    </ActionBar>
  )
}
