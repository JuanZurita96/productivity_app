import { Box, Button, ButtonGroup } from '@mui/material'
import { SaveAs, Cancel } from '@mui/icons-material'
import React from 'react'
import { FormState } from '../Interfaces/Task'
import './TaskForm.css'

/**TaskForm.tsx - Muestra el formulario de creacion o edicion de una tarea.
 * Titulo: es el titulo o nombre de la tarea.
 * Select: representa un selector con valores predeterminados (30, 45, 60), y un valor adicional para un tiempo custom.
 * CustomTime: es un tiempo en minutos perzonalizado a un maximo de 120 (2 horas)
 */

const TaskForm = ({
  handleSubmit,
  formState,
}: {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  formState: {
    values: FormState
    setter: React.Dispatch<React.SetStateAction<FormState>>
    activeForm: () => void
  }
}) => (
  <form onSubmit={handleSubmit}>
    <Box component="div" className="newTask">
      <div>
        <input
          autoFocus
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
          <option value="other">Perzonalizado</option>
        </select>
      </div>
      <div>
        <input
          type="number"
          disabled={formState.values.timeLimit !== 'other'}
          placeholder="Cantidad en minutos:"
          value={formState.values.customTimeLimit ?? ''}
          max={120}
          onKeyPress={(e) => !/[0-9.]/.test(e.key) && e.preventDefault()}
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
        <Button onClick={formState.activeForm}>
          <Cancel />
        </Button>
      </ButtonGroup>
    </Box>
  </form>
)

export default TaskForm
