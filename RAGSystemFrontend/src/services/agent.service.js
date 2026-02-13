import { api } from "../utils/axios"

export const askAI = async(query, socketId) => {
    console.log({ query })
    const res = await api.post('/ai/query', { query, socketId })
    return res
}