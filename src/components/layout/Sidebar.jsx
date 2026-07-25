import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material'
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

  return (
    <Box sx={{
      width: open ? 260 : 0,
      overflow: 'hidden',
      transition: 'width 0.3s ease',
      bgcolor: 'background.paper',
      borderRight: '1px solid',
      borderColor: 'divider',
      height: '100%',
      display: { xs: 'none', md: 'block' },
      flexShrink: 0,
    }}>
      <Box sx={{ pt: 10, pb: 2 }}>
        <List>
          {mainItems.map(item => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton selected={location.pathname === item.path} onClick={() => navigate(item.path)} sx={{ mx: 1, borderRadius: 2, mb: 0.5 }}>
                <ListItemIcon><item.icon color={location.pathname === item.path ? 'primary' : 'inherit'} /></ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <List>
          {isAdmin && (
            <ListItem disablePadding>
              <ListItemButton selected={location.pathname === '/admin'} onClick={() => navigate('/admin')} sx={{ mx: 1, borderRadius: 2, mb: 0.5 }}>
                <ListItemIcon><AdminPanelSettingsIcon color={location.pathname === '/admin' ? 'primary' : 'inherit'} /></ListItemIcon>
                <ListItemText primary="Administración" />
              </ListItemButton>
            </ListItem>
          )}
          {secondaryItems.map(item => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton selected={location.pathname === item.path} onClick={() => navigate(item.path)} sx={{ mx: 1, borderRadius: 2, mb: 0.5 }}>
                <ListItemIcon><item.icon color={location.pathname === item.path ? 'primary' : 'inherit'} /></ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
