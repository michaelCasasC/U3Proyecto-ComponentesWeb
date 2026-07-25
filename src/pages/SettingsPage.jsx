import { useState } from 'react'
import { Box, Paper, Typography, Switch, FormControlLabel, Divider, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material'
import { useThemeMode } from '../context/ThemeContext'
import Breadcrumb from '../components/common/Breadcrumb'
import PageHeader from '../components/common/PageHeader'

export default function SettingsPage() {
  const { mode, toggleTheme } = useThemeMode()
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState('es')

  return (
    <Box>
      <Breadcrumb />
      <PageHeader title="Configuración" subtitle="Personaliza tu experiencia en MediCitas" />
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>Apariencia</Typography>
        <FormControlLabel control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />} label="Modo oscuro" />
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" fontWeight={600} mb={2}>Notificaciones</Typography>
        <FormControlLabel control={<Switch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />} label="Notificaciones push" />
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
