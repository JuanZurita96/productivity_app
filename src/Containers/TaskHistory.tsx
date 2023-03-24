import ReactDOM from 'react-dom'
import { useAppSelector } from '../State/Store'
import { ProductivityGraph, TaskCard } from '../Components'
import { Box, Button, Typography } from '@mui/material'
import './TaskHistory.css'

/**TaskHistiry.tsx - En este archivo se representa el componente del Modal, la lista de tareas completadas y la grafica.
 * Modal: es un portal de React que presenta informacion proporcionada como hijo-children.
 * History: es la lista de tareas completadas, se utiliza el mismo componente de TaskCard.tsx
 * ProductivityGraph: es la representacion de cuantas tareas fueron completadas en una determinada fecha.
 */

export const Modal = ({
  onClose,
  children,
}: {
  onClose: () => void
  children: JSX.Element
}) => {
  return ReactDOM.createPortal(
    <Box component="div" className="modal">
      <Box component="div" className="content">
        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
            margin: '1.5rem 0',
          }}
          onClick={onClose}
        >
          Cerrar historial
        </Button>
        <Typography variant="h1" gutterBottom fontSize={20}>
          Tareas realizadas en la ultima semana:
        </Typography>
        {children}
      </Box>
    </Box>,
    document.getElementById('root') as Element
  )
}

export const TaskHistory = () => {
  const taskList = useAppSelector((store) => store.tasks.completedTasks)

  return (
    <Box component="div" className="information">
      <Box component="div" className="task">
        {taskList.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>
      <Box>
        <ProductivityGraph tasks={taskList} />
      </Box>
    </Box>
  )
}
