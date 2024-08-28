import { LoanDto } from "../dto/DtoTypes";

export interface ILoans {
    id: number,
    user: number,
    total_funds: number,
    total_expenses: number,
    total_income: number,
    loans: LoanDto[]
}