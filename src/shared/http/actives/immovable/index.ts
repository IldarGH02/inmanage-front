import { ImmovablesRequestLoan, ImmovablesRequestCash } from "../../../../app/types/request/requestTypes"; 
import $api from "../../api";
import {AxiosResponse} from "axios";

export class ImmovablesService {
    static async createImmovable(property: ImmovablesRequestLoan | ImmovablesRequestCash): Promise<AxiosResponse> {
        return await $api.post(`/actives/properties/`, property)
    }

    static async editImmovable(id: string, property: ImmovablesRequestLoan | ImmovablesRequestCash): Promise<AxiosResponse> {
        return await $api.patch(`/actives/properties/up/${id}`, property)
    }

    static async deleteImmovable(id: string): Promise<AxiosResponse> {
        return await $api.delete(`/actives/properties/del/${id}/`)
    }
}


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