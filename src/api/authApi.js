import api from './axios'

// use just realAPI no mockdata
// export const authApi = {
//   login: (c) => api.post('/auth/login', c),
//   register: (d) => api.post('/auth/register', d),
//   getMe: () => api.get('/auth/me'),
// }


//use real API or mockdata dependes on USE_MOCK_DATA flag

import { USE_MOCK_DATA } from '../config'

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Mock user storage (only used in mock mode)
let mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@burgerhouse.com', password: 'admin123', role: 'admin' },
  { id: 1, name: 'test User', email: 'user@test.com', password: 'user123', role: 'user' }

]

export const authApi = {
  login: async (credentials) => {
    if (USE_MOCK_DATA) {
      await delay()
      const user = mockUsers.find(u => u.email === credentials.email && u.password === credentials.password)
      if (!user) {
        throw { response: { data: { message: 'Invalid email or password' } } }
      }
      const token = `mock-token-${user.id}-${Date.now()}`
      const { password, ...userWithoutPassword } = user
      return { data: { token, user: userWithoutPassword } }
    }
    return api.post('/auth/login', credentials)
  },

  register: async (data) => {
    if (USE_MOCK_DATA) {
      await delay()
      const existing = mockUsers.find(u => u.email === data.email)
      if (existing) {
        throw { response: { data: { message: 'Email already exists' } } }
      }
      const newUser = {
        id: mockUsers.length + 1,
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.email.includes('admin') ? 'admin' : 'user'
      }
      mockUsers.push(newUser)
      const token = `mock-token-${newUser.id}-${Date.now()}`
      const { password, ...userWithoutPassword } = newUser
      console.log('👤 Mock: User registered', userWithoutPassword)
      return { data: { token, user: userWithoutPassword } }
    }
    return api.post('/auth/register', data)
  },

  getMe: async () => {
    if (USE_MOCK_DATA) {
      await delay()
      const token = localStorage.getItem('token')
      if (!token) throw { response: { status: 401 } }
      const match = token.match(/mock-token-(\d+)-/)
      if (!match) throw { response: { status: 401 } }
      const userId = parseInt(match[1])
      const user = mockUsers.find(u => u.id === userId)
      if (!user) throw { response: { status: 401 } }
      const { password, ...userWithoutPassword } = user
      return { data: { user: userWithoutPassword } }
    }
    return api.get('/auth/me')
  },
}