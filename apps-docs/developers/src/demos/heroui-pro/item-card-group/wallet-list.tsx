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
import React from 'react'

import { ItemCard, ItemCardGroup } from '@vezham/react-pro-v3'
import { Button, Dropdown, Label, Separator } from '@vezham/react-v3'

const wallets = [
  {
    address: '0x34E6...6255',
    avatar: '🦭',
    bg: 'bg-neutral-800',
    eth: '0.0 ETH',
    name: 'Funds',
    usd: '$0.00'
  },
  {
    address: '0xD9EA...f40e',
    avatar: '🔮',
    bg: 'bg-blue-500',
    eth: '0.0 ETH',
    name: '0xD9EA...f40e',
    usd: '$0.00'
  },
  {
    address: '0x9DC5...621a',
    avatar: '🏖️',
    bg: 'bg-green-500',
    eth: '0.021 ETH',
    name: "SLMobbin's",
    usd: '$37.09'
  },
  {
    address: '0xa98b...4daa',
    avatar: '😜',
    bg: 'bg-orange-400',
    eth: '0.0 ETH',
    name: "Sam Lee's Wallet",
    usd: '$0.00'
  }
]

export function WalletList() {
  return (
    <ItemCardGroup className="w-[500px]">
      {wallets.map((w, i) => (
        <React.Fragment key={w.address}>
          {i > 0 && <Separator />}
          <ItemCard>
            <ItemCard.Icon className={`size-10 rounded-full ${w.bg} text-lg`}>
              <span>{w.avatar}</span>
            </ItemCard.Icon>
            <ItemCard.Content>
              <ItemCard.Title>{w.name}</ItemCard.Title>
              <ItemCard.Description>{w.address}</ItemCard.Description>
            </ItemCard.Content>
            <ItemCard.Action>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-foreground text-sm font-semibold">
                    {w.usd}
                  </p>
                  <p className="text-muted text-xs">{w.eth}</p>
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
        </React.Fragment>
      ))}
    </ItemCardGroup>
  )
}
