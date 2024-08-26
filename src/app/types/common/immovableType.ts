import { ImmovableDto } from "../dto/DtoTypes";

export interface Immovable {
    id: number,
    user: number,
    total_funds: number,
    total_expenses: number,
    total_income: number,
    properties: ImmovableDto[]
}