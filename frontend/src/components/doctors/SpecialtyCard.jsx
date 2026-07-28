import { Card, CardContent, Typography, Box, Chip, useTheme } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import HealingIcon from '@mui/icons-material/Healing'
import PsychologyIcon from '@mui/icons-material/Psychology'
import SpaIcon from '@mui/icons-material/Spa'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'

const iconMap = {
  Favorite: FavoriteIcon,
  ChildCare: ChildCareIcon,
  Healing: HealingIcon,
  Psychology: PsychologyIcon,
  Spa: SpaIcon,
  Visibility: VisibilityIcon,
  LocalHospital: LocalHospitalIcon,
}

export default function SpecialtyCard({ specialty }) {
  const navigate = useNavigate()
  const theme = useTheme()
  const Icon = iconMap[specialty.icon] || LocalHospitalIcon

  return (
    <Card
      onClick={() => navigate(`/specialties/${specialty.id}`)}
      sx={{
        height: '100%',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: theme.palette.mode === 'dark' ? '0 14px 30px rgba(0, 0, 0, 0.6)' : '0 14px 30px rgba(37, 99, 235, 0.12)',
          borderColor: specialty.color || 'primary.main',
          '& .arrow-icon': {
            transform: 'translateX(4px)',
            color: specialty.color || 'primary.main',
          },
        },
      }}
    >
      <CardContent sx={{ textAlign: 'center', py: 4, px: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
        <Box sx={{
          width: 72,
          height: 72,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${specialty.color}22 0%, ${specialty.color}10 100%)`,
          border: `1px solid ${specialty.color}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2.5,
          boxShadow: `0 8px 20px -4px ${specialty.color}25`,
        }}>
          <Icon sx={{ fontSize: 36, color: specialty.color }} />
        </Box>

        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ letterSpacing: '-0.01em' }}>
          {specialty.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, flexGrow: 1, lineHeight: 1.6 }}>
          {specialty.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Chip
            label={`${specialty.doctorsCount} Médicos`}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: '0.75rem',
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            }}
          />
          <Box className="arrow-icon" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', transition: 'all 0.2s ease' }}>
            <ArrowForwardIcon fontSize="small" />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
