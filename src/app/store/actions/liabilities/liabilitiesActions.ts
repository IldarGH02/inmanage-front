import { ILiabilities, ILiabilitiesProperty, ILiabilitiesTransport } from "../../../types/liabilities/ILiabilities"
import { ILoansDTO } from "../../../types/dto/assets/IAssetsLiabilitiesDTO"
import $api from "../../../../shared/http/api"
import { IExpenseBalance } from "../../../types/balance/IBalance"
import { ILiabilitiesBorrows } from "../../../types/liabilities/borrows/IBorrows"
import { ILiabilitiesLoans } from "../../../types/liabilities/loans/ILoans"

const API_URL = import.meta.env.VITE_APP_PUBLIC_URL

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

export const getLiabilities = async (type: string) => {
    try {
        const response = await $api.get<ILiabilities>(`/passives/`)
        console.log(response.data)
        return {
            type,
            payload: response.data
        } 
    } catch (error) {
        throw error
    } 
}

type typeLiabilities = 'properties' | 'transport'
export const updateLiabilitiesExpense = async (type: string, typeLiabilities: typeLiabilities, id: number, objExpense: IExpenseBalance[]) => {
    try {
        const response = await $api.patch(`/passives/${typeLiabilities}/up/${id}`, {expenses: objExpense})
        console.log('res', response.data)
        return {
            type,
            payload: {
                id: id,
                typeAssets: typeLiabilities,
                asset: response.data,
                objExpense: objExpense[0]
            }
        } 
    } catch (error) {
        throw error
    } 
}

export const editProperty = async (type: string, property: ILiabilitiesProperty) => {
    try {
        const res = await $api.patch(`${API_URL}/passives/properties/up/${property.id}`, property)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        throw error
    }   
}

export const removeProperty = async (type: string, id: number) => {
    try {
        await $api.delete(`${API_URL}/passives/properties/del/${id}`)
        return {
            type,
            payload: id
        } 
    } catch (error) {
        throw error
    }   
}

export const addProperty = async (type: string, property: ILiabilitiesProperty) => {
    try {
        const res = await $api.post(`${API_URL}/passives/properties/`, property)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        throw error
    }   
}

//////////////////Transport//////////////////////////

export const editTransport = async (type: string, transport: ILiabilitiesTransport) => {
    try {
        const res = await $api.patch(`${API_URL}/passives/transport/up/${transport.id}`, transport)
        console.log(res.data)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        throw error
    }   
}

export const removeTransport = async (type: string, id: number) => {
    try {
        await $api.delete(`${API_URL}/passives/transport/del/${id}`)
        return {
            type,
            payload: id
        } 
    } catch (error) {
        throw error
    }   
}

export const addTransport = async (type: string, transport: ILiabilitiesTransport) => {
    try {
        const res = await $api.post(`/passives/transport/`, transport)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        throw error
    }   
}

//////////////////Loan//////////////////////////

export const editLoan = async (type: string, loan: ILoansDTO) => {
    try {
        const res = await $api.patch(`${API_URL}/passives/loans/up/${loan.id}`, loan)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        throw error
    }   
}

export const removeLoan = async (type: string, id: number) => {
    try {
        await $api.delete(`${API_URL}/passives/loans/del/${id}`)
        return {
            type,
            payload: id
        } 
    } catch (error) {
        throw error
    }   
}

export const addLoan = async (type: string, loan: ILiabilitiesLoans) => {
    try {
        const res = await $api.post(`${API_URL}/passives/loans/`, loan)
        console.log(res.data)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        throw error
    }   
}

//////////////////Borrow//////////////////////////

export const addBorrow = async (type: string, borrows: ILiabilitiesBorrows) => {
    try {
        const res = await $api.post(`${API_URL}/passives/borrows/`, borrows)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        throw error
    }   
}

export const removeBorrow = async (type: string, id: number) => {
    try {
        await $api.delete(`${API_URL}/passives/borrow/del/${id}`)
        return {
            type,
            payload: id
        } 
    } catch (error) {
        throw error
    }   
}
