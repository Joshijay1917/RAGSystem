import { io } from 'socket.io-client'

const url = import.meta.env.VITE_BACKEND_SOCKET_URL || 'http://localhost:3000/api'

export const socket = io(url)