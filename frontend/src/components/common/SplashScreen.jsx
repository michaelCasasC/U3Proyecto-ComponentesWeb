import { useEffect, useState } from 'react'
import { Box, Title, Text, Loader } from '@mantine/core'
import { IconBuildingHospital } from '@tabler/icons-react'

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
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#1976d2',
        transition: 'opacity 0.4s ease-out',
        opacity: fadeOut ? 0 : 1,
      }}
    >
      <IconBuildingHospital size={80} color="white" style={{ marginBottom: 16 }} />
      <Title order={1} fw={800} c="white" style={{ letterSpacing: 2 }}>
        MediCitas
      </Title>
      <Text c="rgba(255,255,255,0.8)" mt="xs">
        Gestión de Citas Médicas
      </Text>
      <Loader size={28} color="white" style={{ marginTop: 32 }} />
    </Box>
  )
}
