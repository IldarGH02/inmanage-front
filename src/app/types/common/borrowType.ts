import { BorrowDto } from "../dto/DtoTypes";

export interface IBorrows {
    id: number,
    total_funds: number,
    total_expenses: number,
    borrows: BorrowDto[]
}