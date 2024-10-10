import { RequestBodyTransport } from "../../../app/types/actives/ActivesTypes";

export const transportRequest = (
        brand: string,
        model: string,
        owner_count: string,
        bought_price: string,
        loan: boolean,
        initial_payment: string,
        loan_term: string,
        percentage: string, // optional
        payment_order: string,
        payment_period: string,
        year: string,
        body_type: string,
        horse_power: string,
        steering_wheel: string,
    ) => {

    const transport: RequestBodyTransport = {
        mark: brand,
        model: model,
        owner_count: owner_count,
        bought_price: Number(bought_price.replace(/ /g, '')),
        loan: loan,
        initial_payment: loan ? Number(initial_payment.replace(/ /g, '')) : 0,
        loan_term: loan ? Number(loan_term.replace(/ /g, '')) : 0,
        percentage: loan ? Number(percentage.replace(/ /g, '')) : 0, // optional
        writeoff_account: 1,
        payment_order: payment_order,
        payment_period: payment_period,
        year: year,
        body_type: body_type,
        horse_power: horse_power,
        steering_wheel: steering_wheel,
    }

    return transport
}