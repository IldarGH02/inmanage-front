import { IAssets, IAssetsBusiness, IAssetsProperty, IAssetsTransport, IInventory } from "../../../types/assets/IAssets"
import { IBusinessDTO } from "../../../types/dto/assets/IAssetsLiabilitiesDTO"
import $api from "../../../../shared/http/api"
import { IAssetsSecurities } from "../../../types/assets/securities/ISecurities"
import { IExpenseBalance, IIncomeBalance } from "../../../types/balance/IBalance"
import { IAssetsJewelries } from "../../../types/assets/valuable/IValuable"
import { IAssetsDeposit } from "../../../types/assets/deposit/IDeposit"

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

export const getAssets = async (type: string) => {
    try {
        const response = await $api.get<IAssets>(`/actives/`)
        console.log(response.data)
        return {
            type,
            payload: response.data
        } 
    } catch (error) {
        console.log(error)
    } 
}

type typeAssets = 'properties' | 'transport' | 'business'

export const updateAssetsIncome = async (type: string, typeAssets: typeAssets, id: number, objIncome: IIncomeBalance[]) => {
    try {
        const response = await $api.patch(`/actives/${typeAssets}/up/${id}`, {incomes: objIncome})
        return {
            type,
            payload: {
                id: id,
                typeAssets: typeAssets,
                asset: response.data,
                objIncome: objIncome[0]
            }
        } 
    } catch (error) {
        console.log(error)
    } 
}

export const updateAssetsExpense = async (type: string, typeAssets: typeAssets, id: number, objExpense: IExpenseBalance[]) => {
    try {
        const response = await $api.patch(`/actives/${typeAssets}/up/${id}`, {expenses: objExpense})
        return {
            type,
            payload: {
                id: id,
                typeAssets: typeAssets,
                asset: response.data,
                objExpense: objExpense[0]
            }
        } 
    } catch (error) {
        console.log(error)
    } 
}

//////////////////Property//////////////////////////

export const editProperty = async (type: string, property: IAssetsProperty) => {
    try {
        const res = await $api.patch(`/actives/properties/up/${property.id}`, property)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        console.log(error)
    }   
}

export const removeProperty = async (type: string, id: number) => {
    try {
        await $api.delete(`/actives/properties/del/${id}/`)
        return {
            type,
            payload: id
        } 
    } catch (error) {
        console.log(error)
    }   
}

export const addProperty = async (type: string, property: IAssetsProperty) => {
    try {
        const res = await $api.post(`/actives/properties/`, property)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        console.log(error)
    }   
}

//////////////////Inventory//////////////////////////

export const addPropertyInventory = async (type: string, inventory: IInventory[], idInventory: number, idProperty: number) => {
    try {
        const res = await $api.patch(`/inventory/up/${idInventory}`, {assets: inventory})
        console.log('asdsa', inventory)
        return {
            type,
            payload: {
                id: idProperty,
                inventory: res.data.inventory
            }
        } 
    } catch (error) {
        console.log(error)
    }   
}

export const removePropertyInventory = async (type: string, inventory: IInventory[], idInventory: number, idProperty: number) => {
    try {
        const res = await $api.patch(`/inventory/up/${idInventory}`, {assets: inventory})
        console.log('asdsa', res.data)
        return {
            type,
            payload: {
                id: idProperty,
                inventory: res.data
            }
        } 
    } catch (error) {
        console.log(error)
    }   
}

//////////////////Transport//////////////////////////

export const editTransport = async (type: string, transport: IAssetsTransport) => {
    try {
        const res = await $api.patch(`/actives/transport/up/${transport.id}`, transport)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        console.log(error)
    }   
}

export const removeTransport = async (type: string, id: number) => {
    try {
        await $api.delete(`/actives/transport/del/${id}/`)
        return {
            type,
            payload: id
        } 
    } catch (error) {
        console.log(error)
    }   
}

export const addTransport = async (type: string, transport: IAssetsTransport) => {
    try {
        console.log(transport)
        const res = await $api.post(`/actives/transport/`, transport)
        console.log(res.data)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        console.log(error)
    }   
}

//////////////////Business//////////////////////////

export const editBusiness = async (type: string, business: IBusinessDTO) => {
    try {
        const res = await $api.patch(`/actives/business/up/${business.id}`, business)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        console.log(error)
    }   
}

export const removeBusiness = async (type: string, id: number) => {
    try {
        await $api.delete(`/actives/business/del/${id}`)
        return {
            type,
            payload: id
        } 
    } catch (error) {
        console.log(error)
    }   
}

export const addBusiness = async (type: string, business: IAssetsBusiness) => {
    try {
        const res = await $api.post(`/actives/business/`, business)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        console.log(error)
    }   
}

//////////////////Valuable//////////////////////////

export const addValuable = async (type: string, data: IAssetsJewelries) => {
    try {
        const res = await $api.post(`/actives/jewelry/`, data)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        console.log(error)
    }   
}

////////////////Securities//////////////////////////

export const addSecurities = async (type: string, data: IAssetsSecurities) => {
    try {
        const res = await $api.post(`/actives/securities/`, data)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        console.log(error)
    }   
}

////////////////Deposits//////////////////////////

export const addDeposit = async (type: string, data: IAssetsDeposit) => {
    try {
        const res = await $api.post(`/actives/deposits/`, data)
        return {
            type,
            payload: res.data
        } 
    } catch (error) {
        console.log(error)
    }   
}
