import { action, makeObservable, observable } from 'mobx'
import {Balance, Work, IIncome, IIncomeBalance, IExpenseBalance, RequestCard} from '../../types/balance/IBalance.ts'
import { Card } from '../../types/dto/DtoTypes.ts'
import BalanceService from '../../../shared/http/balance'
import $api from '../../../shared/http/api'

export default class BalanceStore {
    balance: Balance | null = null
    card: Card | unknown = {} as Card
    card_list: Card[] | null = null
    favourite_cards: number[] | null = null
    works: Work[] | null = null
    loading = false
    error: unknown | null = null

    constructor(
        
    ) {
        makeObservable(this, {
            balance: observable, 
            card_list: observable,
            loading: observable,
            card: observable,
            error: observable,
            favourite_cards: observable,
            works: observable,

            setLoading: action.bound,
            setBalance: action.bound,
            setCardList: action.bound,
            setError: action.bound,
            setWorks: action.bound,

            createNewCard: action.bound,
            removeChooseCard: action.bound,
            fetchWorks: action.bound

        })

        this.fetchBalance()
    }

    setLoading(bool: boolean) {
        this.loading = bool
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
        return await BalanceService.fetchBalance()
    }

    async createNewCard(card: RequestCard) {
        return await BalanceService.createCard(card)
    }

    async removeChooseCard(id: number) {
        return await $api.delete(`/balance/cards/del/${id}/`)
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

    async createNewWork(name: string, param: string | null, funds: number, comment: string) {
        try {
            const project = param ? param : null;
            const { data } = await BalanceService.createWork(name, project, funds, comment)
            return data
        } catch (e) {
            this.setError(e)
        }
    }

    async fetchWorks() {
        try {
            const response = await BalanceService.fetchWorks()
            if(response.status >= 200 && response.status < 300) {
                this.setWorks(response.data)
            }
        } catch (e) {
            this.setError(e)
        }
    }

    createNewIncome(object: IIncome){
        try {
            return BalanceService.createIncome(object)
        } catch(e){
            this.setError(e)
        }
    }

    updateActivesIncome(param: string, id: number | null, objIncome: IIncomeBalance[]){
        try {
            return BalanceService.updateActivesIncome(param, id, objIncome)
        } catch(e) {
            this.setError(e)
        }
    }

    createPersonalExpense(idCard: number, icon: IExpenseBalance){
        try {
            return BalanceService.createPersonalExpense(idCard, icon)
        } catch (e) {
            this.setError(e)
        }
    }
}