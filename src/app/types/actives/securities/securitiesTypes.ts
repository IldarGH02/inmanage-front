import { ExpenseDto, IncomeDto, SecuritiesDto } from "../../dto/DtoTypes"

export type SecuritiesTypes = {
    id: number
    securities: SecuritiesDto[]
    total_income: number
    total_expenses: number
    total_funds: number
    user: number
}

export interface ISecuritiesData {
    broker: string | null
    cost: number
    created_at: string
    expenses: ExpenseDto[]
    grow: number
    high: number
    id: number
    income: IncomeDto[]
    last_updated: string
    legal_close_price: number
    low: number
    market_price: number
    month_expenses: number
    month_income: number
    name: string
    open: number
    sum: number
    total_expense: number
    total_income: number
    user: number | null
    value: number
    writeoff_acoount: number | null
}