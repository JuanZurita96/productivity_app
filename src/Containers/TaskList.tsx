import React from 'react'
import { useAppSelector, useAppDispatch, taskActions } from '../State/Store'
import { TaskCard, TaskForm } from '../Components'
import { Button, List } from '@mui/material'
import { AddBox } from '@mui/icons-material'
import './TaskList.css'

interface FormState {
  title: string
  timeLimit: string
  customTimeLimit: null | string
}

const TaskList = () => {
  const taskList = useAppSelector((store) => store.tasks.activeTasks)
  const { addTask, changeState } = taskActions
  const dispatch = useAppDispatch()
  const [newTaskList, setNewTaskList] = React.useState(taskList)
  const [timer, setTimer] = React.useState('')
  const [showForm, setShowForm] = React.useState(false)
  const [newTaskData, setNewTaskData] = React.useState<FormState>({
    title: '',
    timeLimit: '',
    customTimeLimit: null,
  })

  const handleModification = (payload: { type: string; id: number }) => {
    dispatch(changeState(payload))
    setNewTaskList(taskList)
  }

  const taskTimer = () => {
    let seconds = parseInt(newTaskList[0].duration) * 60
    const countdown = setInterval(() => {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const secondsLeft = seconds % 60

      const taskTimer = `${hours > 0 ? hours + ':' : '0:'}${minutes
        .toString()
        .padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`
      setTimer(taskTimer)

      if (seconds === 0) {
        clearInterval(countdown)
        handleModification({ type: 'completed', id: newTaskList[0].id })
      }

      seconds--
    }, 1000)
  }

  const handleSaveTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newTask = {
      id: newTaskList.length + 1,
      status: 'pending',
      ...newTaskData,
      duration: newTaskData.customTimeLimit ?? newTaskData.timeLimit,
      creationDate: new Date().toLocaleDateString(),
      completionTime: '0',
    }
    setNewTaskData({
      title: '',
      timeLimit: '',
      customTimeLimit: null,
    })
    setShowForm(false)
    dispatch(addTask(newTask))
  }

  const renderList = () => {
    if (newTaskList.length > 0)
      return newTaskList.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task}
          timer={index === 0 ? timer : ''}
          modifiedTask={handleModification}
        />
      ))

    return (
      <div>
        <p>No hay tareas</p>
      </div>
    )
  }

  React.useEffect(() => {
    if (taskList.length > 0) return taskTimer()
  }, [])

  return (
    <div>
      {!showForm ? (
        <Button onClick={() => setShowForm(true)}>
          <AddBox /> Agregar Tarea
        </Button>
      ) : (
        <TaskForm
          handleSubmit={handleSaveTask}
          formState={{
            values: newTaskData,
            setter: setNewTaskData,
            activeForm: setShowForm,
          }}
        />
      )}
      <List>{renderList()}</List>
    </div>
  )
}

export default TaskList
