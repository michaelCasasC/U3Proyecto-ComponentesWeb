import { Card, Text, Group, Stack, Badge, Button, Box } from '@mantine/core'
import { IconHeart, IconHeartFilled, IconStar, IconBriefcase, IconClock } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'
import Avatar from '../common/Avatar'

export default function DoctorCard({ doctor }) {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(doctor.id)

  return (
    <Card
      padding="lg"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--mantine-color-gray-3)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      styles={{
        root: {
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 28px rgba(37, 99, 235, 0.12)',
            borderColor: 'rgba(37, 99, 235, 0.3)',
          },
        },
      }}
    >
      <Button
        variant="subtle"
        size="sm"
        onClick={() => toggleFavorite(doctor.id)}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          borderRadius: 20,
          padding: 4,
          minWidth: 36,
          height: 36,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 2,
        }}
      >
        {fav ? <IconHeartFilled size={18} color="red" /> : <IconHeart size={18} />}
      </Button>

      <Stack align="center" gap="sm" style={{ flexGrow: 1 }}>
        <Box style={{ padding: 2, borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)' }}>
          <Avatar name={doctor.name} size={76} />
        </Box>
        <Text fw={700} size="lg" ta="center" style={{ letterSpacing: '-0.01em' }}>
          {doctor.name}
        </Text>
        <Badge color="primary" variant="light" size="sm">
          {doctor.specialty}
        </Badge>

        <Group gap={6} p="xs" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: 16 }}>
          <IconStar size={16} color="#f59e0b" />
          <Text fw={700} size="sm">{doctor.rating}</Text>
          <Text size="xs" c="dimmed">(Reseñas)</Text>
        </Group>

        <Stack gap="sm" my="xs">
          <Group gap="sm">
            <IconBriefcase size={16} color="var(--mantine-color-gray-6)" />
            <Text size="sm" c="dimmed" fw={500}>{doctor.experience} años de exp.</Text>
          </Group>
          <Group gap="sm">
            <IconClock size={16} color="var(--mantine-color-gray-6)" />
            <Text size="sm" c="dimmed" fw={500}>{doctor.schedule}</Text>
          </Group>
        </Stack>

        <Badge
          variant="light"
          color={doctor.available ? 'green' : 'gray'}
          size="sm"
          style={{ fontWeight: 700 }}
        >
          {doctor.available ? '● Disponible' : '○ No disponible'}
        </Badge>
      </Stack>

      <Button
        fullWidth
        disabled={!doctor.available}
        onClick={() => navigate('/appointments', { state: { doctor } })}
        mt="md"
        style={{ borderRadius: 20 }}
      >
        Solicitar Cita
      </Button>
    </Card>
  )
}
