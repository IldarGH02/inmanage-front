import { DepositDto } from "../dto/DtoTypes" 

export interface DepositType {
    id?: number,
    total_incomes: number,
    total_expenses: number,
    total_funds: number,
    user: number,
    deposits: DepositDto[]
}