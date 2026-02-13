import { api } from "../utils/axios"

export const handleFileUpload = async (data) => {
    const response = await api.post('/file/upload', data)
    return response;
}