import { Card, CardContent, CardActions, Typography, Box, Chip, IconButton, Button } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import WorkIcon from '@mui/icons-material/Work'
import StarIcon from '@mui/icons-material/Star'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'
import Avatar from '../common/Avatar'

export default function DoctorCard({ doctor }) {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(doctor.id)

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', '&:hover': { boxShadow: 6 } }}>
      <IconButton onClick={() => toggleFavorite(doctor.id)} sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'background.paper' }}>
        {fav ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>
      <CardContent sx={{ flexGrow: 1, pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar name={doctor.name} size={80} />
          <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>{doctor.name}</Typography>
          <Chip label={doctor.specialty} size="small" color="primary" variant="outlined" sx={{ mt: 0.5 }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <StarIcon fontSize="small" color="warning" />
          <Typography variant="body2">{doctor.rating} / 5.0</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <WorkIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">{doctor.experience} años de experiencia</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTimeIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">{doctor.schedule}</Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Chip label={doctor.available ? 'Disponible' : 'No disponible'} size="small" color={doctor.available ? 'success' : 'default'} />
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button fullWidth variant="contained" disabled={!doctor.available} onClick={() => navigate('/appointments', { state: { doctor } })}>
          Solicitar Cita
        </Button>
      </CardActions>
    </Card>
  )
}
