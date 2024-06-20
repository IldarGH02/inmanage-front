export interface AuthResponse { // возврат токенов с бека на входе и регистрации
    access: string
    refresh: string
}

export interface AuthConfirmResponse {  //
    temp_token: string
}

export interface AuthResponseRegister {
    temp_token: string
    message: string
}

export interface AuthResponseConfirm {
    success: string
}