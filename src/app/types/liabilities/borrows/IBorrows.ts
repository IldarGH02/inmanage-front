import { IExpenseBalance } from "../../balance/IBalance";

export interface ILiabilitiesBorrows {
    id?: number,
    name: string,
    date: Date,
    expenses: IExpenseBalance[],
    insurance: boolean, // страховка
    insurance_sum: number, // стоимость страховки
    remainder: number, // остаток
    total_expense: number,
    // insurance_val: boolean, //наличие страховки (МОЕ) 

    sum: number,//сумма кредита
    loan_term: number, // срок кредитования
    percentage: number, //процентная ставка
    month_payment: number, // ежемесячный платеж
    maintenance_cost: number // стоимость обслуживания
}