import { ValuableDto } from "../../dto/DtoTypes";

export interface IValuable {
    id: number;
    jewelries: ValuableDto[];
    total_expenses: number;
    total_income: number;
    total_funds: number;
}