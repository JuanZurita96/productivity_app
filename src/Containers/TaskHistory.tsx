import React from 'react'
import { useAppSelector } from '../State/Store'
import { TaskCard } from '../Components'

const TaskHistory = () => {
  const taskList = useAppSelector((store) => store.tasks.completedTasks)

  return (
    <div className="tasks-container">
      <h2>Historial de tareas completadas</h2>
      {taskList.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}

export default TaskHistory
