import $api from "../../../../shared/http/api"
import { IBalance, ICard, IExpenseBalance, IExpensePersonalIcons, IIncome, IIncomeBalance, IWork } from "../../../types/balance/IBalance"

export const showLoader = (type: string) => {
    return {
        type
    }
}

export const hideLoader = (type: string) => {
    return {
        type
    }
}

export const getBalance = async (type: string) => {
    try {
        const response = await $api.get<IBalance>(`/balance/`)
        console.log('IBalance', response.data)
        return {
            type,
            payload: response.data
        } 
    } catch (error) {
        console.log(error)
    } 
}

//Card

export const addCard = async (type: string, card: ICard) => {
    try {
        const response = await $api.post<IBalance>(`/balance/`, card)
        console.log(response.data)
        return {
            type,
            payload: response.data
        } 
    } catch (error) {
        console.log(error)
    } 
}

export const editCard = async (type: string, card: ICard, id: number) => {
    console.log(card)
    try {
        const response = await $api.patch<IBalance>(`/balance/cards/up/${id}`, card)
        return {
            type,
            payload: response.data
        } 
    } catch (error) {
        console.log(error)
    } 
}

export const removeCard = async (type: string, id: number) => {
    try {
        await $api.delete(`/balance/cards/del/${id}/`)
        return {
            type,
            payload: {
                id: id
            }
        } 
    } catch (error) {
        console.log(error)
    } 
}

export const addFavoriteCard = async (type: string, favoriteCards: number[]) => {
    try {
        const response = await $api.patch<IBalance>(`/balance/`, {favourite_cards: favoriteCards})
        console.log('res', response.data)
        return {
            type,
            payload: {
                balance: response.data
            }
        } 
    } catch (error) {
        console.log(error)
    } 
}

//Income

export const getWorks = async (type: string) => {
    try {
        const response = await $api.get<IWork[]>(`/altincomes/works/`)
        console.log('IWork', response.data)
        return {
            type,
            payload: {
                work: response.data
            }
        } 
    } catch (error) {
        throw error
    } 
}

export const addWork = async (type: string, name: string) => {
    try {
        const response = await $api.post<IWork>(`/altincomes/works/`, {name: name})
        console.log(response.data)
        return {
            type,
            payload: {
                work: response.data
            }
        } 
    } catch (error) {
        console.log(error)
    } 
}

export const addIncome = async (type: string, objIncome: IIncome) => {
    try {
        const response = await $api.post<IWork>(`/altincomes/`, objIncome)
        console.log(response.data)
        return {
            type,
            payload: {
                income: response.data
            }
        } 
    } catch (error) {
        console.log(error)
    } 
}

export const addIncomeAssets = (type: string, incomeObj: IIncomeBalance) => {
    return {
        type,
        payload: {
            incomeObj: incomeObj
        }
    } 
}

export const addExpenseAssetsLiabilities = (type: string, expenseObj: IExpenseBalance) => {
    return {
        type,
        payload: {
            expenseObj: expenseObj
        }
    } 
}

// export const addExpenseLiabilities = (type: string, expenseObj: IExpenseBalance) => {
//     return {
//         type,
//         payload: {
//             expenseObj: expenseObj
//         }
//     } 
// }

export const getPersonalExpenseCategories = async (type: string) => {
    try {
        const response = await $api.get<IExpensePersonalIcons[]>(`/categories/personal/`)
        console.log(response.data)
        return {
            type,
            payload: {
                icons: response.data
            }
        } 
    } catch (error) {
        console.log(error)
    } 
}

export const addPersonalExpenseCategory = async (type: string, icon: IExpensePersonalIcons) => {
    try {
        const response = await $api.post<IExpensePersonalIcons>(`/categories/personal/`, icon)
        console.log(response.data)
        return {
            type,
            payload: {
                icon: response.data
            }
        } 
    } catch (error) {
        console.log(error)
    } 
}

export const addPersonalExpense = async (type: string, idCard: number, icon: IExpenseBalance) => {
    try {
        const response = await $api.patch<IExpensePersonalIcons>(`/balance/cards/up/${idCard}`, {expenses: [{category: icon.category?.icon_id, title: icon.category?.title, description: '', funds: icon.funds}]})
        console.log(response.data)
        return {
            type,
            payload: {
                icon: response.data
            }
        } 
    } catch (error) {
        console.log(error)
    } 
}
