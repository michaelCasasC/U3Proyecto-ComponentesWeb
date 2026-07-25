import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const MOCK_USERS = [
  { id: 1, name: 'Admin MediCitas', email: 'admin@medicitas.com', password: 'admin123', role: 'admin', avatar: '' },
  { id: 2, name: 'Juan Pérez', email: 'juan@example.com', password: '123456', role: 'patient', avatar: '' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) setUser(JSON.parse(saved))
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, error: 'Credenciales inválidas' }
    const userData = { id: found.id, name: found.name, email: found.email, role: found.role, avatar: found.avatar }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return { success: true }
  }

  const register = (name, email, password) => {
    const exists = MOCK_USERS.find(u => u.email === email)
    if (exists) return { success: false, error: 'El email ya está registrado' }
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
