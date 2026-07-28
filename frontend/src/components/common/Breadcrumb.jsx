import { Anchor, Text, Group } from '@mantine/core'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { IconChevronRight } from '@tabler/icons-react'

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
    <Group gap={4} mb="md">
      {items.map((item, i) => (
        <Group key={item.path} gap={4} align="center">
          {i > 0 && <IconChevronRight size={14} color="var(--mantine-color-gray-5)" />}
          {i === items.length - 1 ? (
            <Text fw={500} size="sm">{item.label}</Text>
          ) : (
            <Anchor component={RouterLink} to={item.path} size="sm" c="dimmed">
              {item.label}
            </Anchor>
          )}
        </Group>
      ))}
    </Group>
  )
}
