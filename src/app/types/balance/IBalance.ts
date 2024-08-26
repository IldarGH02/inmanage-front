import { Card } from '../dto/DtoTypes.ts'

export interface Income {
    id: number,
    object_id: number,
    funds: number,
    comment: string,
    writeoff_account: number,
    created_at: Date
}

export type Balance = {
    id: number,
    card_list: Card[],
    favourite_cards: number[],
    total: number,
    total_in_currency: number | null,
    total_income: number,  // optional
    total_expenses: number,  // optional
    currency: null,  // валюта
    card_funds: number,  // optional
    card_income: number,
    card_expenses: number,
    user: number
}

export interface RequestCard {
    name: string,
    bank: boolean, // Флаг, где true - банковская карта, false - наличный счет
    bank_name: string, // Название банка
    currency: string | null, // Только если валютный счет, null = "RUB"
    remainder: number, // остаток средств на счету
    credit?: CreditRequest
}

export interface CreditRequest {
    limit: number, // Лимит кредитно карты
    interest_free: number, // Беспроцентный период
    interest_free_day: number, // День обнуления БП
    percentage_for_delay: number, // Процент за просрочку
    usage_payment: number, // плата за обслуживание (в рамках кредитной карты)
}

export interface ExpenseList {
    id: number,
    name: string,
    active: boolean
}

export interface Work {
    id: number,
    name: string,
    income: number[]
}

export interface ExpenseItem {
    id: number,
    name: string,
    active: boolean
}

export interface IFavouriteCards {
    favourite_card: number[]
}
export interface IExpenseListBlock {
    id: number,
    name: string,
    active: boolean
}

export interface IExpenseSlider {
    id: number,
    name: string,
    img: string,
    sum?: number 
}

export interface IExpenseSliderCategory {
    id: number, 
    name: string,
    img: string
}

export interface IPaymentsDays {
    number: number,
    day: string,
    arrPayments: IPayment[],
    active: boolean
}

export interface IPayment {
    id: number,
    name: string,
    sum: number,
    done: boolean,
}

export interface IWork { // для вненсения доходов
    id?: number,
    name: string,
    income: number[]
}

export interface IIncome { // для вненсения доходов
    id?: number,
    work: null|number,
    project: null|number,
    funds: number,
    comment: string|null,
    writeoff_account: number
    created_at?: Date
}

export interface IIncomeBalance { // Внутри balance.card_list
    id?: number,
    object_id?: number,
    funds: number,
    comment: string | null,
    writeoff_account: number
    created_at?: Date
}

export interface IExpenseBalance { // Внутри balance.card_list
    id?: number,
    object_id?: number,
    funds: number,
    comment: string|null,
    writeoff_account: number
    category?: {
        icon_id: number|null,
        title: string|null
    }
    created_at?: Date
}

export interface IExpensePersonalIcons {
    id?: number,
    title: string,
    icon_id: number
}
