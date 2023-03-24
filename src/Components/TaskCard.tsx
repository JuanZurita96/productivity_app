import { Task } from '../Interfaces/Task'
import {
  Box,
  ListItemText,
  ButtonGroup,
  Button,
  ListItemIcon,
  Chip,
} from '@mui/material'
import {
  PlayArrow,
  Pause,
  RestartAlt,
  EditSharp,
  CheckCircleOutlineTwoTone,
} from '@mui/icons-material'
import './TaskCard.css'
import { useTimer } from '../Hooks'
import { getColorChip, getLabelStatus } from '../Utils/utilFunctions'

/**TaskCard.tsx - Muestra la informacion de la tarea (titulo, limite de tiempo, su estado), asi como los botones para el manejo de esta
 * Cada boton maneja un cambio de estado que se envia mediante los dispatch en la TaskList.tsx y se actualiza el estado en Redux
 * Se establece un timer de acuerdo a la duracion de la tarea, esto se realiza con la ayuda de un custom hook 'useTimer.ts'
 * Este hook nos regresa una funcion y el tiempo restante de la tarea. Mas info en [Hooks/useTimer.ts]
 */

const TaskCard = ({
  task,
  modifiedTask,
  editTask,
}: {
  task: Task
  modifiedTask?: (payload: { task: Task; id: number }) => void
  editTask?: (task: Task) => void
}) => {
  const { formatTime, timeLeft } = useTimer(task)
  return (
    <Box component="div" className="card">
      <ListItemText
        primary={task.title}
        sx={{
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      />
      {task.status === 'active' ? (
        <Chip
          label="Completar tarea"
          onClick={() =>
            modifiedTask?.({
              task: { ...task, status: 'completed', timerLeft: timeLeft },
              id: task.id,
            })
          }
          icon={<CheckCircleOutlineTwoTone />}
          variant="outlined"
        />
      ) : null}
      {task.status === 'completed' ? (
        <ListItemText primary={`Completada en: ${task.completionTime}min`} />
      ) : (
        <ListItemText primary={`Límite: ${formatTime(timeLeft)}`} />
      )}
      <ButtonGroup variant="text" size="small">
        {task.status === 'active' || task.status === 'completed' ? null : (
          <Button
            onClick={() =>
              modifiedTask?.({
                task: { ...task, status: 'active' },
                id: task.id,
              })
            }
          >
            <PlayArrow />
          </Button>
        )}
        {task.status === 'active' ? (
          <Button
            onClick={() =>
              modifiedTask?.({
                task: { ...task, status: 'paused' },
                id: task.id,
              })
            }
          >
            <Pause />
          </Button>
        ) : null}
        {task.status === 'paused' ? (
          <Button
            onClick={() =>
              modifiedTask?.({
                task: { ...task, status: 'wait' },
                id: task.id,
              })
            }
          >
            <RestartAlt />
          </Button>
        ) : null}
        {task.status === 'wait' ? (
          <ListItemIcon>
            <Button size="small" onClick={() => editTask?.(task)}>
              <EditSharp />
            </Button>
          </ListItemIcon>
        ) : null}
      </ButtonGroup>
      <Chip
        label={getLabelStatus(task.status)}
        color={getColorChip(task.status)}
      />
    </Box>
  )
}

export default TaskCard
