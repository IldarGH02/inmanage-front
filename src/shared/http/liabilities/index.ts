import { AxiosResponse } from "axios";
import $api from "../api";
import { Liabilities } from "../../../app/types/liabilities/LiabilitiesType";

export class LiabilitiesService {
    static async fetchLiabilities(): Promise<AxiosResponse<Liabilities>> {
        return (await $api.get<Liabilities>(`/passives/`))
    }
}