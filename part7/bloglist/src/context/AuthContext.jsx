import { createContext, useContext, useEffect, useState } from 'react'
import { setToken } from '../services/blogs.js'

const AuthContext = createContext(null)
const STORAGE_KEY = 'bloglistUser'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const stored = JSON.parse(raw)
      setUser(stored)
      setToken(stored.token)
    }
  }, [])

  const login = (data) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setToken(data.token)
    setUser(data)
  }

  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
