import { IExpenseBalance } from "../balance/IBalance"
import { ILiabilitiesBorrows } from "./borrows/IBorrows"
import { ILiabilitiesLoans } from "./loans/ILoans"

export interface ILiabilities {
    id: number,
    user: number,
    properties: IProperty | null,
    transports: ITransport | null,
    loans: ILoans | null,
    borrows: IBorrows | null,
    total_funds: number,
    total_expenses: number
}

interface IProperty {
    id: number,
    user: number,
    total_funds: number,
    total_expenses: number,
    properties: ILiabilitiesProperty[]
}

interface ITransport {
    id: number,
    user: number,
    total_funds: number,
    total_expenses: number,
    transport: ILiabilitiesTransport[]
}

interface ILoans {
    id: number,
    user: number,
    total_funds: number,
    total_expenses: number,
    loans: ILiabilitiesLoans[]
}

interface IBorrows {
    id: number,
    total_funds: number,
    total_expenses: number,
    borrows: ILiabilitiesBorrows[]
}

// interface IIncomeExpenses {
//     id: number,
//     funds: number,
// }

export interface ILiabilitiesProperty {
    id?: number,
    user?: number,
    name: string,
    address?: string, //
    bought_price: number, //цена покупки
    actual_price: number,
    equipment_price: number,//цена оборудования
    month_expense: number,
    rent_type: string,//long_rent
    rent_price: number,

    loan?: boolean,
    
    expenses: IExpenseBalance[],
    total_expense: number,
    initial_payment: number | null,//первый взнос
    loan_term: number | null, // срок кредитования
    percentage: number, //процентная ставка
    month_payment: number | null, // ежемесячный платеж
    owner: string
}

export interface ITransportImages {
    id: number,
    transport: number,
    image: string
}

export interface ILiabilitiesTransport {
    id?: number,
    user?: number,
    mark: string,
    model: string,
    year: string,
    owner_count: string,
    owner: string,
    vin: string,
    use: string, // назначение
    month_expense: number,
    average_consumption: number,
    bought_price: number, //цена покупки
    owner_type: boolean,//физическое лицо

    loan: boolean,

    average_market_price: number,
    min_market_price: number,
    max_market_price: number,
    images: ITransportImages[],
    expenses: IExpenseBalance[],
    total_expense: number,
    initial_payment: number,//первый взнос
    loan_term: number, // срок кредитования
    percentage: number, //процентная ставка
    month_payment: number, // ежемесячный платеж
}
