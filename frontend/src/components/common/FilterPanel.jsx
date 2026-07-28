import { Group, Select } from '@mantine/core'

export default function FilterPanel({ filters, onFilterChange, specialties }) {
  return (
    <Group gap="md" mb="md">
      <Select
        size="sm"
        placeholder="Especialidad"
        value={filters.specialty || ''}
        onChange={(value) => onFilterChange('specialty', value)}
        data={[
          { value: '', label: 'Todas' },
          ...(specialties?.map(s => ({ value: s.name, label: s.name })) || []),
        ]}
        clearable
        style={{ minWidth: 200 }}
      />
      <Select
        size="sm"
        placeholder="Disponibilidad"
        value={filters.available ?? ''}
        onChange={(value) => onFilterChange('available', value)}
        data={[
          { value: '', label: 'Todos' },
          { value: 'true', label: 'Disponible' },
          { value: 'false', label: 'No disponible' },
        ]}
        clearable
        style={{ minWidth: 150 }}
      />
    </Group>
  )
}
