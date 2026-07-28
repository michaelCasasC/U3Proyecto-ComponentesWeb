import { SimpleGrid, Paper, Text, Title, Box, Card } from '@mantine/core'
import { IconBuildingHospital, IconShieldLock, IconBolt, IconDevices } from '@tabler/icons-react'
import Breadcrumb from '../components/common/Breadcrumb'
import PageHeader from '../components/common/PageHeader'

const features = [
  { icon: IconBuildingHospital, title: 'Gestión Médica', desc: 'Administra tus citas médicas de forma sencilla y rápida.' },
  { icon: IconShieldLock, title: 'Seguridad', desc: 'Tus datos médicos están protegidos con los más altos estándares.' },
  { icon: IconBolt, title: 'Rápido y Eficiente', desc: 'Encuentra médicos y agendas citas en segundos.' },
  { icon: IconDevices, title: 'Multiplataforma', desc: 'Accede desde cualquier dispositivo, en cualquier momento.' },
]

export default function AboutPage() {
  return (
    <Box>
      <Breadcrumb />
      <PageHeader title="Acerca de MediCitas" subtitle="Plataforma moderna para la gestión de citas médicas" />
      <Paper p="lg" mb="lg" style={{ textAlign: 'center' }}>
        <img src="/android-chrome-512x512.png" alt="MediCitas Logo" style={{ width: 96, height: 96, marginBottom: 16, borderRadius: 24 }} />
        <Title order={2} fw={700} mb="xs">MediCitas</Title>
        <Text size="md" c="dimmed" style={{ maxWidth: 600, margin: '0 auto' }}>
          MediCitas es una plataforma digital que conecta pacientes con profesionales de la salud,
          facilitando la gestión de citas médicas de manera eficiente y moderna.
        </Text>
        <Text size="sm" c="dimmed" mt="md">Versión 1.0.0</Text>
      </Paper>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        {features.map((f, i) => (
          <Card key={i} padding="lg" style={{ textAlign: 'center' }}>
            <f.icon size={48} color="var(--mantine-color-primary-6)" style={{ marginBottom: 16 }} />
            <Text fw={600} size="lg" mb="xs">{f.title}</Text>
            <Text size="sm" c="dimmed">{f.desc}</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  )
}
