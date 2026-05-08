import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authApi } from '../api/authApi'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const initAuth = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) { setIsLoading(false); return }
    try {
      const { data } = await authApi.getMe()
      setUser(data.user)
      setIsAuthenticated(true)
    } catch { localStorage.removeItem('token'); localStorage.removeItem('user') }
    finally { setIsLoading(false) }
  }, [])

  useEffect(() => { initAuth() }, [initAuth])

  const login = async (credentials) => {
    try {
      const { data } = await authApi.login(credentials)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      setIsAuthenticated(true)
      toast.success('Welcome back!')
      navigate(data.user.role === 'admin' ? '/admin' : '/')
      return { success: true }
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed'
      toast.error(msg)
      return { success: false, error: msg }
    }
  }

  const register = async (data) => {
    try {
      const res = await authApi.register(data)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user)
      setIsAuthenticated(true)
      toast.success('Account created!')
      navigate('/')
      return { success: true }
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed'
      toast.error(msg)
      return { success: false, error: msg }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setIsAuthenticated(false)
    toast.success('Logged out')
    navigate('/')
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be within AuthProvider')
  return ctx
}