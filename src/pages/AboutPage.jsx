import { Box, Paper, Typography, Grid, Card, CardContent } from '@mui/material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'
import DevicesIcon from '@mui/icons-material/Devices'
import Breadcrumb from '../components/common/Breadcrumb'
import PageHeader from '../components/common/PageHeader'

const features = [
  { icon: LocalHospitalIcon, title: 'Gestión Médica', desc: 'Administra tus citas médicas de forma sencilla y rápida.' },
  { icon: SecurityIcon, title: 'Seguridad', desc: 'Tus datos médicos están protegidos con los más altos estándares.' },
  { icon: SpeedIcon, title: 'Rápido y Eficiente', desc: 'Encuentra médicos y agendas citas en segundos.' },
  { icon: DevicesIcon, title: 'Multiplataforma', desc: 'Accede desde cualquier dispositivo, en cualquier momento.' },
]

export default function AboutPage() {
  return (
    <Box>
      <Breadcrumb />
      <PageHeader title="Acerca de MediCitas" subtitle="Plataforma moderna para la gestión de citas médicas" />
      <Paper sx={{ p: 4, mb: 4, textAlign: 'center' }}>
        <Box component="img" src="/android-chrome-512x512.png" alt="MediCitas Logo" sx={{ width: 96, height: 96, mb: 2, borderRadius: 3 }} />
        <Typography variant="h4" fontWeight={700} gutterBottom>MediCitas</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          MediCitas es una plataforma digital que conecta pacientes con profesionales de la salud,
          facilitando la gestión de citas médicas de manera eficiente y moderna.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Versión 1.0.0</Typography>
      </Paper>
      <Grid container spacing={3}>
        {features.map((f, i) => (
          <Grid size={{ xs: 12, sm: 6 }} key={i}>
            <Card sx={{ textAlign: 'center', py: 3 }}>
              <CardContent>
                <f.icon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" fontWeight={600}>{f.title}</Typography>
                <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
