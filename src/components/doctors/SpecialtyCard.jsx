import { Card, CardContent, Typography, Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import HealingIcon from '@mui/icons-material/Healing'
import PsychologyIcon from '@mui/icons-material/Psychology'
import SpaIcon from '@mui/icons-material/Spa'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
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
  const Icon = iconMap[specialty.icon] || LocalHospitalIcon

  return (
    <Card
      onClick={() => navigate(`/specialties/${specialty.id}`)}
      sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6, transform: 'translateY(-4px)', transition: 'all 0.3s' } }}
    >
      <CardContent sx={{ textAlign: 'center', py: 4 }}>
        <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: `${specialty.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
          <Icon sx={{ fontSize: 32, color: specialty.color }} />
        </Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>{specialty.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{specialty.description}</Typography>
        <Typography variant="body2" fontWeight={500} color="primary">{specialty.doctorsCount} médicos disponibles</Typography>
      </CardContent>
    </Card>
  )
}
