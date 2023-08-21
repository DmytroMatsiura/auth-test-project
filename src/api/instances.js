import { ofetch } from 'ofetch'
import { lsGet } from '../utils/local-storage.js'

const apiUat = ofetch.create({
  baseURL: `${import.meta.env.VITE_API_UAT_ROOT}/api`,
  headers: {
    accept: 'application/ld+json',
    'Content-Type': 'application/ld+json'
  },
  onRequest({ options }) {
    const token = lsGet('access_token')

    if (token) {
      options.headers.Authorization = `Bearer ${token}`
    }
  }
})

export { apiUat }
