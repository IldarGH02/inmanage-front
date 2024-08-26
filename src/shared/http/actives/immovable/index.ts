import {ImmovableRequest} from "../../../../app/types/actives/ActivesTypes.ts";
import $api from "../../api";
import {AxiosResponse} from "axios";

export class ImmovableService {
    static async createImmovable(property: ImmovableRequest): Promise<AxiosResponse> {
        return await $api.post(`/actives/properties/`, property)
    }

    static async editImmovable(id: string, property: ImmovableRequest): Promise<AxiosResponse> {
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