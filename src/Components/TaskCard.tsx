import { Task } from '../Interfaces/Task'
import {
  Box,
  ListItemText,
  ButtonGroup,
  Button,
  ListItemIcon,
  Chip,
} from '@mui/material'
import { PlayArrow, Pause, RestartAlt, EditSharp } from '@mui/icons-material'
import './TaskCard.css'
import { useTimer } from '../Hooks'
import { getColorChip, getLabelStatus } from '../Utils/utilFunctions'

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
