import { Card, Text, Group, Box, Badge } from '@mantine/core'
import { IconHeart, IconBabyBottle, IconBandage, IconBrain, IconLeaf, IconEye, IconBuildingHospital, IconArrowRight } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

const iconMap = {
  Favorite: IconHeart,
  ChildCare: IconBabyBottle,
  Healing: IconBandage,
  Psychology: IconBrain,
  Spa: IconLeaf,
  Visibility: IconEye,
  LocalHospital: IconBuildingHospital,
}

export default function SpecialtyCard({ specialty }) {
  const navigate = useNavigate()
  const Icon = iconMap[specialty.icon] || IconBuildingHospital

  return (
    <Card
      padding="lg"
      onClick={() => navigate(`/specialties/${specialty.id}`)}
      style={{
        height: '100%',
        cursor: 'pointer',
        border: '1px solid var(--mantine-color-gray-3)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      styles={{
        root: {
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 14px 30px rgba(37, 99, 235, 0.12)',
            borderColor: specialty.color || 'var(--mantine-color-primary-6)',
          },
        },
      }}
    >
      <Box
        style={{
          width: 72,
          height: 72,
          borderRadius: 32,
          background: `linear-gradient(135deg, ${specialty.color}22 0%, ${specialty.color}10 100%)`,
          border: `1px solid ${specialty.color}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: `0 8px 20px -4px ${specialty.color}25`,
        }}
      >
        <Icon size={36} color={specialty.color} />
      </Box>

      <Text fw={700} size="lg" mb="xs" style={{ letterSpacing: '-0.01em' }}>
        {specialty.name}
      </Text>

      <Text size="sm" c="dimmed" mb="md" style={{ lineHeight: 1.6, flexGrow: 1 }}>
        {specialty.description}
      </Text>

      <Group justify="space-between" align="center" pt="sm" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
        <Badge size="sm" variant="light" color="gray">
          {specialty.doctorsCount} Médicos
        </Badge>
        <IconArrowRight size={18} color="var(--mantine-color-gray-6)" />
      </Group>
    </Card>
  )
}
