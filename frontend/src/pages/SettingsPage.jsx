import { useState, useEffect } from 'react'
import { Box, Paper, Typography, Switch, FormControlLabel, Divider, Select, MenuItem, FormControl, InputLabel, Button, Alert } from '@mui/material'
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
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>Apariencia</Typography>
        <FormControlLabel control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />} label="Modo oscuro" />
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" fontWeight={600} mb={2}>Notificaciones</Typography>
        {!pushSupported ? (
          <Alert severity="info" sx={{ mb: 2 }}>Las notificaciones push no están disponibles en este navegador.</Alert>
        ) : null}
        <FormControlLabel
          control={<Switch checked={pushEnabled} onChange={(e) => handlePushToggle(e.target.checked)} disabled={!pushSupported} />}
          label="Notificaciones push"
        />
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" fontWeight={600} mb={2}>Idioma</Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Idioma</InputLabel>
          <Select value={language} onChange={(e) => setLanguage(e.target.value)} label="Idioma">
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </Select>
        </FormControl>
        <Box mt={4}>
          <Button variant="contained">Guardar Cambios</Button>
        </Box>
      </Paper>
    </Box>
  )
}
