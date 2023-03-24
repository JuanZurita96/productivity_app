/**Las interfaces para la representacion de tipos en TypeScript
 * Task: El objeto inicial para una tarea.
 * FormState: el tipado para los datos del formulario.
 * TaskState: la interface que representa el estado inicial de redux, compuesto por la lista de taras activas y completadas
 */
export interface Task {
  id: number
  status: 'active' | 'paused' | 'stopped' | 'completed' | 'wait'
  title: string
  duration: string
  timerLeft?: number
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
