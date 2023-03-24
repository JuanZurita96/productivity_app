import React from 'react'
import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material'
import { Restore, FormatListBulletedSharp } from '@mui/icons-material'
import { TaskList } from './Containers'

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
