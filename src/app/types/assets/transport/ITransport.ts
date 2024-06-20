export interface IAssetsTransport {
    id?: number,
    user_id?: number,
    mark: string,
    model: string,
    owner: string,
    vin: string,
    use: string, // назначение
    month_income: number,
    month_expense: number,
    average_profit: number,
    bought_price: number, //цена покупки
    revenue: number, //доход
    // purpose: string, // назначение
    owner_type: boolean,//физическое лицо

    credit_indicator?: boolean,//мое

    average_market_price: number,
    min_market_price: number,
    max_market_price: number,
    images: ITransportImages[],
    income: number[],
    expenses: number[],
    total_income: number,
    total_expense: number,
    initial_payment: number,//первый взнос
    loan_term: number, // срок кредитования
    percentage: number, //процентная ставка
    month_payment: number, // ежемесячный платеж
}

export interface ITransportImages {
    id: number,
    transport: number,
    image: string
}

// export interface IInventoryProperty {
//     id: number, 
//     name: string,
//     price: number,
//     property_id: number
// }