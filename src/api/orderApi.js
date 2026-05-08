import api from './axios'

//use just realApi no Mockdata
// export const orderApi = {
//   getAll: () => api.get('/orders'),
//   create: (d) => api.post('/orders', d),
//   updateStatus: (id, s) => api.patch(`/orders/${id}/status`, { status: s }),
//   delete: (id) => api.delete(`/orders/${id}`),
// }

// use RealApi or mockdata dependes on USE_MOCK_DATA flag

import { USE_MOCK_DATA } from '../config'

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Mock orders storage (only used in mock mode)
let mockOrders = [
  { id: '#1234', customer: 'John Doe', total: 45.98, status: 'Delivered', items: [] },
  { id: '#1235', customer: 'Jane Smith', total: 32.50, status: 'Preparing', items: [] },
  { id: '#1236', customer: 'Mike Johnson', total: 67.20, status: 'On the way', items: [] },
]

export const orderApi = {
  getAll: async () => {
    if (USE_MOCK_DATA) {
      await delay()
      return { data: mockOrders }
    }
    return api.get('/orders')
  },

  create: async (data) => {
    if (USE_MOCK_DATA) {
      await delay()
      const newOrder = {
        id: `#${Math.floor(Math.random() * 10000)}`,
        ...data,
        status: 'Pending',
        createdAt: new Date().toISOString()
      }
      mockOrders.unshift(newOrder)
      console.log('🛒 Mock: Order created', newOrder)
      return { data: newOrder }
    }
    return api.post('/orders', data)
  },

  updateStatus: async (id, status) => {
    if (USE_MOCK_DATA) {
      await delay()
      const order = mockOrders.find(o => o.id === id)
      if (order) {
        order.status = status
        console.log('📦 Mock: Order status updated', { id, status })
      }
      return { data: { message: 'Status updated' } }
    }
    return api.patch(`/orders/${id}/status`, { status })
  },

  delete: async (id) => {
    if (USE_MOCK_DATA) {
      await delay()
      mockOrders = mockOrders.filter(o => o.id !== id)
      console.log('🗑️ Mock: Order deleted', id)
      return { data: { message: 'Order deleted' } }
    }
    return api.delete(`/orders/${id}`)
  },
}