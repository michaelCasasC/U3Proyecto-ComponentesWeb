import { Box, Text, Stack, Button, Divider, Group } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { IconDashboard, IconBuildingHospital, IconStethoscope, IconCalendarMonth, IconHistory, IconUser, IconSettings, IconShieldLock, IconInfoCircle } from '@tabler/icons-react'

const mainItems = [
  { label: 'Dashboard', icon: IconDashboard, path: '/' },
  { label: 'Especialidades', icon: IconBuildingHospital, path: '/specialties' },
  { label: 'Médicos', icon: IconStethoscope, path: '/doctors' },
  { label: 'Agendar Cita', icon: IconCalendarMonth, path: '/appointments' },
  { label: 'Historial', icon: IconHistory, path: '/history' },
]

const secondaryItems = [
  { label: 'Mi Perfil', icon: IconUser, path: '/profile' },
  { label: 'Configuración', icon: IconSettings, path: '/settings' },
  { label: 'Acerca de', icon: IconInfoCircle, path: '/about' },
]

export default function Sidebar({ open }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAdmin } = useAuth()

  return (
    <Box
      style={{
        width: open ? 260 : 0,
        overflow: 'hidden',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRight: '1px solid var(--mantine-color-gray-3)',
        height: '100%',
        flexShrink: 0,
      }}
      visibleFrom="md"
    >
      <Box style={{ paddingTop: 80, paddingBottom: 24, paddingLeft: 12, paddingRight: 12 }}>
        <Text size="xs" px="md" py="xs" c="dimmed" fw={700} tt="uppercase" style={{ letterSpacing: '0.05em' }}>
          Menú Principal
        </Text>
        <Stack gap={4}>
          {mainItems.map(item => {
            const isActive = location.pathname === item.path
            return (
              <Button
                key={item.path}
                variant={isActive ? 'light' : 'subtle'}
                color={isActive ? 'primary' : 'gray'}
                justify="flex-start"
                leftSection={<item.icon size={18} />}
                fullWidth
                onClick={() => navigate(item.path)}
                style={{
                  borderRadius: 20,
                  fontWeight: isActive ? 700 : 500,
                  height: 44,
                  paddingLeft: 16,
                }}
              >
                {item.label}
              </Button>
            )
          })}
        </Stack>

        <Divider my="md" />

        <Text size="xs" px="md" py="xs" c="dimmed" fw={700} tt="uppercase" style={{ letterSpacing: '0.05em' }}>
          Cuenta & Sistema
        </Text>

        <Stack gap={4}>
          {isAdmin && (
            <Button
              variant={location.pathname === '/admin' ? 'light' : 'subtle'}
              color={location.pathname === '/admin' ? 'primary' : 'gray'}
              justify="flex-start"
              leftSection={<IconShieldLock size={18} />}
              fullWidth
              onClick={() => navigate('/admin')}
              style={{
                borderRadius: 20,
                fontWeight: location.pathname === '/admin' ? 700 : 600,
                height: 44,
                paddingLeft: 16,
              }}
            >
              Administración
            </Button>
          )}

          {secondaryItems.map(item => {
            const isActive = location.pathname === item.path
            return (
              <Button
                key={item.path}
                variant={isActive ? 'light' : 'subtle'}
                color={isActive ? 'primary' : 'gray'}
                justify="flex-start"
                leftSection={<item.icon size={18} />}
                fullWidth
                onClick={() => navigate(item.path)}
                style={{
                  borderRadius: 20,
                  fontWeight: isActive ? 700 : 500,
                  height: 44,
                  paddingLeft: 16,
                }}
              >
                {item.label}
              </Button>
            )
          })}
        </Stack>
      </Box>
    </Box>
  )
}
