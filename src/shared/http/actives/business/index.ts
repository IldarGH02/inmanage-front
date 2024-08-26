import { AxiosResponse } from "axios";
import { BusinessRequest } from "../../../../app/types/actives/business/BusinessTypes";
import $api from "../../api";

export class BusinessService {
    static async createBusiness(business: BusinessRequest):Promise<AxiosResponse> {
        console.log(business)
        return await $api.post<BusinessRequest>(`/actives/business/`, business)
    }

    static async deleteBusiness(id: string): Promise<AxiosResponse>{
        return await $api.delete(`/actives/busines/${id}/`)
    }

    static async changeBusiness(id: string): Promise<AxiosResponse>{
        return await $api.patch(`/business/up/${id}/`)
    }
}