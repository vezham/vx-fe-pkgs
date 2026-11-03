import type { Outfit } from '@vezham/tamizhi-contracts'

interface OutfitOptions {
  manual: Outfit | null
  run?: Outfit
  activity?: Outfit
  message?: Outfit
  profile: Outfit
}

export const resolveOutfit = ({
  manual,
  run,
  activity,
  message,
  profile
}: OutfitOptions): Outfit => manual ?? run ?? activity ?? message ?? profile
