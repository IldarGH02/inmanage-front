import { ITransport } from "../common/transportType"
import { IBorrows } from "../common/borrowType"
import { Immovable } from "../common/immovableType"
import { ILoans } from "../common/loansType"

export type Liabilities = {
    id: number,
    user: number,
    properties: Immovable | null,
    transports: ITransport | null,
    loans: ILoans | null,
    borrows: IBorrows | null,
    total_funds: number,
    total_expenses: number
}
