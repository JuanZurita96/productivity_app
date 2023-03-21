import React from 'react'
import { Task } from '../Interfaces/Task'
import { Box, ListItemText, ButtonGroup, Button } from '@mui/material'
import {
  PlayArrow,
  Pause,
  Stop,
  RestartAlt,
  AvTimer,
} from '@mui/icons-material'
import './TaskCard.css'

const TaskCard = ({
  task,
  modifiedTask,
  timer,
}: {
  task: Task
  modifiedTask?: (payload: { type: string; id: number }) => void
  timer?: string
}) => (
  <Box component="div" className="card">
    <ListItemText primary={task.title} />
    <ListItemText primary={`Limite: ${task.duration}min`} />
    <ListItemText primary={`${timer}`} />
    <AvTimer />
    <ListItemText primary={task.status} />
    <ButtonGroup variant="text" size="small">
      {task.status === 'pending' ? (
        <Button onClick={() => modifiedTask?.({ type: 'start', id: task.id })}>
          <PlayArrow />
        </Button>
      ) : (
        <>
          <Button>
            <Pause />
          </Button>
          <Button>
            <Stop />
          </Button>
          <Button>
            <RestartAlt />
          </Button>
        </>
      )}
    </ButtonGroup>
  </Box>
)

export default TaskCard
