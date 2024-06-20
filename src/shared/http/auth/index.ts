import  {  AxiosResponse } from "axios"
import { AuthConfirmResponse, AuthResponse, AuthResponseConfirm } from "../../../app/types/auth"
import $api from "../api"

export default class AuthService {
    static async login(phone_number: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login/', {phone_number, password})
    }

    static async registration(phone_number: string): Promise<AxiosResponse<AuthConfirmResponse>> {
        return $api.post<AuthConfirmResponse>('/auth/register/', { phone_number })
    }

    static async registrationConfirm(
        temp_token: string,
        code: string,
        password: string,
        name: string,
        birthdate: string
    ): Promise<AxiosResponse<AuthResponseConfirm>> {
        return $api.post<AuthResponseConfirm>('/auth/register/confirm/', {
            temp_token,
            code,
            password,
            name,
            birthdate
        })
    }

    static async logout() {
        return $api.post('/logout')
    }
}




