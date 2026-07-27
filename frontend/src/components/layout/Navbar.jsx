import { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Badge, Box, Menu, MenuItem, ListItemIcon, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom'
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
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifAnchor, setNotifAnchor] = useState(null)

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }} color="inherit" elevation={0}>
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          {isMobile && (
            <IconButton edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 1.5 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'primary.main', flexGrow: { xs: 1, md: 0 }, gap: 1.25 }}>
            <Box component="img" src="/android-chrome-192x192.png" alt="MediCitas Logo" sx={{ width: 36, height: 36, borderRadius: 2.5, boxShadow: '0 2px 10px rgba(37,99,235,0.2)' }} />
            <Typography variant="h6" fontWeight={800} color="primary" sx={{ letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              MediCitas
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', ml: 4, gap: 1 }}>
              {navItems.map(item => {
                const isActive = location.pathname === item.path
                return (
                  <Typography key={item.path} component={RouterLink} to={item.path}
                    sx={{
                      textDecoration: 'none',
                      color: isActive ? 'primary.main' : 'text.secondary',
                      fontWeight: isActive ? 700 : 500,
                      px: 2,
                      py: 0.8,
                      borderRadius: 2,
                      fontSize: '0.925rem',
                      bgcolor: isActive ? (theme.palette.mode === 'dark' ? 'rgba(37, 99, 235, 0.15)' : 'rgba(37, 99, 235, 0.08)') : 'transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(37, 99, 235, 0.05)',
                        color: 'primary.main',
                      },
                    }}>
                    {item.label}
                  </Typography>
                )
              })}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={toggleTheme} color="inherit" sx={{ p: 1, borderRadius: 2.5, '&:hover': { bgcolor: 'action.hover' } }}>
              {mode === 'dark' ? <LightModeIcon sx={{ color: '#f59e0b' }} /> : <DarkModeIcon sx={{ color: '#475569' }} />}
            </IconButton>

            <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)} color="inherit" sx={{ p: 1, borderRadius: 2.5, '&:hover': { bgcolor: 'action.hover' } }}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon color="action" />
              </Badge>
            </IconButton>

            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 0.5, p: 0.5 }}>
              <Avatar name={user?.name} size={36} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 4,
          sx: { borderRadius: 3, minWidth: 180, mt: 1, p: 0.5, border: '1px solid', borderColor: 'divider' }
        }}
      >
        <MenuItem onClick={() => { setAnchorEl(null); navigate('/profile') }} sx={{ borderRadius: 2, py: 1 }}>
          <ListItemIcon><AccountCircleIcon fontSize="small" color="action" /></ListItemIcon>
          <Typography variant="body2" fontWeight={500}>Mi Perfil</Typography>
        </MenuItem>
        <MenuItem onClick={() => { setAnchorEl(null); navigate('/settings') }} sx={{ borderRadius: 2, py: 1 }}>
          <ListItemIcon><SettingsIcon fontSize="small" color="action" /></ListItemIcon>
          <Typography variant="body2" fontWeight={500}>Configuración</Typography>
        </MenuItem>
        {isAdmin && (
          <MenuItem onClick={() => { setAnchorEl(null); navigate('/admin') }} sx={{ borderRadius: 2, py: 1 }}>
            <ListItemIcon><AdminPanelSettingsIcon fontSize="small" color="primary" /></ListItemIcon>
            <Typography variant="body2" fontWeight={600} color="primary">Administración</Typography>
          </MenuItem>
        )}
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleLogout} sx={{ borderRadius: 2, py: 1, color: 'error.main' }}>
          <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
          <Typography variant="body2" fontWeight={600}>Cerrar Sesión</Typography>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={notifAnchor}
        open={Boolean(notifAnchor)}
        onClose={() => setNotifAnchor(null)}
        PaperProps={{
          elevation: 4,
          sx: { borderRadius: 3, width: 320, mt: 1, p: 1, border: '1px solid', borderColor: 'divider' }
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: 700 }}>Notificaciones</Typography>
        <Divider sx={{ mb: 1 }} />
        <MenuItem onClick={() => setNotifAnchor(null)} sx={{ borderRadius: 2, py: 1.2, whiteSpace: 'normal' }}>
          <Typography variant="body2" fontWeight={500}>Recordatorio: Cita con Dr. Mendoza mañana a las 10:00 AM</Typography>
        </MenuItem>
        <MenuItem onClick={() => setNotifAnchor(null)} sx={{ borderRadius: 2, py: 1.2, whiteSpace: 'normal' }}>
          <Typography variant="body2" fontWeight={500}>Su cita ha sido confirmada exitosamente</Typography>
        </MenuItem>
        <MenuItem onClick={() => setNotifAnchor(null)} sx={{ borderRadius: 2, py: 1.2, whiteSpace: 'normal' }}>
          <Typography variant="body2" fontWeight={500}>Nuevo especialista disponible en Cardiología</Typography>
        </MenuItem>
      </Menu>

      {isMobile && (
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{ sx: { width: 280, borderRadius: '0 16px 16px 0' } }}
        >
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box component="img" src="/android-chrome-192x192.png" alt="MediCitas Logo" sx={{ width: 40, height: 40, borderRadius: 2.5 }} />
            <Typography variant="h6" fontWeight={800} color="primary">MediCitas</Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <List>
              {navItems.map(item => {
                const isActive = location.pathname === item.path
                return (
                  <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      selected={isActive}
                      onClick={() => { setMobileOpen(false); navigate(item.path) }}
                      sx={{ borderRadius: 2, py: 1 }}
                    >
                      <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }} />
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </>
  )
}
