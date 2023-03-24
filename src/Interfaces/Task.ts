export interface Task {
  id: number
  status: 'active' | 'paused' | 'stopped' | 'completed' | 'wait'
  title: string
  duration: string
  timerLeft?: string
  creationDate: string
  completionTime: string
}

export interface FormState {
  title: string
  timeLimit: string
  customTimeLimit: null | string
}

export interface TaskState {
  completedTasks: Task[]
  activeTasks: Task[]
}
