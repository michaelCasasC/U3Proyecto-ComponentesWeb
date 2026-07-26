import { Card, CardContent, CardActions, Typography, Box, Chip, IconButton, Button, useTheme } from '@mui/material'
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
  const theme = useTheme()

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid',
      borderColor: 'divider',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.palette.mode === 'dark' ? '0 12px 28px rgba(0, 0, 0, 0.6)' : '0 12px 28px rgba(37, 99, 235, 0.12)',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(37, 99, 235, 0.3)',
      },
    }}>
      <IconButton
        onClick={() => toggleFavorite(doctor.id)}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
          '&:hover': { transform: 'scale(1.1)', bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 1)' : '#ffffff' },
        }}
      >
        {fav ? <FavoriteIcon color="error" fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
      </IconButton>

      <CardContent sx={{ flexGrow: 1, pt: 3, px: 2.5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Box sx={{ p: 0.5, borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)', mb: 1 }}>
            <Avatar name={doctor.name} size={76} />
          </Box>
          <Typography variant="h6" fontWeight={700} textAlign="center" sx={{ letterSpacing: '-0.01em', color: 'text.primary' }}>
            {doctor.name}
          </Typography>
          <Chip
            label={doctor.specialty}
            size="small"
            color="primary"
            variant="soft"
            sx={{
              mt: 1,
              fontWeight: 600,
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(37, 99, 235, 0.2)' : 'rgba(37, 99, 235, 0.08)',
              color: 'primary.main',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75, mb: 1.5, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', py: 0.75, px: 1.5, borderRadius: 2 }}>
          <StarIcon fontSize="small" sx={{ color: '#f59e0b' }} />
          <Typography variant="body2" fontWeight={700}>{doctor.rating}</Typography>
          <Typography variant="caption" color="text.secondary">(Reseñas)</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <WorkIcon fontSize="small" sx={{ color: 'text.secondary', opacity: 0.8 }} />
            <Typography variant="body2" color="text.secondary" fontWeight={500}>{doctor.experience} años de exp.</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <AccessTimeIcon fontSize="small" sx={{ color: 'text.secondary', opacity: 0.8 }} />
            <Typography variant="body2" color="text.secondary" fontWeight={500}>{doctor.schedule}</Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Chip
            label={doctor.available ? '● Disponible' : '○ No disponible'}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: '0.75rem',
              bgcolor: doctor.available
                ? (theme.palette.mode === 'dark' ? 'rgba(16, 185, 129, 0.18)' : 'rgba(16, 185, 129, 0.1)')
                : (theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.18)' : 'rgba(148, 163, 184, 0.1)'),
              color: doctor.available ? 'success.main' : 'text.secondary',
            }}
          />
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          disabled={!doctor.available}
          onClick={() => navigate('/appointments', { state: { doctor } })}
          sx={{ py: 1, borderRadius: 2.5 }}
        >
          Solicitar Cita
        </Button>
      </CardActions>
    </Card>
  )
}
