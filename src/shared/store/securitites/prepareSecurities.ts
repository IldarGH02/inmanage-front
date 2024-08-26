import { SecurititesRequest } from "../../../app/types/request/requestTypes"

export const prepareSecurities = (
    name: string,
    broker: string,
    cost: string,
    count: string,
    market_price: number | undefined
) => {
    const securities: SecurititesRequest = {
        name: name,
        broker: broker,
        cost: Number(cost),
        count: Number(count),
        market_price: market_price
    }

    return securities
}