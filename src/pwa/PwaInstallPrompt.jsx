import { useState, useEffect } from 'react'
import { Box, Button, Typography, Paper, IconButton } from '@mui/material'
import InstallMobileIcon from '@mui/icons-material/InstallMobile'
import CloseIcon from '@mui/icons-material/Close'

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const result = await deferredPrompt.userChoice
    if (result.outcome === 'accepted') setShowPrompt(false)
    setDeferredPrompt(null)
  }

  if (!showPrompt) return null

  return (
    <Paper sx={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, p: 2, display: 'flex', alignItems: 'center', gap: 2, boxShadow: 6, borderRadius: 3, maxWidth: 400 }}>
      <InstallMobileIcon color="primary" sx={{ fontSize: 40 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" fontWeight={600}>Instalar MediCitas</Typography>
        <Typography variant="caption" color="text.secondary">Agrega a tu pantalla de inicio</Typography>
      </Box>
      <Button variant="contained" size="small" onClick={handleInstall}>Instalar</Button>
      <IconButton size="small" onClick={() => setShowPrompt(false)}><CloseIcon fontSize="small" /></IconButton>
    </Paper>
  )
}
