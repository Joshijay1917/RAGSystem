import axios from 'axios'

const url = import.meta.VITE_BACKEND_URL || 'http://localhost:3000/api'

export const api = axios.create({
    baseURL: url
})