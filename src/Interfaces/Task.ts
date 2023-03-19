export interface Task {
  id: number
  status: 'active' | 'paused' | 'stopped' | 'completed' | 'waiting'
  title: string
  description: string
  duration: string
  creationDate: string
  completionTime: string
}
