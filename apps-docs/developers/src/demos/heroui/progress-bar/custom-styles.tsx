// vx-bot/INFO: Adapted HeroUI demo (Apache-2.0); see README.md and LICENSE.
import { Label, ProgressBar } from '@vezham/react-v3'

export function CustomStyles() {
  return (
    <ProgressBar aria-label="Upload progress" className="w-64" value={45}>
      <Label className="text-foreground font-medium">
        Uploading resume.pdf
      </Label>
      <ProgressBar.Output className="text-muted text-xs tabular-nums" />
      <ProgressBar.Track className="bg-default rounded-full">
        <ProgressBar.Fill className="bg-accent rounded-full" />
      </ProgressBar.Track>
    </ProgressBar>
  )
}
