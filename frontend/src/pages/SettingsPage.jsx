import { useState, useEffect } from 'react'
import { Box, Paper, Text, Switch, Divider, Select, Button, Alert, Group, Stack } from '@mantine/core'
import { useThemeMode } from '../context/ThemeContext'
import { useNotification } from '../context/NotificationContext'
import { subscribeToPushNotifications, unsubscribeFromPushNotifications } from '../services/pushNotifications'
import Breadcrumb from '../components/common/Breadcrumb'
import PageHeader from '../components/common/PageHeader'

export default function SettingsPage() {
  const { mode, toggleTheme } = useThemeMode()
  const { showNotification } = useNotification()
  const [pushEnabled, setPushEnabled] = useState(() => localStorage.getItem('pushEnabled') !== 'false')
  const [pushSupported, setPushSupported] = useState(false)
  const [language, setLanguage] = useState('es')

  useEffect(() => {
    setPushSupported('serviceWorker' in navigator && 'PushManager' in window)
  }, [])

  const handlePushToggle = async (enabled) => {
    setPushEnabled(enabled)
    localStorage.setItem('pushEnabled', enabled)
    if (enabled) {
      const ok = await subscribeToPushNotifications()
      if (ok) showNotification('Notificaciones push activadas')
      else showNotification('No se pudieron activar las notificaciones push', 'warning')
    } else {
      await unsubscribeFromPushNotifications()
      showNotification('Notificaciones push desactivadas')
    }
  }

  return (
    <Box>
      <Breadcrumb />
      <PageHeader title="Configuración" subtitle="Personaliza tu experiencia en MediCitas" />
      <Paper p="lg" style={{ maxWidth: 600 }}>
        <Text fw={600} size="lg" mb="md">Apariencia</Text>
        <Switch checked={mode === 'dark'} onChange={toggleTheme} label="Modo oscuro" mb="md" />
        <Divider my="lg" />
        <Text fw={600} size="lg" mb="md">Notificaciones</Text>
        {!pushSupported ? (
          <Alert color="blue" mb="md">Las notificaciones push no están disponibles en este navegador.</Alert>
        ) : null}
        <Switch checked={pushEnabled} onChange={(e) => handlePushToggle(e.currentTarget.checked)} disabled={!pushSupported} label="Notificaciones push" mb="md" />
        <Divider my="lg" />
        <Text fw={600} size="lg" mb="md">Idioma</Text>
        <Select
          value={language}
          onChange={setLanguage}
          data={[{ value: 'es', label: 'Español' }, { value: 'en', label: 'English' }]}
          style={{ maxWidth: 200 }}
          mb="md"
        />
        <Button mt="lg">Guardar Cambios</Button>
      </Paper>
    </Box>
  )
}
