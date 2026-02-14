import axios from 'axios'

const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api'
console.log('URL:', url)
export const api = axios.create({
    baseURL: url
})