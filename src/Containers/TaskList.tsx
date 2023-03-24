import React from 'react'
import { useAppSelector, useAppDispatch, taskActions } from '../State/Store'
import { TaskCard, TaskForm } from '../Components'
import { Box, Button, List, Alert } from '@mui/material'
import { AddBox } from '@mui/icons-material'
import { Task, FormState } from '../Interfaces/Task'
import { useDragAndDrop } from '../Hooks'
import { TaskHistory, Modal } from '../Containers'
import './TaskHistory.css'

const TaskList = ({
  modal,
}: {
  modal: {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  }
}) => {
  const { addTask, updateTask, editTask } = taskActions
  const { activeTasks: taskList } = useAppSelector((store) => store.tasks)
  const [showForm, setShowForm] = React.useState(false)
  const [edittedTask, setEdittedTask] = React.useState(0)
  const [loader, setLoader] = React.useState(true)
  const [newTaskData, setNewTaskData] = React.useState<FormState>({
    title: '',
    timeLimit: '',
    customTimeLimit: null,
  })
  const dispatch = useAppDispatch()
  const { result, handleDragEnd, handleDragOver, handleDragStart } =
    useDragAndDrop(taskList)

  const saveTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (edittedTask === 0) {
      const newTask = {
        id: taskList.length + 1,
        status: 'wait' as const,
        ...newTaskData,
        duration:
          newTaskData.timeLimit !== 'other'
            ? newTaskData.timeLimit
            : newTaskData.customTimeLimit,
        creationDate: new Date().toLocaleDateString(),
        completionTime: '0',
      }
      dispatch(addTask(newTask))
    } else {
      dispatch(
        editTask({
          ...taskList.find((task) => task.id === edittedTask),
          title: newTaskData.title,
          duration:
            newTaskData.timeLimit !== 'other'
              ? newTaskData.timeLimit
              : newTaskData.customTimeLimit,
        })
      )
    }
    setNewTaskData({
      title: '',
      timeLimit: '',
      customTimeLimit: null,
    })
    setShowForm(false)
  }

  const handleModification = (payload: { task: Task; id: number }) =>
    dispatch(updateTask(payload))

  const handleEditTask = (task: Task) => {
    setNewTaskData({
      title: task.title,
      timeLimit: 'other',
      customTimeLimit: task.duration,
    })
    setEdittedTask(task.id)
    setShowForm(true)
  }

  const handleCancel = () => {
    setNewTaskData({
      title: '',
      timeLimit: '',
      customTimeLimit: null,
    })
    setShowForm(false)
  }

  const handleModalClose = () => {
    modal.setShowModal(false)
  }

  React.useEffect(() => {
    if (taskList.length > 0) setLoader(false)
  }, [result])

  return (
    <Box component="div" alignContent="flex-start" margin=".5rem">
      {!showForm ? (
        <Button
          onClick={() => setShowForm(true)}
          sx={{ margin: '1rem 0', textTransform: 'none' }}
        >
          <AddBox sx={{ marginRight: '.2rem' }} /> Agregar nueva tarea
        </Button>
      ) : (
        <TaskForm
          handleSubmit={saveTask}
          formState={{
            values: newTaskData,
            setter: setNewTaskData,
            activeForm: handleCancel,
          }}
        />
      )}
      <List className="task">
        {!loader && taskList.length > 0 ? (
          result.map((task) => (
            <Box
              component="div"
              key={task.id}
              draggable
              onDragStart={(event) => handleDragStart(event, task)}
              onDragOver={(event) => handleDragOver(event, task)}
              onDragEnd={handleDragEnd}
            >
              <TaskCard
                task={task}
                modifiedTask={handleModification}
                editTask={handleEditTask}
              />
            </Box>
          ))
        ) : (
          <Box>
            <Alert severity="warning">
              No tienes tareas pendientes, agrega algunas.
            </Alert>
          </Box>
        )}
      </List>
      {modal.showModal && (
        <Modal onClose={handleModalClose}>
          <TaskHistory />
        </Modal>
      )}
    </Box>
  )
}

export default TaskList
