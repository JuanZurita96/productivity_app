import { createSlice } from '@reduxjs/toolkit'
import { Task } from '../Interfaces/Task'

interface TaskState {
  completedTasks: Task[]
  activeTasks: Task[]
}

const generateTasks = (numberOfTasks: number) => {
  const titles = [
    'Comprar comida',
    'Hacer ejercicio',
    'Estudiar programación',
    'Hacer la cama',
    'Limpiar el baño',
    'Salir al cine',
    'Terminar el proyecto',
  ]
  const taskList = []

  for (let i = 0; i < numberOfTasks; i++) {
    const lastSevenDays = Math.floor(Math.random() * 7)
    const date = new Date()
    date.setDate(date.getDate() - lastSevenDays)
    const timeLimit = Math.floor(Math.random() * 121)
    const hours = Math.floor(timeLimit / 60)
    const minutes = timeLimit % 60
    const seconds = (timeLimit * 60) % 60
    const visualTimeLimit = `${hours > 0 ? hours + ':' : '0:'}${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    const getCompletionTime = (time: number) => {
      const timeLimitPerTask = time * 60
      const minValueToComplete = timeLimitPerTask * 0.8
      return `${Math.floor(
        (Math.random() * (timeLimitPerTask - minValueToComplete + 1) +
          minValueToComplete) /
          60
      )} minutes`
    }

    const newTask = {
      id: i + 1,
      status: 'completed' as const,
      title: titles[Math.floor(Math.random() * titles.length)],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      duration: visualTimeLimit,
      creationDate: date.toLocaleDateString(),
      completionTime: getCompletionTime(timeLimit),
    }
    taskList.push(newTask)
  }

  return taskList
}

const findTask = (state: TaskState, id: number) =>
  state.activeTasks.findIndex((task) => task.id === id)

const initialState = {
  completedTasks: generateTasks(50),
  activeTasks: [],
} as TaskState

const tasksActions = createSlice({
  name: 'Task Actions',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.activeTasks = [...state.activeTasks, action.payload]
    },
    updateTask: (state, action) => {
      state.activeTasks[findTask(state, action.payload.id)] = action.payload
    },
    changeState: (state, { payload }) => {
      switch (payload.type) {
        case 'start':
        case 'paused':
        case 'stopped':
          state.activeTasks[findTask(state, payload.id)].status = payload.type
          break
        case 'restart':
          state.activeTasks[findTask(state, payload.id)].timerLeft =
            state.activeTasks[findTask(state, payload.id)].duration
          break
        case 'completed':
          const [taskComplete] = state.activeTasks.splice(
            findTask(state, payload.id),
            1
          )
          state.completedTasks = [
            ...state.completedTasks,
            {
              ...taskComplete,
              id: state.completedTasks.length + 1,
              status: 'completed',
            },
          ]
          break
      }
    },
  },
})

const tasksReducer = {
  reducer: tasksActions.reducer,
  actions: tasksActions.actions,
}

export default tasksReducer
