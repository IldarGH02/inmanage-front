import { JewelryDto } from "../../dto/DtoTypes";

export interface IValuable {
    id: number;
    jewelries: JewelryDto[];
    total_expenses: number;
    total_income: number;
    total_funds: number;
}