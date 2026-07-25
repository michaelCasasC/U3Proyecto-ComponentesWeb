import { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Badge, Box, Menu, MenuItem, ListItemIcon, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useThemeMode } from '../../context/ThemeContext'
import Avatar from '../common/Avatar'

const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Especialidades', path: '/specialties' },
  { label: 'Médicos', path: '/doctors' },
  { label: 'Agendar Cita', path: '/appointments' },
  { label: 'Historial', path: '/history' },
]

export default function Navbar({ onMenuToggle }) {
  const { user, logout, isAdmin } = useAuth()
  const { mode, toggleTheme } = useThemeMode()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifAnchor, setNotifAnchor] = useState(null)

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }} color="inherit" elevation={0}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" fontWeight={700} color="primary" component={RouterLink} to="/" sx={{ textDecoration: 'none', flexGrow: { xs: 1, md: 0 } }}>
            MediCitas
          </Typography>
          {!isMobile && (
            <Box display="flex" ml={4} gap={1}>
              {navItems.map(item => (
                <Typography key={item.path} component={RouterLink} to={item.path}
                  sx={{ textDecoration: 'none', color: 'text.secondary', px: 1.5, py: 0.5, borderRadius: 1, '&:hover': { bgcolor: 'action.hover', color: 'primary.main' } }}>
                  {item.label}
                </Typography>
              ))}
            </Box>
          )}
          <Box flexGrow={1} />
          <IconButton onClick={toggleTheme} color="inherit"><LightModeIcon /></IconButton>
          <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)} color="inherit">
            <Badge badgeContent={3} color="error"><NotificationsIcon /></Badge>
          </IconButton>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 1 }}>
            <Avatar name={user?.name} size={34} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => { setAnchorEl(null); navigate('/profile') }}>
          <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon> Mi Perfil
        </MenuItem>
        <MenuItem onClick={() => { setAnchorEl(null); navigate('/settings') }}>
          <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon> Configuración
        </MenuItem>
        {isAdmin && <MenuItem onClick={() => { setAnchorEl(null); navigate('/admin') }}>
          <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon> Administración
        </MenuItem>}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon> Cerrar Sesión
        </MenuItem>
      </Menu>
      <Menu anchorEl={notifAnchor} open={Boolean(notifAnchor)} onClose={() => setNotifAnchor(null)}>
        <MenuItem onClick={() => setNotifAnchor(null)}>Recordatorio: Cita con Dr. Mendoza mañana</MenuItem>
        <MenuItem onClick={() => setNotifAnchor(null)}>Su cita ha sido confirmada</MenuItem>
        <MenuItem onClick={() => setNotifAnchor(null)}>Nuevo médico disponible en Cardiología</MenuItem>
      </Menu>
      {isMobile && (
        <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
          <Box sx={{ width: 260, pt: 8 }}>
            <List>
              {navItems.map(item => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton onClick={() => { setMobileOpen(false); navigate(item.path) }}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      )}
    </>
  )
}
