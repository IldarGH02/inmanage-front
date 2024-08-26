import { AxiosResponse } from "axios";
import { SecurititesRequest } from "../../../../app/types/request/requestTypes";
import $api from "../../api";
import { ISecuritiesData } from "../../../../app/types/actives/securities/securitiesTypes";

export class SecuritiesService {
    static async createSecurities(securities: SecurititesRequest):Promise<AxiosResponse> {
        return await $api.post(`/actives/securities/`, securities)
    }

    static async updateSecurities(id: string, count: string){
        return await $api.patch(`/actives/securities/${id}`, count)
    }

    static async removeSecurities(id: string):Promise<AxiosResponse> {
        return await $api.delete(`/actives/securities/del/${id}/`)
    }

    static async getSecurities():Promise<AxiosResponse<ISecuritiesData[]>>{
        return await $api.get<ISecuritiesData[]>(`/actives/securities/default/`)
    }
}