export type SecurititesRequest = {
    name: string,
    broker: string,
    cost: number,
    count: number,
    market_price: number | undefined
}

export type ValuableRequest = {
    name: string,
    purchase_cost: number,
    estimated_cost: number,
    comment: string,
    images?: string | null
}