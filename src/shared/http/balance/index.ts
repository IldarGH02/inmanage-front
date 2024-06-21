import $api from "../api"
import { IExpenseBalance, IExpensePersonalIcons, IIncome, IWork, Balance, Card } from "../../../app/types/balance/IBalance"

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

    static async createFavoriteCard(favoriteCards: number[]) {
        const response = await $api.patch<Balance>(`/balance/`, {favoriteCards})
        return response
    }

    static async fetchWorks() {
        const response = await $api.get<IWork[]>(`/altincome/works`)
        return response
    }

    static async createWork(name: string) {
        const response = await $api.post<IWork>(`/altincomes/`, {name})
        return response
    }

    static async createIncome(objIncome: IIncome){
        const response = await $api.post<IWork>(`/altincomes/`, objIncome)
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