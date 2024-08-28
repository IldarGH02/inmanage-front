import { AxiosResponse } from "axios";
import { ValuableRequest } from "../../../../app/types/request/requestTypes";
import $api from "../../api";

export class ValuableService {
    static async createValuable(valuable: ValuableRequest): Promise<AxiosResponse> {
        return await $api.post(`/actives/jewelry/`, valuable)
    }

    static async changeJewelry(jewelry: ValuableRequest, id: string): Promise<AxiosResponse> {
        return await $api.patch(`/actives/jewelry/up/${id}`, jewelry)
    }

    static async removeJewelry(id: string): Promise<AxiosResponse> {
        return await $api.delete(`/actives/jewelry/del/${id}/`)
    }
}