export type WorkflowType = 'beat-sync' | 'ugc-video' | 'generate-video'
export type AspectRatio = '9:16' | '16:9' | '1:1'
export type DurationType = 'short' | 'medium' | 'long'

export type WorkflowOption = {
  label: string
  value: WorkflowType
}

export type AspectRatioOption = {
  label: string
  value: AspectRatio
}

export type DurationOption = {
  label: string
  value: DurationType
}

export type GenerationItem = {
  id: string
  workflow: string
  aspectRatio: string
  duration: string
  prompt: string
  status: 'success' | 'error'
  errorDescription?: string
  createdAt: number
}
