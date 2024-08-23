interface Mandatory {
  chromeMediaSource: string
  chromeMediaSourceId: number
  maxWidth?: number
  maxHeight?: number
}

interface VideoConfig {
  mandatory: Mandatory
}

export interface UserMediaOption extends Record<string, unknown> {
  audio: boolean
  video: VideoConfig
}

export interface DesktopCapturerSource {
  display_id: string
  id: string
  name: string
}
