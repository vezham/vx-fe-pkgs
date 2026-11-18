import { VideoPlayer } from '@vezham/react/components/video-player'

export const Default = () => (
  <VideoPlayer
    aria-label="Button demonstration"
    src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/native/components/videos/button-docs-light.mp4"
    autoPlay={false}
    muted
    className="max-w-lg"
  />
)
