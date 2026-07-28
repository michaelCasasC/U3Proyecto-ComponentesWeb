import { useState } from 'react'
import { Group, Box, Text, ActionIcon, Badge, Menu, Divider, Drawer, Stack, Button, useMantineTheme, Tooltip } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { IconMenu2, IconBell, IconSun, IconMoon, IconUser, IconLogout, IconSettings, IconShieldLock } from '@tabler/icons-react'
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
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`)
  const [opened, { open, close }] = useDisclosure(false)

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <>
      <Box
        component="nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 'var(--navbar-height, 60px)',
          backdropFilter: 'blur(16px)',
          backgroundColor: mode === 'dark' ? 'rgba(11, 15, 25, 0.82)' : 'rgba(255, 255, 255, 0.82)',
          borderBottom: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(226, 232, 240, 0.8)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        {isMobile && (
          <ActionIcon variant="subtle" onClick={open} style={{ marginRight: 12 }}>
            <IconMenu2 size={22} />
          </ActionIcon>
        )}
        <Box
          component={RouterLink}
          to="/"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 10, flexGrow: isMobile ? 1 : 0 }}
        >
          <img src="/android-chrome-192x192.png" alt="MediCitas Logo" style={{ width: 36, height: 36, borderRadius: 20, boxShadow: '0 2px 10px rgba(37,99,235,0.2)' }} />
          <Text fw={800} size="lg" style={{
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            MediCitas
          </Text>
        </Box>

        {!isMobile && (
          <Group gap="xs" ml="xl">
            {navItems.map(item => {
              const isActive = location.pathname === item.path
              return (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  variant={isActive ? 'light' : 'subtle'}
                  color={isActive ? 'primary' : 'gray'}
                  size="sm"
                  style={{
                    fontWeight: isActive ? 700 : 500,
                    borderRadius: 16,
                  }}
                >
                  {item.label}
                </Button>
              )
            })}
          </Group>
        )}

        <Box style={{ flexGrow: 1 }} />

        <Group gap="xs" align="center">
          <Tooltip label={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
            <ActionIcon variant="subtle" onClick={toggleTheme} size="lg" style={{ borderRadius: 20 }}>
              {mode === 'dark' ? <IconSun size={20} color="#f59e0b" /> : <IconMoon size={20} color="#475569" />}
            </ActionIcon>
          </Tooltip>

          <Menu shadow="md" width={320} offset={8} withArrow>
            <Menu.Target>
              <ActionIcon variant="subtle" size="lg" style={{ borderRadius: 20 }}>
                <IconBell size={20} />
                <Badge size="xs" color="red" style={{ position: 'absolute', top: -2, right: -2 }}>3</Badge>
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label fw={700}>Notificaciones</Menu.Label>
              <Menu.Item fw={500} size="sm">Recordatorio: Cita con Dr. Mendoza mañana a las 10:00 AM</Menu.Item>
              <Menu.Item fw={500} size="sm">Su cita ha sido confirmada exitosamente</Menu.Item>
              <Menu.Item fw={500} size="sm">Nuevo especialista disponible en Cardiología</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Menu shadow="md" offset={8} withArrow>
            <Menu.Target>
              <ActionIcon variant="subtle" size="lg" style={{ borderRadius: 20, padding: 2 }}>
                <Avatar name={user?.name} size={32} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconUser size={18} />} onClick={() => navigate('/profile')}>
                Mi Perfil
              </Menu.Item>
              <Menu.Item leftSection={<IconSettings size={18} />} onClick={() => navigate('/settings')}>
                Configuración
              </Menu.Item>
              {isAdmin && (
                <Menu.Item leftSection={<IconShieldLock size={18} />} onClick={() => navigate('/admin')} color="primary">
                  Administración
                </Menu.Item>
              )}
              <Divider />
              <Menu.Item leftSection={<IconLogout size={18} />} onClick={handleLogout} color="red">
                Cerrar Sesión
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Box>

      <Drawer opened={opened} onClose={close} size={280} padding="md" withCloseButton={false}>
        <Group gap="sm" pb="md" mb="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
          <img src="/android-chrome-192x192.png" alt="MediCitas Logo" style={{ width: 40, height: 40, borderRadius: 20 }} />
          <Text fw={800} size="lg" c="primary">MediCitas</Text>
        </Group>
        <Stack gap="xs">
          {navItems.map(item => {
            const isActive = location.pathname === item.path
            return (
              <Button
                key={item.path}
                variant={isActive ? 'light' : 'subtle'}
                color={isActive ? 'primary' : 'gray'}
                fullWidth
                onClick={() => { close(); navigate(item.path) }}
                style={{ borderRadius: 16, fontWeight: isActive ? 700 : 500 }}
              >
                {item.label}
              </Button>
            )
          })}
        </Stack>
      </Drawer>
    </>
  )
}
