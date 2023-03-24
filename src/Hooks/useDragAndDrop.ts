import React from 'react'
import { Task } from '../Interfaces/Task'
import { taskActions, useAppDispatch } from './../State/Store'

export const useDragAndDrop = (taskList: Task[]) => {
  const { updateOrder } = taskActions
  const [draggingTask, setDraggingTask] = React.useState<Task>({
    id: 0,
    status: 'wait',
    title: '',
    duration: '',
    timerLeft: 0,
    creationDate: '',
    completionTime: '',
  })
  const [orderedTasks, setOrderedTasks] = React.useState<Task[]>()
  const dispatch = useAppDispatch()
  const result = orderedTasks != undefined ? orderedTasks : []

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    task: Task
  ) => {
    setDraggingTask(task)
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    task: Task
  ) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'

    const draggingTaskIndex = result.findIndex((t) => t === draggingTask)
    const hoverTaskIndex = result.findIndex((t) => t === task)

    if (draggingTaskIndex === hoverTaskIndex) return

    const newOrderedTasks = [...result]
    newOrderedTasks[draggingTaskIndex] = task
    newOrderedTasks[hoverTaskIndex] = draggingTask
    setOrderedTasks(newOrderedTasks)
  }

  const handleDragEnd = () => {
    setDraggingTask({
      id: 0,
      status: 'wait',
      title: '',
      duration: '',
      timerLeft: 0,
      creationDate: '',
      completionTime: '',
    })
    setOrderedTasks(result)
    dispatch(updateOrder(result))
  }

  React.useEffect(() => {
    if (taskList.length > 0) setOrderedTasks(taskList)
  }, [taskList])

  return {
    result,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  }
}
