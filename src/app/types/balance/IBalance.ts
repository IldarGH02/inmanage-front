export interface IBalance {
    id: number, 
    card_list: ICard[],
    favorite_cards: number[]
    total: number,
    total_in_currency: number|null, 
    total_income: number,  // optional
    total_expenses: number,  // optional
    currency: null,  // валюта
    card_funds: number,  // optional
    card_income: number,
    card_expenses: number,
    user: number
}

export interface ICard {
    id?: number,
    name: string,
    bank: boolean,
    bank_name: string|null,
    card_num: string|null,
    loan: boolean,
    interest_free: number|null,
    percentage: number|null,
    remainder: number,
    limit: number|null,
    flag: boolean
    income: IIncomeBalance[],  // optional
    expenses: IIncomeBalance[]  // optional
    total_expense: number|null,
    total_income: number|null,
    currency: number, // валюта
    is_business: boolean,
    is_deletable: boolean,
    is_editable: boolean
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
    comment: string|null,
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