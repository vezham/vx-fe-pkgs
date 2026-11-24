// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import {
  ArrowRightFromSquare,
  ArrowUpRightFromSquare,
  Copy,
  Ellipsis,
  Globe,
  PaperPlane,
  Pencil,
  QrCode,
  Star,
  TrashBin
} from '@gravity-ui/icons'

import { ItemCard } from '@vezham/react-pro-v3'
import { Button, Dropdown, Label, Separator } from '@vezham/react-v3'

export function WalletCard() {
  return (
    <div className="w-[500px] rounded-2xl p-6">
      <ItemCard>
        <ItemCard.Icon className="size-10 rounded-full bg-green-500 text-lg">
          <span>🏖️</span>
        </ItemCard.Icon>
        <ItemCard.Content>
          <ItemCard.Title>SLMobbin&apos;s</ItemCard.Title>
          <ItemCard.Description>0x9DC5...621a</ItemCard.Description>
        </ItemCard.Content>
        <ItemCard.Action>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-foreground text-sm font-semibold">$34.99</p>
              <p className="text-muted text-xs">0.021 ETH</p>
            </div>
            <Dropdown>
              <Button
                isIconOnly
                aria-label="Wallet actions"
                size="sm"
                variant="ghost">
                <Ellipsis className="size-4" />
              </Button>
              <Dropdown.Popover
                className="min-w-[200px]"
                placement="bottom end">
                <Dropdown.Menu>
                  <Dropdown.Item textValue="Edit Wallet">
                    <Pencil className="size-4" />
                    <Label>Edit Wallet</Label>
                  </Dropdown.Item>
                  <Dropdown.Item textValue="Send">
                    <PaperPlane className="size-4" />
                    <Label>Send</Label>
                  </Dropdown.Item>
                  <Dropdown.Item textValue="View Activity">
                    <Globe className="size-4" />
                    <Label className="flex flex-1 items-center justify-between">
                      View Activity
                      <ArrowUpRightFromSquare className="text-muted size-3" />
                    </Label>
                  </Dropdown.Item>
                  <Dropdown.Item textValue="Set as Default">
                    <Star className="size-4" />
                    <Label>Set as Default</Label>
                  </Dropdown.Item>
                  <Dropdown.Item textValue="Copy Address">
                    <Copy className="size-4" />
                    <Label>Copy Address</Label>
                  </Dropdown.Item>
                  <Dropdown.Item textValue="Address QR Code">
                    <QrCode className="size-4" />
                    <Label>Address QR Code</Label>
                  </Dropdown.Item>
                  <Separator />
                  <Dropdown.Item textValue="Remove Wallet">
                    <TrashBin className="text-danger size-4" />
                    <Label className="text-danger">Remove Wallet</Label>
                  </Dropdown.Item>
                  <Dropdown.Item textValue="Export Wallet">
                    <ArrowRightFromSquare className="size-4" />
                    <Label>Export Wallet</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </ItemCard.Action>
      </ItemCard>
    </div>
  )
}
