import { Box, Typography, Link, Container } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box component="img" src="/favicon-32x32.png" alt="MediCitas Logo" sx={{ width: 22, height: 22, borderRadius: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} MediCitas. Todos los derechos reservados.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link component={RouterLink} to="/about" variant="body2" color="text.secondary" underline="hover">Acerca de</Link>
            <Link component={RouterLink} to="/settings" variant="body2" color="text.secondary" underline="hover">Configuración</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
