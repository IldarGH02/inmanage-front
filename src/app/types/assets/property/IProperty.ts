export interface IAssetsProperty {
    id?: number,
    user_id?: number,
    name: string,
    address: string,
    bought_price: number, //цена покупки
    actual_price: number,
    revenue: number,//доход
    equipment_price: number,//цена оборудования
    month_income: number,
    month_expense: number,
    average_profit: number,
    rent_type: boolean,//long_rent

    credit_indicator?: boolean,//мое
    
    income: number[],
    expenses: number[],
    total_income: number,
    total_expense: number,
    initial_payment: number,//первый взнос
    loan_term: number, // срок кредитования
    percentage: number, //процентная ставка
    month_payment: number, // ежемесячный платеж
    owner: string
}

export interface IInventoryProperty {
    id?: number, 
    name: string,
    price: number,
    property_id: number,
    done: boolean
}

// export interface IInventoryDto {
//     name: string,
//     price: number,
//     done: boolean
// }
