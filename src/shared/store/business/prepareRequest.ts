import { DateTime } from "luxon"
import { CreditDto } from "../../../app/types/dto/DtoTypes"

export const preparedRequest = (
    sum: string,
    loan_term: string,
    percentage: string,
    first_payment_date: DateTime | null,
    payment_order: string,
    payment_period: string,
    checked: boolean
): CreditDto | null => {
    const credit: CreditDto = {
        sum: Math.floor(Number(sum.replace(/ /g, ''))),
        loan_term: Number(loan_term.replace(/ /g, '')),
        percentage: Number(percentage.replace(/ /g, '')),
        first_payment_date: String(first_payment_date),
        payment_order: payment_order,
        payment_period: payment_period
    }

    return checked ? credit : null
}

export const prepareToNumber = (param: string): number => {
    return Number(param.replace(/ /g, ''))
}