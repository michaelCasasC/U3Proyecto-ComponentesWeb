import { useState } from 'react'
import { Box, Typography, Grid, IconButton, Paper } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns'
import { es } from 'date-fns/locale'

export default function Calendar({ selectedDate, onDateSelect, appointments = [] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  })

  const getAppointmentsCount = (day) => appointments.filter(a => a.date === format(day, 'yyyy-MM-dd')).length

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <IconButton onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}><ChevronLeftIcon /></IconButton>
        <Typography variant="h6" fontWeight={600}>{format(currentMonth, 'MMMM yyyy', { locale: es })}</Typography>
        <IconButton onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}><ChevronRightIcon /></IconButton>
      </Box>
      <Grid container spacing={0.5}>
        {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(d => (
          <Grid item xs={12/7} key={d}>
            <Typography variant="caption" align="center" display="block" color="text.secondary" fontWeight={600}>{d}</Typography>
          </Grid>
        ))}
        {days.map(day => {
          const count = getAppointmentsCount(day)
          const isSelected = selectedDate && isSameDay(day, new Date(selectedDate))
          return (
            <Grid item xs={12/7} key={day.toISOString()}>
              <Box
                onClick={() => isSameMonth(day, currentMonth) && onDateSelect(format(day, 'yyyy-MM-dd'))}
                sx={{
                  p: 0.5,
                  textAlign: 'center',
                  cursor: isSameMonth(day, currentMonth) ? 'pointer' : 'default',
                  bgcolor: isSelected ? 'primary.main' : 'transparent',
                  color: isSelected ? 'white' : isToday(day) ? 'primary.main' : isSameMonth(day, currentMonth) ? 'text.primary' : 'text.disabled',
                  borderRadius: 1,
                  fontWeight: isToday(day) ? 700 : 400,
                  '&:hover': isSameMonth(day, currentMonth) ? { bgcolor: isSelected ? 'primary.dark' : 'action.hover' } : {},
                  position: 'relative',
                }}
              >
                <Typography variant="body2">{format(day, 'd')}</Typography>
                {count > 0 && (
                  <Typography variant="caption" sx={{ position: 'absolute', top: 0, right: 2, color: 'error.main', fontWeight: 700 }}>{count}</Typography>
                )}
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Paper>
  )
}
