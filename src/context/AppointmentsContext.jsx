import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'
import { useAuth } from './AuthContext'

const AppointmentsContext = createContext()

export function AppointmentsProvider({ children }) {
  const { user, loading: authLoading, logout } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (!user) { setAppointments([]); return }
    setLoading(true)
    api.getAppointments()
      .then(setAppointments)
      .catch(error => { if (error.status === 401) logout() })
      .finally(() => setLoading(false))
  }, [user?.id, authLoading])

  const addAppointment = async (appt) => {
    const newAppt = await api.createAppointment(appt)
    setAppointments(prev => [...prev, newAppt])
    return newAppt
  }

  const updateStatus = async (id, status) => {
    const updated = await api.updateAppointmentStatus(id, status)
    setAppointments(prev => prev.map(a => a.id === id ? updated : a))
    return updated
  }

  const cancelAppointment = (id) => updateStatus(id, 'Cancelada')

  return (
    <AppointmentsContext.Provider value={{ appointments, loading, addAppointment, updateStatus, cancelAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  )
}

export const useAppointments = () => useContext(AppointmentsContext)
