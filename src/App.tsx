import React from 'react'
import {
  BrowserRouter as AppRouter,
  Routes,
  Route,
  Navigate,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'
import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material'
import { Restore, Favorite } from '@mui/icons-material'
import { TaskHistory, TaskList } from './Containers'

function App() {
  const [value, setValue] = React.useState('lista')

  const handleChange = (event: React.SyntheticEvent, newValue: string) =>
    setValue(newValue)

  const LinkBehavior = React.forwardRef<
    HTMLAnchorElement,
    Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
  >((props, ref) => {
    const { href, ...other } = props
    return <RouterLink ref={ref} to={href} {...other} />
  })

  return (
    <Container>
      <AppRouter>
        <BottomNavigation
          showLabels
          sx={{ width: 250 }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Lista"
            value="lista"
            icon={<Restore />}
            href={'./'}
            LinkComponent={LinkBehavior}
          />
          <BottomNavigationAction
            label="Historial"
            value="historial"
            icon={<Favorite />}
            href={'./history'}
            LinkComponent={LinkBehavior}
          />
        </BottomNavigation>
        <Routes>
          <Route path="/history" element={<TaskHistory />} />
          <Route path="/" element={<TaskList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppRouter>
    </Container>
  )
}

export default App
