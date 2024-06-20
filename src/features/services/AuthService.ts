import $api from "../../shared/http";
import { AxiosResponse } from "axios";
import { AuthConfirmResponse, AuthResponse } from "../../app/types/auth/index";

export default class AuthService {
    static async login(phone_number: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login/', {phone_number: phone_number, password: password})
    }

    static async registration(phone_number: string): Promise<AxiosResponse<AuthConfirmResponse>> {
        return $api.post<AuthConfirmResponse>('/auth/register/', {phone_number: phone_number})
    }

    static async registrationConfirm(temp_token: string, code: string, password: string, name: string, birthdate: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`/auth/register/confirm/`, {temp_token: temp_token, code: code, password: password, name: name, birthdate: birthdate})
    }

    static async logout(): Promise<void> {
        return $api.get('/auth/logout/')
    }
}