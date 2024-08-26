import {AxiosResponse} from "axios";
import $api from "../../api";
import { RequestBodyTransport } from "../../../../app/types/actives/ActivesTypes.ts";
import { TransportDto } from "../../../../app/types/dto/DtoTypes.ts"; 


export class TransportService {
    static async createTransport(transport: RequestBodyTransport):Promise<AxiosResponse> {
        return await $api.post(`/actives/transport/`, transport)
    }

    static async removeTransport(id: number): Promise<AxiosResponse> {
        return await $api.delete(`/actives/transport/del/${id}/`)
    }

    static async fetchTransport(id: string): Promise<AxiosResponse<TransportDto>> {
        return await $api.get<TransportDto>(`/actives/transport/${id}`)
    }

    static async editTransport(id: number, transport: RequestBodyTransport): Promise<AxiosResponse<RequestBodyTransport>> {
        return await $api.patch(`/actives/transport/up/${id}`, transport)
    }
}