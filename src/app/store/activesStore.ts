import {makeAutoObservable} from 'mobx'
import { IAssets } from '../types/assets/IAssets'
import $api from '../../shared/http/api'

export default class ActivesStore {
    actives: IAssets | null = null
    isFetching = false

    constructor(
        
    ) {
        makeAutoObservable(this)
        this.fetchBalance()
    }

    setIsFetching(bool: boolean) {
        this.isFetching = bool
    }

    setBalance(data: IAssets) {
        this.actives = data
    }

    async fetchBalance() {
        try {
            const response = await $api.get<IAssets>(`/actives/`)
            console.log(response.data)
            this.setBalance(response.data)
            return response
        } catch (e) {
            console.log(e)
        }
    }
}