import { makeAutoObservable } from 'mobx'
import AuthService from '../../shared/http/auth';
import axios from 'axios';
import { AuthResponse } from '../types/auth';
import { ITokens, useGetLocalStorage, useRemoveTokenFromLocalStorage, useSetLocalStorage } from '../../features/hooks/storage';

const API_URL = import.meta.env.VITE_APP_PUBLIC_URL

export default class AuthStore {
    isAuth = false;
    isLoading = true;
    isCheck = false;

    isRegistration: boolean = false;
    error: unknown | null = null;

    user: any | null = null;
    temp_token: string = '';
    
    constructor() {
        makeAutoObservable(this)
        this.checkAuth()
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool
    }

    setError(error: unknown){
        this.error = error
    }

    setIsCheck(bool: boolean) {
        this.isCheck = bool
    }

    setUser(data: any) {
        this.user = data
    }

    setTempToken(token: string) {
        this.temp_token = token
    }

    setIsRegistration(bool: boolean) {
        this.isRegistration = bool
    }

    async login(phone_number: string, password: string) {
        try {
            this.setLoading(true)
            const response = await AuthService.login(phone_number, password);
            const tokens: ITokens = {
                accessToken: response.data.access,
                refreshToken: response.data.refresh
            }
            
            if(response.status === 200) {
                useSetLocalStorage('tokens', tokens)
                this.setAuth(true)
                this.setLoading(false)
            }
            this.setLoading(false)
        } catch (err) {
            this.setError(err)
        }
    }

    async registration(phone_number: string) {
        try {
            const response = await AuthService.registration(phone_number);
            
            if(response.status >= 200) {
                this.setTempToken(response.data.temp_token)
            } else {
                this.setError(response.data)
            }
            
        } catch (err) {
            this.setError(err)
        }
    }

    async registrationConfirm(
        temp_token: string,
        code: string,
        password: string,
        name: string,
        birthdate: string,
        phone_number: string
    ) {
        try {
            const response = await AuthService.registrationConfirm(
                temp_token,
                code,
                password,
                name,
                birthdate
            );

            this.login(phone_number, password);
            return response
        } catch (err) {
            this.setError(err)
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            useRemoveTokenFromLocalStorage('tokens')
            this.setAuth(false)
        } catch (err) {
            this.setError(err)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        const refresh = useGetLocalStorage('tokens').refreshToken;
        try {
            const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh/`, {refresh})
            const tokens: ITokens = {
                accessToken: response.data.access,
                refreshToken: response.data.refresh
            }

            if(response.status === 200) {
                useSetLocalStorage('tokens', tokens)
                this.setAuth(true)
                this.setIsCheck(true)
            } else {
                this.setAuth(false)
                this.setIsCheck(false)
            }
        } catch (err) {
            this.setError(err)
        } finally {
            this.setLoading(false)
        }
    }
}