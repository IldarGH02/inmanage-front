import $api from "../api"
import { IExpenseBalance, IExpensePersonalIcons, IIncome, Work, Balance, Card, IIncomeBalance } from "../../../app/types/balance/IBalance"

export default class BalanceService {
    static async fetchBalance():Promise<Balance> {
        const response = await $api.get<Balance>(`/balance/`)
        return response.data
    }

    static async createCard(card: Card):Promise<Card> {
        const response = await $api.patch<Card>(`/balance/`, card)
        return response.data
    }

    static async removeCard(id: number) {
        const response = await $api.delete(`/balance/cards/del/${id}/`)
        return response
    }

    static async createFavouriteCard(favouriteCards: number[]) {
        const response = await $api.patch<number[]>(`/balance/`, {favouriteCards})
        return response
    }

    static async fetchWorks(): Promise<Work[] | void> {
        const response = await $api.get<Work[]>(`/altincomes/works/`)
        return response.data
    }

    static async createWork(name: string, param: null | string, funds: number, comment: string) {
        const project = param ? param : null;
        const response = await $api.post<Work>(`/altincomes/`, {work: {name}, project, funds, comment})
        console.log(response)
        return response
    }

    static async createIncome(objIncome: IIncome){
        const response = await $api.post<Work>(`/altincomes/`, objIncome)
        return response
    }

    static async updateActivesIncome(param: string, id: number | null, objIncome: IIncomeBalance[]){
        const response = await $api.patch(`/actives/${param}/up/${id}/=`, objIncome)
        return response
    }

    static async fetchPersonalExpenseCategories(){
        const response = await $api.get<IExpensePersonalIcons[]>(`/categories/personal/`)
        return response
    }

    static async createPersonalExpenseCategories(icon: IExpensePersonalIcons){
        const response = await $api.post<IExpensePersonalIcons>(`/categories/personal`, icon)
        return response
    }   

    static async createPersonalExpense(idCard: number, icon: IExpenseBalance){
        const response = await $api.patch<IExpensePersonalIcons>(`/balance/cards/up/${idCard}`, {
            expenses: [
                {category: icon.category?.icon_id, title: icon.category?.title, description: '', funds: icon.funds}
            ]
        })
        return response
    }
}