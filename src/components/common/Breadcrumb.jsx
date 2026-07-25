import { Breadcrumbs, Typography, Link } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const breadcrumbMap = {
  '/': 'Inicio',
  '/specialties': 'Especialidades',
  '/doctors': 'Médicos',
  '/appointments': 'Agendar Cita',
  '/history': 'Historial',
  '/profile': 'Mi Perfil',
  '/settings': 'Configuración',
  '/admin': 'Administración',
  '/about': 'Acerca de',
}

export default function Breadcrumb() {
  const location = useLocation()
  const paths = location.pathname.split('/').filter(Boolean)
  const items = [{ label: 'Inicio', path: '/' }]

  paths.forEach((_, index) => {
    const path = '/' + paths.slice(0, index + 1).join('/')
    items.push({ label: breadcrumbMap[path] || paths[index], path })
  })

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
      {items.map((item, i) =>
        i === items.length - 1 ? (
          <Typography key={item.path} color="text.primary" fontWeight={500}>{item.label}</Typography>
        ) : (
          <Link key={item.path} component={RouterLink} to={item.path} underline="hover" color="inherit">
            {item.label}
          </Link>
        )
      )}
    </Breadcrumbs>
  )
}
