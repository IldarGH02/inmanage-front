interface IInvestmentType {
    own_funds: boolean,
    third_party_tools: boolean,
    loan_credit: boolean
}

export interface IAssetsBusiness {
    user_id: number
    id?: number,
    user?: number,
    name: string,
    // logo
    address: string,
    direction: string, // направление
    type: boolean, //тип коммерции
    // investment_type?: string|number,
    own_funds: number, // собственные средства

    third_party_tools: number,//сторонние инвестиции
    creditor: string,
    third_party_tools_percentage: number, // сторонние инвестиции процент

    loan_sum: number,//сумма кредита
    loan_term: number, // срок кредитования
    percentage: number, //процентная ставка
    month_payment: number, // ежемесячный платеж

    revenue: number,//доход
    month_income: number,
    month_expense: number,
    average_profit: number,

    investment_type2?: IInvestmentType
}

export interface IInventoryBusiness {
    id?: number, 
    name: string,
    price: number,
    business_id: number,
    done: boolean
}

export interface IInventory {
    id: number, 
    name: string,
    price: number,
    business_id: number
}

