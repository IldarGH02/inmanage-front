import { IIncomeBalance } from "../../balance/IBalance";

export interface IAssetsDeposit {
    id?: number,
    incomes: IIncomeBalance[],
    percentage: number,
    period?: '',
    sum: number,
    type: string,
}

// total_expenses: number,
// total_funds: number,
// total_income: number,