import { Box, Button, ButtonGroup } from '@mui/material'
import { SaveAs, Cancel } from '@mui/icons-material'
import React from 'react'
import './TaskForm.css'

const TaskForm = ({
  handleSubmit,
  formState,
}: {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  formState: {
    values: {
      title: string
      timeLimit: string
      customTimeLimit: string | null
    }
    setter: React.Dispatch<
      React.SetStateAction<{
        title: string
        timeLimit: string
        customTimeLimit: string | null
      }>
    >
    activeForm: (state: boolean) => void
  }
}) => (
  <form onSubmit={handleSubmit}>
    <Box component="div" className="newTask">
      <div>
        <input
          type="text"
          placeholder="Titulo:"
          value={formState.values.title}
          onChange={({ target }) =>
            formState.setter((prev) => ({ ...prev, title: target.value }))
          }
          required
        />
      </div>
      <div>
        <select
          value={formState.values.timeLimit}
          onChange={({ target }) =>
            formState.setter((prev) => ({ ...prev, timeLimit: target.value }))
          }
        >
          <option value="">Seleccionar duracion</option>
          <option value="30">30 minutos</option>
          <option value="45">45 minutos</option>
          <option value="60">1 hora</option>
          <option value="other">Other value</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          disabled={formState.values.timeLimit !== 'other'}
          placeholder="Agrega cantidad en minutos:"
          value={formState.values.customTimeLimit ?? ''}
          onChange={({ target }) =>
            formState.setter((prev) => ({
              ...prev,
              customTimeLimit: target.value,
            }))
          }
          required
        />
      </div>
      <ButtonGroup variant="text" size="small">
        <Button type="submit">
          <SaveAs />
        </Button>
        <Button onClick={() => formState.activeForm(false)}>
          <Cancel />
        </Button>
      </ButtonGroup>
    </Box>
  </form>
)

export default TaskForm
