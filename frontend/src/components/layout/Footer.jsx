import { Box, Text, Anchor, Container, Group } from '@mantine/core'
import { Link as RouterLink } from 'react-router-dom'

export default function Footer() {
  return (
    <Box component="footer" style={{ borderTop: '1px solid var(--mantine-color-gray-3)', padding: '16px 0', marginTop: 'auto' }}>
      <Container size="lg">
        <Group justify="space-between" align="center" gap="md">
          <Group gap="xs" align="center">
            <img src="/favicon-32x32.png" alt="MediCitas Logo" style={{ width: 22, height: 22, borderRadius: 4 }} />
            <Text size="sm" c="dimmed">
              © {new Date().getFullYear()} MediCitas. Todos los derechos reservados.
            </Text>
          </Group>
          <Group gap="lg">
            <Anchor component={RouterLink} to="/about" size="sm" c="dimmed">Acerca de</Anchor>
            <Anchor component={RouterLink} to="/settings" size="sm" c="dimmed">Configuración</Anchor>
          </Group>
        </Group>
      </Container>
    </Box>
  )
}
