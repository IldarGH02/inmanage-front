import $api from "../api"
import {
    IExpenseBalance,
    IExpensePersonalIcons,
    IIncome,
    Work,
    Balance,
    IIncomeBalance,
    RequestCard
} from "../../../app/types/balance/IBalance"
import {AxiosResponse} from "axios";

export default class BalanceService {
    static async fetchBalance():Promise<AxiosResponse<Balance>> {
        return await $api.get<Balance>(`/balance/`)
    }

    static async createCard(card: RequestCard):Promise<AxiosResponse<RequestCard>> {
        return await $api.patch<RequestCard>(`/balance/`, {card: card})
    }

    static async removeCard(id: number) {
        return await $api.delete(`/balance/cards/del/${id}/`)
    }

    static async createFavouriteCard(favouriteCards: number[]) {
        return await $api.patch<number[]>(`/balance/`, {favouriteCards})
    }

    static async fetchWorks(): Promise<AxiosResponse<Work[]>> {
        return await $api.get<Work[]>(`/altincomes/works/`)
    }

    static async createWork(name: string, param: null | string, funds: number, comment: string) {
        const project = param ? param : null;
        return await $api.post<Work>(`/altincomes/`, {work: {name}, project, funds, comment})
    }

    static async createIncome(objIncome: IIncome){
        return await $api.post<Work>(`/altincomes/`, objIncome)
    }

    static async updateActivesIncome(param: string, id: number | null, objIncome: IIncomeBalance[]){
        return await $api.patch(`/actives/${param}/up/${id}/=`, objIncome)
    }

    static async fetchPersonalExpenseCategories(){
        return await $api.get<IExpensePersonalIcons[]>(`/categories/personal/`)
    }

    static async createPersonalExpenseCategories(icon: IExpensePersonalIcons){
        return await $api.post<IExpensePersonalIcons>(`/categories/personal`, icon)
    }   

    static async createPersonalExpense(idCard: number, icon: IExpenseBalance): Promise<AxiosResponse>{
        return await $api.patch<IExpensePersonalIcons>(`/balance/cards/up/${idCard}`, {
            expenses: [
                {category: icon.category?.icon_id, title: icon.category?.title, description: '', funds: icon.funds}
            ]
        })
    }


}
