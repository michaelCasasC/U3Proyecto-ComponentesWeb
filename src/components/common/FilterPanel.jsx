import { Box, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput } from '@mui/material'

export default function FilterPanel({ filters, onFilterChange, specialties }) {
  return (
    <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Especialidad</InputLabel>
        <Select value={filters.specialty || ''} onChange={(e) => onFilterChange('specialty', e.target.value)} label="Especialidad">
          <MenuItem value="">Todas</MenuItem>
          {specialties?.map(s => <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Disponibilidad</InputLabel>
        <Select value={filters.available ?? ''} onChange={(e) => onFilterChange('available', e.target.value)} label="Disponibilidad">
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="true">Disponible</MenuItem>
          <MenuItem value="false">No disponible</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
