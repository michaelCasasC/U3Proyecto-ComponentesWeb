import { useState, useMemo, useEffect } from 'react'
import { SimpleGrid, Text, Box, Group } from '@mantine/core'
import { useParams } from 'react-router-dom'
import DoctorCard from '../components/doctors/DoctorCard'
import SearchBar from '../components/common/SearchBar'
import FilterPanel from '../components/common/FilterPanel'
import Breadcrumb from '../components/common/Breadcrumb'
import PageHeader from '../components/common/PageHeader'
import { api } from '../services/api'

export default function DoctorsPage() {
  const { id } = useParams()
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ specialty: '', available: '' })
  const [doctors, setDoctors] = useState([])
  const [specialties, setSpecialties] = useState([])

  useEffect(() => {
    Promise.all([api.getDoctors(), api.getSpecialties()]).then(([doctorRows, specialtyRows]) => {
      setDoctors(doctorRows)
      setSpecialties(specialtyRows)
    })
  }, [])

  const filtered = useMemo(() => {
    let result = doctors
    if (id) result = result.filter(d => d.specialtyId === Number(id))
    if (search) result = result.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
    if (filters.specialty) result = result.filter(d => d.specialty === filters.specialty)
    if (filters.available !== '') result = result.filter(d => d.available === (filters.available === 'true'))
    return result
  }, [id, search, filters, doctors])

  const specialtyName = id ? specialties.find(s => s.id === Number(id))?.name : 'Médicos'

  return (
    <Box>
      <Breadcrumb />
      <PageHeader title={specialtyName} subtitle={filtered.length > 0 ? `${filtered.length} médicos disponibles` : 'No se encontraron médicos'} />
      <Group gap="md" mb="md" wrap="wrap">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar médico..." />
        <FilterPanel filters={filters} onFilterChange={(key, val) => setFilters(prev => ({ ...prev, [key]: val }))} specialties={specialties} />
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {filtered.map(doc => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
        {filtered.length === 0 && (
          <Text c="dimmed" style={{ textAlign: 'center', padding: '64px 0' }}>No se encontraron médicos</Text>
        )}
      </SimpleGrid>
    </Box>
  )
}
