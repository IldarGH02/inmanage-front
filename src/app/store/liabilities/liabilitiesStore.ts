import { makeAutoObservable } from "mobx";
import { LiabilitiesService } from "../../../shared/http/liabilities";
import { Liabilities } from "../../types/liabilities/LiabilitiesType";

export class LiabilitiesStore {
    liabilities: Liabilities | null = null
    loading: boolean = false
    error: unknown = ''

    constructor(){
        makeAutoObservable(this)
    }

    setLiabilities(liabilities: Liabilities) {
        this.liabilities = liabilities;
    }

    setLoading(bool: boolean){
        this.loading = bool
    }

    setError(error: unknown){
        this.error = error
    }

    async fetchLiabilities() {
        return await LiabilitiesService.fetchLiabilities()
    }
}