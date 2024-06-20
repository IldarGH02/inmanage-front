// import axios from "axios"
import AuthService from "../../../../features/services/AuthService"
// import { API_URL } from "../../../../shared/http"

export const showLoader = (type: string) => {
    return {
        type
    }
}

export const hideLoader = (type: string) => {
    return {
        type
    }
}

export const isCheck = (type: string) => {
    return {
        type
    }
};

export function changeIsAuthOnFalse(type: string) {
    return {
        type
    };
};


export async function registration(type: string, phoneNumber: string) {
    try {
        const response = await AuthService.registration('+'+phoneNumber)
        console.log(response)
        return({
            type,
            payload: {
                tempToken: response.data.temp_token
            }
        })
    } catch (error) {
        throw error
    }
}

export async function registrationConfirm(type: string, temp_token: string, password: string, name: string, birthdate: string) {
    try {
        const response = await AuthService.registrationConfirm(temp_token, '1111', password, name, birthdate)
        console.log(response)
        // localStorage.setItem('accessToken', response.data.access)
        // localStorage.setItem('refreshToken', response.data.refresh)
        return({
            type,
        })
    } catch (error) {
        console.log(error)
    }
}

export async function logout(type: string) {
    try {
        const response = await AuthService.logout()
        console.log(response)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        return ({
            type
        })
    } catch (error) {
        console.log(error)
    }
}

// export async function checkAuth(type: string) {
//     try {
//         const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh/`, {refresh: localStorage.getItem("refreshToken")})
//         console.log("res", response)
//         // console.log(document.cookie)
//         localStorage.setItem('refreshToken', response.data.refresh)
//         localStorage.setItem('accessToken', response.data.access)
//         return ({
//             type
//         })
//     } catch (error) {
        
//     }
// }

export async function notAuth(type: string) {
    try {
        return ({
            type
        })
    } catch (error) {
        
    }
}

