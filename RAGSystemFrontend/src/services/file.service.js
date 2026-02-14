import { api } from "../utils/axios"

export const handleFileUpload = async (data) => {
    const response = await api.post('/file/upload', data)
    return response;
}

export const getBackendStatus = async () => {
    const response = await api.get('/ai/status')
    return response
}

export const GetAllFiles = async() => {
    const response = await api.get('/file/getAll')
    return response;
}