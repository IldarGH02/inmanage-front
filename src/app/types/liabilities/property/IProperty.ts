export interface ILiabilitiesProperty {
    id?: number,
    user_id?: number,
    name: string,
    address: string,
    bought_price: number, //цена покупки
    actual_price: number,
    // revenue: number,//доход
    equipment_price: number,//цена оборудования
    // month_income: number,
    month_expense: number,
    average_consumption: number, //средний расход
    rent_type: boolean,//long_rent

    credit_indicator?: boolean,//мое
    
    average_market_price: number,
    min_market_price: number,
    max_market_price: number,
    expenses: number[],
    total_expense: number,
    initial_payment: number,//первый взнос
    loan_term: number, // срок кредитования
    percentage: number, //процентная ставка
    month_payment: number, // ежемесячный платеж
    owner: string
}

