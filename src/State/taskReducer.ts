import { createSlice } from '@reduxjs/toolkit'
import { TaskState } from '../Interfaces/Task'
import {
  findTask,
  generateTasks,
  getCompletionTime,
} from '../Utils/utilFunctions'

const initialState = {
  completedTasks: generateTasks(50),
  activeTasks: [],
} as TaskState

const tasksActions = createSlice({
  name: 'Task Actions',
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      state.activeTasks = [...action.payload]
    },
    addTask: (state, action) => {
      state.activeTasks = [...state.activeTasks, action.payload]
    },
    updateTask: (state, { payload }) => {
      switch (payload.task.status) {
        case 'active':
          const [actualActiveTask] = state.activeTasks.filter(
            (task) => task.status === 'active'
          )
          if (actualActiveTask) actualActiveTask.status = 'stopped'
          const taskToChange = state.activeTasks[findTask(state, payload.id)]
          const newTaskArray = [
            ...state.activeTasks,
            actualActiveTask,
            { ...taskToChange, status: 'active' as const },
          ]
          newTaskArray.splice(findTask(state, payload.id), 1)
          if (actualActiveTask)
            newTaskArray.splice(findTask(state, actualActiveTask.id), 1)
          state.activeTasks = newTaskArray
            .filter((task) => task !== undefined)
            .sort((a, b) => a.status.localeCompare(b.status))
            .map((task, index) => ({
              ...task,
              id: index + 1,
            }))
          break
        case 'paused':
        case 'stopped':
        case 'wait':
          state.activeTasks[findTask(state, payload.id)] = payload.task
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
              completionTime: getCompletionTime(
                payload.task.duration,
                payload.task.timerLeft
              ),
            },
          ]
          break
      }
    },
    editTask: (state, { payload }) => {
      const taskList = state.activeTasks
      taskList.splice(findTask(state, payload.id), 1)
      state.activeTasks = [...taskList, payload]
    },
  },
})

const tasksReducer = {
  reducer: tasksActions.reducer,
  actions: tasksActions.actions,
}

export default tasksReducer
