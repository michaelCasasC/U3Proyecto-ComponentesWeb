import { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import SpecialtyCard from '../components/doctors/SpecialtyCard'
import SearchBar from '../components/common/SearchBar'
import Breadcrumb from '../components/common/Breadcrumb'
import PageHeader from '../components/common/PageHeader'
import { api } from '../services/api'

export default function SpecialtiesPage() {
  const [search, setSearch] = useState('')
  const [specialties, setSpecialties] = useState([])
  useEffect(() => { api.getSpecialties().then(setSpecialties) }, [])
  const filtered = specialties.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <Box>
      <Breadcrumb />
      <PageHeader title="Especialidades Médicas" subtitle="Selecciona una especialidad para ver los médicos disponibles" />
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar especialidad..." />
      <Grid container spacing={3}>
        {filtered.map(s => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={s.id}>
            <SpecialtyCard specialty={s} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
