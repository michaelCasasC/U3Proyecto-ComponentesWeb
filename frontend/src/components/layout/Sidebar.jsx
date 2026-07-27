import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, useTheme } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import HistoryIcon from '@mui/icons-material/History'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import InfoIcon from '@mui/icons-material/Info'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const mainItems = [
  { label: 'Dashboard', icon: DashboardIcon, path: '/' },
  { label: 'Especialidades', icon: LocalHospitalIcon, path: '/specialties' },
  { label: 'Médicos', icon: MedicalServicesIcon, path: '/doctors' },
  { label: 'Agendar Cita', icon: CalendarMonthIcon, path: '/appointments' },
  { label: 'Historial', icon: HistoryIcon, path: '/history' },
]

const secondaryItems = [
  { label: 'Mi Perfil', icon: PersonIcon, path: '/profile' },
  { label: 'Configuración', icon: SettingsIcon, path: '/settings' },
  { label: 'Acerca de', icon: InfoIcon, path: '/about' },
]

export default function Sidebar({ open }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const theme = useTheme()

  return (
    <Box sx={{
      width: open ? 260 : 0,
      overflow: 'hidden',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      bgcolor: 'background.paper',
      borderRight: '1px solid',
      borderColor: 'divider',
      height: '100%',
      display: { xs: 'none', md: 'block' },
      flexShrink: 0,
    }}>
      <Box sx={{ pt: 10, pb: 3, px: 1.5 }}>
        <Typography variant="caption" sx={{ px: 2, py: 1, color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
          Menú Principal
        </Typography>
        <List disablePadding>
          {mainItems.map(item => {
            const isActive = location.pathname === item.path
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={isActive}
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 2.5,
                    py: 1.2,
                    px: 2,
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    bgcolor: isActive ? (theme.palette.mode === 'dark' ? 'rgba(37, 99, 235, 0.18)' : 'rgba(37, 99, 235, 0.08)') : 'transparent',
                    color: isActive ? 'primary.main' : 'text.primary',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(37, 99, 235, 0.04)',
                    },
                    '&::before': isActive ? {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '20%',
                      bottom: '20%',
                      width: 4,
                      borderRadius: '0 4px 4px 0',
                      bgcolor: 'primary.main',
                    } : {},
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 38, color: isActive ? 'primary.main' : 'text.secondary' }}>
                    <item.icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500, fontSize: '0.9rem' }} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="caption" sx={{ px: 2, py: 1, color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
          Cuenta & Sistema
        </Typography>

        <List disablePadding>
          {isAdmin && (
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={location.pathname === '/admin'}
                onClick={() => navigate('/admin')}
                sx={{
                  borderRadius: 2.5,
                  py: 1.2,
                  px: 2,
                  bgcolor: location.pathname === '/admin' ? (theme.palette.mode === 'dark' ? 'rgba(37, 99, 235, 0.18)' : 'rgba(37, 99, 235, 0.08)') : 'transparent',
                  color: location.pathname === '/admin' ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(37, 99, 235, 0.04)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 38, color: location.pathname === '/admin' ? 'primary.main' : 'text.secondary' }}>
                  <AdminPanelSettingsIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText primary="Administración" primaryTypographyProps={{ fontWeight: location.pathname === '/admin' ? 700 : 600, fontSize: '0.9rem' }} />
              </ListItemButton>
            </ListItem>
          )}

          {secondaryItems.map(item => {
            const isActive = location.pathname === item.path
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={isActive}
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 2.5,
                    py: 1.2,
                    px: 2,
                    bgcolor: isActive ? (theme.palette.mode === 'dark' ? 'rgba(37, 99, 235, 0.18)' : 'rgba(37, 99, 235, 0.08)') : 'transparent',
                    color: isActive ? 'primary.main' : 'text.primary',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(37, 99, 235, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 38, color: isActive ? 'primary.main' : 'text.secondary' }}>
                    <item.icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500, fontSize: '0.9rem' }} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Box>
  )
}
