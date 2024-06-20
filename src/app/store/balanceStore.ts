import { action, makeObservable, observable } from 'mobx'
import { IBalance, ICard } from '../types/balance/IBalance'
import BalanceService from '../../shared/http/balance'
import $api from '../../shared/http/api'

export default class BalanceStore {
    balance: IBalance | null = null
    card: ICard | unknown = {} as ICard
    card_list: ICard[] | null = null
    isFetching = false
    error: unknown | null = null

    constructor(
        
    ) {
        makeObservable(this, {
            balance: observable, 
            card_list: observable,
            isFetching: observable,
            card: observable,
            error: observable,
            setIsFetching: action.bound,
            setBalance: action.bound,
            setCardList: action.bound,
            setError: action.bound,
            fetchBalance: action.bound,
            createNewCard: action.bound,
            removeChooseCard: action.bound

        })

        this.fetchBalance()
    }

    setIsFetching(bool: boolean) {
        this.isFetching = bool
    }

    setBalance(data: IBalance) {
        this.balance = data
    }

    setCardList(data: ICard[]) {
        this.card_list = data
    }

    setCard(card: ICard) {
        this.card = card
    }

    setError(error: unknown) {
        this.error = error
    }

    async fetchBalance() {
        try {
            const {data} = await BalanceService.fetchBalance()
            this.setBalance(data)
            this.setCardList(data.card_list)
        } catch (e) {
            this.setError(e)
        }
    }

    async createNewCard(card: ICard) {
        try {
            const response = await BalanceService.createCard(card)
            if(response) {
                this.setCard(response.data)
            }
            return response
        } catch (e) {
            this.setError(e)
        }
    }

    async removeChooseCard(id: number) {
        try {
            await $api.delete(`/balance/cards/del/${id}/`)
        } catch(e) {
            this.setError(e)
        } 
    }
}