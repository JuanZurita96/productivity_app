import { createSlice } from '@reduxjs/toolkit'
import { Task } from '../Interfaces/Task'

const findTask = (payload: Task) =>
  initialState.findIndex((task) => task.id === payload.id)

const initialState = [
  {
    id: 1,
    status: 'completed',
    title: 'Hacer la tarea',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    duration: 30,
    creationDate: new Date().toLocaleString(),
    completionTime: 25,
  },
]

const tasksActions = createSlice({
  name: 'Task Actions',
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state[findTask(action.payload)].status = action.payload
    },
    changeDescription: (state, action) => {
      state[findTask(action.payload)].description = action.payload
    },
    changeDuration: (state, action) => {
      state[findTask(action.payload)].duration = action.payload
    },
  },
})

const tasksReducer = {
  reducer: tasksActions.reducer,
  actions: tasksActions.actions,
}

export default tasksReducer
