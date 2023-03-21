export interface Task {
  id: number
  status: 'active' | 'paused' | 'stopped' | 'completed' | 'pending'
  title: string
  description: string
  duration: string
  timerLeft?: string
  creationDate: string
  completionTime: string
}
