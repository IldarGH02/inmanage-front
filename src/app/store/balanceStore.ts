import { action, makeObservable, observable } from 'mobx'
import { Card, Balance, IFavouriteCards, IWork } from '../types/balance/IBalance'
import BalanceService from '../../shared/http/balance'
import $api from '../../shared/http/api'

export default class BalanceStore {
    balance: Balance | null = null
    card: Card | unknown = {} as Card
    card_list: Card[] | null = null
    favourite_cards: IFavouriteCards[] = []
    work: IWork | null = null
    works: IWork[] | null = null
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
            favourite_cards: observable,
            work: observable,
            works: observable,

            setIsFetching: action.bound,
            setBalance: action.bound,
            setCardList: action.bound,
            setError: action.bound,
            setWork: action.bound,
            setWorks: action.bound,

            fetchBalance: action.bound,
            createNewCard: action.bound,
            removeChooseCard: action.bound,
            fetchWorks: action.bound

        })

        this.fetchBalance()
    }

    setIsFetching(bool: boolean) {
        this.isFetching = bool
    }

    setBalance(data: Balance) {
        this.balance = data
    }

    setCardList(data: Card[]) {
        this.card_list = data
    }

    setCard(card: Card) {
        this.card = card
    }

    setWork(work: IWork){
        this.work = work
    }

    setWorks(works: IWork[]){
        this.works = works
    }

    setError(error: unknown) {
        this.error = error
    }

    async fetchBalance() {
        try {
            const response = await BalanceService.fetchBalance()
            this.setBalance(response)
            this.setCardList(response.card_list)
        } catch (e) {
            this.setError(e)
        }
    }

    async createNewCard(card: Card) {
        try {
            const response = await BalanceService.createCard(card)
            this.setCard(response)
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

    async createNewFavoriteCard() {

    }

    async createNewWork(name: string) {
        try {
            const { data } = await BalanceService.createWork(name)
            this.setWork(data)
        } catch (e) {
            this.setError(e)
        }
    }

    async fetchWorks() {
        try {
            const { data } = await BalanceService.fetchWorks()
            this.setWorks(data)
        } catch (e) {
            this.setError(e)
        }
    }
}