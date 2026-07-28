import { useState, useEffect } from 'react'
import { Paper, Group, Text, Button, ActionIcon, Box } from '@mantine/core'
import { IconDeviceMobile, IconX } from '@tabler/icons-react'

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
    <Paper
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        padding: 16,
        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        borderRadius: 24,
        maxWidth: 400,
      }}
    >
      <Group gap="md" align="center" wrap="nowrap">
        <img src="/android-chrome-192x192.png" alt="MediCitas App Icon" style={{ width: 44, height: 44, borderRadius: 16 }} />
        <Box style={{ flexGrow: 1 }}>
          <Text fw={600} size="sm">Instalar MediCitas</Text>
          <Text size="xs" c="dimmed">Agrega a tu pantalla de inicio</Text>
        </Box>
        <Button size="sm" onClick={handleInstall}>Instalar</Button>
        <ActionIcon variant="subtle" size="sm" onClick={() => setShowPrompt(false)}>
          <IconX size={16} />
        </ActionIcon>
      </Group>
    </Paper>
  )
}
