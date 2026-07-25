import { doctorsData, specialtiesData, appointmentsData } from '../data/mockData'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const api = {
  async getDoctors() { await delay(300); return doctorsData },
  async getDoctor(id) { await delay(200); return doctorsData.find(d => d.id === id) },
  async getDoctorsBySpecialty(specialtyId) { await delay(300); return doctorsData.filter(d => d.specialtyId === Number(specialtyId)) },
  async getSpecialties() { await delay(300); return specialtiesData },
  async getAppointments() { await delay(300); return appointmentsData },
}

export const doctors = doctorsData
export const specialties = specialtiesData
