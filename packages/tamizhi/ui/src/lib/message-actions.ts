export interface MessageActions {
  onSpeak?: (text: string) => void
  onRetry: () => void
  onRate: (messageId: string, rating: 'up' | 'down') => void
  onBranch: (messageId: string) => void
  onToggleTask: (messageId: string, index: number, done: boolean) => void
}
