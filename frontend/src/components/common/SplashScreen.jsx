import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'

const MIN_DISPLAY_MS = 1500

export default function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onFinish, 400)
    }, MIN_DISPLAY_MS)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <Box
      sx={{
        position: 'fixed', inset: 0, zIndex: 99999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        bgcolor: '#1976d2',
        transition: 'opacity 0.4s ease-out',
        opacity: fadeOut ? 0 : 1,
      }}
    >
      <LocalHospitalIcon sx={{ fontSize: 80, color: 'white', mb: 2 }} />
      <Typography variant="h3" fontWeight={800} color="white" sx={{ letterSpacing: 2 }}>
        MediCitas
      </Typography>
      <Typography variant="body1" color="rgba(255,255,255,0.8)" sx={{ mt: 1 }}>
        Gestión de Citas Médicas
      </Typography>
      <CircularProgress size={28} sx={{ color: 'white', mt: 4 }} />
    </Box>
  )
}
