import $api from "../api"
import { IBalance, ICard } from "../../../app/types/balance/IBalance"
import { AxiosResponse } from "axios"

export default class BalanceService {
    static async fetchBalance():Promise<AxiosResponse<IBalance>> {
        const response = await $api.get<IBalance>(`/balance/`)
        return response
    }

    static async createCard(card: ICard):Promise<AxiosResponse<ICard>> {
        const response = await $api.patch<ICard>(`/balance/`, card)
        return response
    }

    static async removeCard(id: number) {
        const response = await $api.delete(`/balance/cards/del/${id}/`)
        return response
    }
}