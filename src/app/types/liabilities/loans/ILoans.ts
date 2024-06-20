import { IIncomeBalance } from "../../balance/IBalance"

export interface ILiabilitiesLoans {
    id?: number,
    user?: number,
    name: string,
    date: Date,
    insurance: boolean, // страховка
    insurance_sum: number, // стоимость страховки
    remainder: number, // остаток

    // insurance_val: boolean, //наличие страховки (МОЕ) 

    sum: number,//сумма кредита
    loan_term: number, // срок кредитования
    percentage: number, //процентная ставка
    month_payment: number, // ежемесячный платеж
    maintenance_cost: number // стоимость обслуживания
    expenses: IIncomeBalance[],
    image?: string
}