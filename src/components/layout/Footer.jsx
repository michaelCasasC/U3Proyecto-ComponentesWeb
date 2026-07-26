import { Box, Typography, Link, Container } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} MediCitas. Todos los derechos reservados.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link component={RouterLink} to="/about" variant="body2" color="text.secondary" underline="hover">Acerca de</Link>
            <Link component={RouterLink} to="/settings" variant="body2" color="text.secondary" underline="hover">Configuración</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
