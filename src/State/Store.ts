import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './taskReducer'

/**Store.ts - Se configura la store de Redux con un reducer para las tareas [taskReducer.ts]
 * exportamos las funcionalidades de los selectores y el dispatch para el manejo del estado
 */

export const store = configureStore({
  reducer: { tasks: tasksReducer.reducer },
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const taskActions = tasksReducer.actions
