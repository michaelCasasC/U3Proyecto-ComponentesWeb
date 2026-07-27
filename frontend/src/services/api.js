const API_URL = import.meta.env.VITE_API_URL
if (!API_URL) throw new Error('Falta VITE_API_URL en el archivo .env')

function getToken() {
  return localStorage.getItem('token')
}

async function request(path, options = {}) {
  const token = getToken()
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(data.mensaje || 'No se pudo completar la solicitud.')
    error.status = response.status
    throw error
  }
  return data
}

export const api = {
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (name, email, password) => request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  getDoctors: () => request('/doctors'),
  getDoctor: id => request(`/doctors/${id}`),
  getDoctorsBySpecialty: specialtyId => request(`/doctors?specialtyId=${specialtyId}`),
  getSpecialties: () => request('/specialties'),
  getAppointments: () => request('/appointments'),
  createAppointment: data => request('/appointments', { method: 'POST', body: JSON.stringify(data) }),
  updateAppointmentStatus: (id, status) => request(`/appointments/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteAppointment: id => request(`/appointments/${id}`, { method: 'DELETE' }),
  getUsers: () => request('/users'),
  createDoctor: data => request('/doctors', { method: 'POST', body: JSON.stringify(data) }),
  updateDoctor: (id, data) => request(`/doctors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteDoctor: id => request(`/doctors/${id}`, { method: 'DELETE' }),
  createSpecialty: data => request('/specialties', { method: 'POST', body: JSON.stringify(data) }),
  updateSpecialty: (id, data) => request(`/specialties/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteSpecialty: id => request(`/specialties/${id}`, { method: 'DELETE' }),
  deleteUser: id => request(`/users/${id}`, { method: 'DELETE' }),
  subscribePush: subscription => request('/push/subscribe', { method: 'POST', body: JSON.stringify(subscription) }),
  unsubscribePush: endpoint => request('/push/unsubscribe', { method: 'POST', body: JSON.stringify({ endpoint }) }),
  sendPushNotification: (title, body, url, userId) => request('/push/send', { method: 'POST', body: JSON.stringify({ title, body, url, userId }) }),
}
