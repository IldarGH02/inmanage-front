import { TransportDto } from "../dto/DtoTypes";

export interface ITransport {
    id: number,
    user: number,
    total_funds: number,
    total_expenses: number,
    transport: TransportDto[]
}