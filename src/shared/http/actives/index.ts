import {Actives, typeAssets, typeLiabilities} from "../../../app/types/actives/ActivesTypes.ts"
// import { IBusinessDTO } from "../../../app/types/dto/actives/IAssetsLiabilitiesDTO.ts";
// import { IAssetsSecurities } from "../../../app/types/actives/securities/ISecurities.ts";
import { IExpenseBalance, IIncomeBalance } from "../../../app/types/balance/IBalance.ts";
// import { IAssetsJewelries } from "../../../app/types/actives/jewelries/JewelriesTypes.ts";
// import { IAssetsDeposit } from "../../../app/types/actives/deposit/IDeposit.ts";

import $api from "../api";
import { AxiosResponse } from "axios";

export class AssetsService {
    static async fetchActives():Promise<AxiosResponse<Actives>> {
        return await $api.get<Actives>(`/actives/`)
    }

    static async updateActivesIncome(typeAssets: typeAssets, id: number, objIncome: IIncomeBalance[]) {
        const response = await $api.patch<Actives>(`/actives/${typeAssets}/up/${id}`, {incomes: objIncome})
        return response.data
    }

    static async updateActivesExpense(typeAssets: typeAssets, id: number, objExpense: IExpenseBalance[]) {
        return await $api.patch<Actives>(`/actives/${typeAssets}/up/${id}`, {incomes: objExpense})
    }

    // static async editProperty(property: ) {
    //     const response = await $api.patch(`/actives/properties/up/${property.id}`, property)
    //     return response.data
    // }

    static async removeProperty(id: number) {
        await $api.delete(`/actives/properties/del/${id}/`)
    }

    static async updateLiabilitiesExpense(typeLiabilities: typeLiabilities, id: number, objExpense: IExpenseBalance[]) {
        return await $api.patch(`/passives/${typeLiabilities}/up/${id}`, {expenses: objExpense})
    }
}


// export const addProperty = async (type: string, realty: IAssetsProperty) => {
//     try {
//         const res = await $api.post(`/actives/properties/`, realty)
//         return {
//             type,
//             payload: res.data
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// //////////////////Inventory//////////////////////////
//
// export const addPropertyInventory = async (type: string, inventory: IInventory[], idInventory: number, idProperty: number) => {
//     try {
//         const res = await $api.patch(`/inventory/up/${idInventory}`, {actives: inventory})
//         console.log('asdsa', inventory)
//         return {
//             type,
//             payload: {
//                 id: idProperty,
//                 inventory: res.data.inventory
//             }
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// export const removePropertyInventory = async (type: string, inventory: IInventory[], idInventory: number, idProperty: number) => {
//     try {
//         const res = await $api.patch(`/inventory/up/${idInventory}`, {actives: inventory})
//         console.log('asdsa', res.data)
//         return {
//             type,
//             payload: {
//                 id: idProperty,
//                 inventory: res.data
//             }
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// //////////////////TransportInfo//////////////////////////
//
// export const editTransport = async (type: string, transport: IAssetsTransport) => {
//     try {
//         const res = await $api.patch(`/actives/transport/up/${transport.id}`, transport)
//         return {
//             type,
//             payload: res.data
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// export const removeTransport = async (type: string, id: number) => {
//     try {
//         await $api.delete(`/actives/transport/del/${id}/`)
//         return {
//             type,
//             payload: id
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// export const addTransport = async (type: string, transport: IAssetsTransport) => {
//     try {
//         console.log(transport)
//         const res = await $api.post(`/actives/transport/`, transport)
//         console.log(res.data)
//         return {
//             type,
//             payload: res.data
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// //////////////////Business//////////////////////////
//
// export const editBusiness = async (type: string, business: IBusinessDTO) => {
//     try {
//         const res = await $api.patch(`/actives/business/up/${business.id}`, business)
//         return {
//             type,
//             payload: res.data
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// export const removeBusiness = async (type: string, id: number) => {
//     try {
//         await $api.delete(`/actives/business/del/${id}`)
//         return {
//             type,
//             payload: id
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// export const addBusiness = async (type: string, business: IAssetsBusiness) => {
//     try {
//         const res = await $api.post(`/actives/business/`, business)
//         return {
//             type,
//             payload: res.data
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// //////////////////Valuable//////////////////////////
//
// export const addValuable = async (type: string, data: IAssetsJewelries) => {
//     try {
//         const res = await $api.post(`/actives/jewelry/`, data)
//         return {
//             type,
//             payload: res.data
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// ////////////////Securities//////////////////////////
//
// export const addSecurities = async (type: string, data: IAssetsSecurities) => {
//     try {
//         const res = await $api.post(`/actives/securities/`, data)
//         return {
//             type,
//             payload: res.data
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// ////////////////Deposits//////////////////////////
//
// export const addDeposit = async (type: string, data: IAssetsDeposit) => {
//     try {
//         const res = await $api.post(`/actives/deposits/`, data)
//         return {
//             type,
//             payload: res.data
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
