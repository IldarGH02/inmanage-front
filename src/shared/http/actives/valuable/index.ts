import { AxiosResponse } from "axios";
import { ValuableRequest } from "../../../../app/types/request/requestTypes";
import $api from "../../api";

export class ValuableService {
    static async createValuable(valuable: ValuableRequest): Promise<AxiosResponse> {
        return await $api.post(`/actives/jewelry/`, valuable)
    }

    static async changeJewerly(jewerly: ValuableRequest, id: string): Promise<AxiosResponse> {
        return await $api.patch(`/actives/jewelry/up/${id}`, jewerly)
    }

    static async removeJewerly(id: string): Promise<AxiosResponse> {
        return await $api.delete(`/actives/jewelry/del/${id}/`)
    }
}