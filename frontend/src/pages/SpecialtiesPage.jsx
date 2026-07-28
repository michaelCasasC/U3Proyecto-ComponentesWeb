import { useEffect, useState } from 'react'
import { SimpleGrid, Box } from '@mantine/core'
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
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {filtered.map(s => (
          <SpecialtyCard key={s.id} specialty={s} />
        ))}
      </SimpleGrid>
    </Box>
  )
}
