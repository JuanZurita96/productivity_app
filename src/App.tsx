import React from 'react'
import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material'
import { Restore, FormatListBulletedSharp } from '@mui/icons-material'
import { TaskList } from './Containers'

/** La primera parte de la aplicacion consta de un contenedor que a su vez representa una
 * seccion de navegacion para ver entre la lista de tareas y el historial.
 * Aqui se presenta el primer Container llamado -TaskList- que es donde se ejecuta la mayor parte de la logica
 * para las tareas. [Containers/TaskList.tsx].
 * Ademas tenemos una pequeña funcion para mostrar un modal que sirve para el historial.
 */

function App() {
  const [showModal, setShowModal] = React.useState(false)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault()
    if (newValue === 'historial') setShowModal(true)
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        margin: 'auto',
        padding: '1rem',
        boxShadow: 'rgb(0 0 0 / 24%) 0 3px 8px',
        backgroundColor: '#ffffff',
      }}
    >
      <BottomNavigation
        showLabels
        sx={{ width: 200, backgroundColor: 'transparent' }}
        value="lista"
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Lista"
          value="lista"
          icon={<FormatListBulletedSharp />}
        />
        <BottomNavigationAction
          label="Historial"
          value="historial"
          icon={<Restore />}
        />
      </BottomNavigation>
      <TaskList
        modal={{
          showModal,
          setShowModal,
        }}
      />
    </Container>
  )
}

export default App
