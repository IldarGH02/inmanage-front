export interface ILiabilitiesTransport {
    id?: number,
    user_id?: number,
    mark: string,
    model: string,
    owner: string,
    vin: string,
    use: string, // назначение

    month_expense: number,
    average_consumption: number,
    bought_price: number, //цена покупки
    
    // purpose: string, // назначение
    owner_type: boolean,//физическое лицо
    loan: boolean,//мое

    average_market_price: number,
    min_market_price: number,
    max_market_price: number,
    images: ITransportImages[],
    expenses: number[],
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