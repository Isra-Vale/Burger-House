import api from './axios'

//use just realAPI no mock data
//export const contactApi = { send: (d) => api.post('/contact', d) }


// use real ApI or mockdata dependes on USE_MOCK_DATA

import { USE_MOCK_DATA } from '../config'

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const contactApi = { 
  send: async (data) => {
    if (USE_MOCK_DATA) {
      await delay()
      console.log('📧 Mock: Contact message sent', data)
      return { data: { message: 'Message sent successfully (Mock)' } }
    }
    return api.post('/contact', data)
  } 
}