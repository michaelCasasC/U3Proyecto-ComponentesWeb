import { Paper, Text, Group, Stack, Divider, Box } from '@mantine/core'
import { IconMail, IconId } from '@tabler/icons-react'
import { useAuth } from '../context/AuthContext'
import Breadcrumb from '../components/common/Breadcrumb'
import PageHeader from '../components/common/PageHeader'
import Avatar from '../components/common/Avatar'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <Box>
      <Breadcrumb />
      <PageHeader title="Mi Perfil" subtitle="Información personal de la cuenta" />
      <Paper p="lg" style={{ maxWidth: 600 }}>
        <Group gap="lg" mb="lg" align="center">
          <Avatar name={user?.name} size={96} />
          <Box>
            <Text fw={600} size="xl">{user?.name}</Text>
            <Text size="sm" c="dimmed">{user?.role === 'admin' ? 'Administrador' : 'Paciente'}</Text>
          </Box>
        </Group>
        <Divider mb="md" />
        <Stack gap="md">
          <Group gap="sm">
            <IconMail size={20} color="var(--mantine-color-gray-6)" />
            <Text>{user?.email}</Text>
          </Group>
          <Group gap="sm">
            <IconId size={20} color="var(--mantine-color-gray-6)" />
            <Text>ID: {user?.id}</Text>
          </Group>
        </Stack>
      </Paper>
    </Box>
  )
}
