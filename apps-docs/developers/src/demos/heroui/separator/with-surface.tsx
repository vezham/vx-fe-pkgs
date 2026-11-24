// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Separator, Surface } from '@vezham/react-v3'

export function WithSurface() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Surface
          className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6"
          variant="default">
          <h3 className="text-foreground text-base font-semibold">
            Default Surface
          </h3>
          <Separator />
          <p className="text-muted text-sm">Surface Content</p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <Surface
          className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6"
          variant="secondary">
          <h3 className="text-foreground text-base font-semibold">
            Secondary Surface
          </h3>
          <Separator variant="secondary" />
          <p className="text-muted text-sm">Surface Content</p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <Surface
          className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6"
          variant="tertiary">
          <h3 className="text-foreground text-base font-semibold">
            Tertiary Surface
          </h3>
          <Separator variant="tertiary" />
          <p className="text-muted text-sm">Surface Content</p>
        </Surface>
      </div>

      <div className="flex flex-col gap-2">
        <Surface
          className="flex min-w-[320px] flex-col gap-3 rounded-3xl border p-6"
          variant="transparent">
          <h3 className="text-foreground text-base font-semibold">
            Transparent Surface
          </h3>
          <Separator />
          <p className="text-muted text-sm">Surface Content</p>
        </Surface>
      </div>
    </div>
  )
}
