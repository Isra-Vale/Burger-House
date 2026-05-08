import api from './axios'

//use just real API no mockdata

// export const burgerApi = {
//   getAll: (p) => api.get('/burgers', { params: p }),
//   getById: (id) => api.get(`/burgers/${id}`),
//   create: (d) => api.post('/burgers', d),
//   update: (id, d) => api.patch(`/burgers/${id}`, d),
//   delete: (id) => api.delete(`/burgers/${id}`),
// }

// use real API or mockdata dependes on USE_MOCK_DATA flag

// src/api/burgerApi.js

import { USE_MOCK_DATA } from '../config'
import { mockburgers as mockBurgers } from '../data/burgers'

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Create a reactive burgers array that components can import directly
export let burgers = USE_MOCK_DATA ? [...mockBurgers] : []

// Function to refresh burgers from API
export const refreshBurgers = async () => {
  if (!USE_MOCK_DATA) {
    try {
      const response = await api.get('/burgers')
      // Update the array in place
      burgers.length = 0
      burgers.push(...response.data)
      return burgers
    } catch (error) {
      console.error('Failed to fetch burgers:', error)
      return burgers
    }
  }
  return burgers
}

// API methods (keep your existing ones)
export const burgerApi = {
  getAll: async (params) => {
    if (USE_MOCK_DATA) {
      await delay()
      let filtered = [...mockBurgers]
      if (params?.search) {
        const searchLower = params.search.toLowerCase()
        filtered = filtered.filter(b => 
          b.name.toLowerCase().includes(searchLower) || 
          b.category.toLowerCase().includes(searchLower)
        )
      }
      return { data: filtered }
    }
    return api.get('/burgers', { params })
  },

  getById: async (id) => {
    if (USE_MOCK_DATA) {
      await delay()
      const burger = mockBurgers.find(b => b.id === Number(id))
      if (!burger) throw new Error('Burger not found')
      return { data: burger }
    }
    return api.get(`/burgers/${id}`)
  },

  create: async (data) => {
    if (USE_MOCK_DATA) {
      await delay()
      const newBurger = {
        id: Math.max(...mockBurgers.map(b => b.id), 0) + 1,
        ...data,
        rating: Number(data.rating),
        price: Number(data.price),
        ingredients: Array.isArray(data.ingredients) ? data.ingredients : data.ingredients.split(',')
      }
      mockBurgers.push(newBurger)
      // Also update the exported array
      if (USE_MOCK_DATA) burgers.push(newBurger)
      console.log('📝 Mock: Created burger', newBurger)
      return { data: newBurger }
    }
    return api.post('/burgers', data)
  },

  update: async (id, data) => {
    if (USE_MOCK_DATA) {
      await delay()
      const index = mockBurgers.findIndex(b => b.id === Number(id))
      if (index === -1) throw new Error('Burger not found')
      mockBurgers[index] = { 
        ...mockBurgers[index], 
        ...data,
        rating: Number(data.rating),
        price: Number(data.price)
      }
      // Also update the exported array
      if (USE_MOCK_DATA) burgers[index] = mockBurgers[index]
      console.log('✏️ Mock: Updated burger', mockBurgers[index])
      return { data: mockBurgers[index] }
    }
    return api.patch(`/burgers/${id}`, data)
  },

  delete: async (id) => {
    if (USE_MOCK_DATA) {
      await delay()
      const index = mockBurgers.findIndex(b => b.id === Number(id))
      if (index === -1) throw new Error('Burger not found')
      const deleted = mockBurgers.splice(index, 1)
      // Also update the exported array
      if (USE_MOCK_DATA) burgers.splice(index, 1)
      console.log('🗑️ Mock: Deleted burger', deleted[0])
      return { data: { message: 'Burger deleted successfully' } }
    }
    return api.delete(`/burgers/${id}`)
  },
}

// Auto-refresh when in API mode
if (!USE_MOCK_DATA) {
  refreshBurgers()
}