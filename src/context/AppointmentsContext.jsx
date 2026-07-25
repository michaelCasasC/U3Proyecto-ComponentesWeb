import { createContext, useContext, useState } from 'react'
import { appointmentsData } from '../data/mockData'

const AppointmentsContext = createContext()

export function AppointmentsProvider({ children }) {
  const [appointments, setAppointments] = useState(appointmentsData)

  const addAppointment = (appt) => {
    const newAppt = { ...appt, id: appointments.length + 1, status: 'Pendiente', createdAt: new Date().toISOString() }
    setAppointments(prev => [...prev, newAppt])
    return newAppt
  }

  const updateStatus = (id, status) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  const cancelAppointment = (id) => updateStatus(id, 'Cancelada')

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, updateStatus, cancelAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  )
}

export const useAppointments = () => useContext(AppointmentsContext)
