import { action, makeObservable, observable } from 'mobx'
import { Card, Balance, IFavouriteCards, Work, IIncome, IIncomeBalance } from '../types/balance/IBalance'
import BalanceService from '../../shared/http/balance'
import $api from '../../shared/http/api'

export default class BalanceStore {
    balance: Balance | null = null
    card: Card | unknown = {} as Card
    card_list: Card[] | null = null
    favourite_cards: number[] | null = null
    works: Work[] | null = null
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
            works: observable,

            setIsFetching: action.bound,
            setBalance: action.bound,
            setCardList: action.bound,
            setError: action.bound,
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

    setFavouriteCards(favourite_cards: number[]) {
        this.favourite_cards = favourite_cards
    }

    setCard(card: Card) {
        this.card = card
    }

    setWorks(works: Work[]){
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

    async createNewFavouriteCard(favourite_cards: number[]) {
        try {
            const response = await BalanceService.createFavouriteCard(favourite_cards)
            if(response.data) {
                this.setFavouriteCards(response.data)
            }
            
        } catch(e) {
            this.setError(e)
        }
    }

    async createNewWork(work: number, project: string, founds: number, comment: string) {
        try {
            const { data } = await BalanceService.createWork(work, project, founds, comment)
            return data
        } catch (e) {
            this.setError(e)
        }
    }

    async fetchWorks() {
        try {
            const response = await BalanceService.fetchWorks()
            if(response) {
                this.setWorks(response)
            }
        } catch (e) {
            this.setError(e)
        }
    }

    async createNewIncome(object: IIncome){
        try {
            const response = await BalanceService.createIncome(object)
            return response
        } catch(e){
            this.setError(e)
        }
    }

    async updateActivesIncome(param: string, id: number | null, objIncome: IIncomeBalance[]){
        try {
            const response = await BalanceService.updateActivesIncome(param, id, objIncome)
            return response
        } catch(e) {

        }
    }
}