import axios from 'axios'
import { AuthResponse } from '../../../app/types/auth'
import { ITokens, useGetLocalStorage, useSetLocalStorage } from '../../../features/hooks/storage'

const API_URL = import.meta.env.VITE_APP_PUBLIC_URL // подтягиваем УРЛ из .env

// Далее дефолтный вызов аксиоса и прописью параметров
const $api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type":"application/json"
    }
}) 

// Отрабатываем интерцепторы на запросы (Инфа UlbiTV)
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${useGetLocalStorage('tokens').accessToken || ''}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if(error.response?.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            // const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh/`, {refresh: localStorage.getItem("refreshToken")})
            // localStorage.setItem('token', response.data.access)
            const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh/`, {refresh: useGetLocalStorage('tokens').refreshToken})
            const tokens: ITokens = {
                accessToken: response.data.access,
                refreshToken: response.data.refresh
            }
            useSetLocalStorage('tokens', tokens)
            return $api.request(originalRequest)
        } catch (e) {
            console.log(e)
        }
    } 
    throw error
})

export default $api

