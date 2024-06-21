import { ZodNull, z } from 'zod'

const IncomeSchema = z.object({
    id: z.number(),
    object_id: z.number(),
    funds: z.number(),
    comment: z.string().nullable(),
    writeoff_account: z.number(),
    created_at: z.coerce.date()
})

const CardShema = z.object({
    id: z.number(),
    name: z.string(),
    bank: z.boolean(),
    bank_name: z.string().nullable(),
    card_num: z.string().nullable(),
    loan: z.boolean(),
    interest_free: z.number().nullable(),
    percentage: z.number().nullable(),
    remainder: z.number(),
    limit: z.number().nullable(),
    flag: z.boolean(),
    income: IncomeSchema.array(),  // optional
    expenses: IncomeSchema.array(), // optional
    total_expense: z.number().nullable(),
    total_income: z.number().nullable(),
    currency: z.number(), // валюта
    is_business: z.boolean(),
    is_deletable: z.boolean(),
    is_editable: z.boolean()
})

const BalanceShema = z.object({
    id: z.number(), 
    card_list: CardShema.array(),
    favourite_cards: z.number().array(),
    total: z.number(),
    total_in_currency: z.number().nullish(), 
    total_income: z.number(),  // optional
    total_expenses: z.number(),  // optional
    currency: ZodNull.create(),  // валюта
    card_funds: z.number(),  // optional
    card_income: z.number(),
    card_expenses: z.number(),
    user: z.number()
})

export const ExpenseListSchema = z.object({
    id: z.number(),
    name: z.string(),
    active: z.boolean()
}).array()

export const ExpenseItemType = z.object({
    id: z.number(),
    name: z.string(),
    active: z.boolean()
})

export type Balance = z.infer<typeof BalanceShema>
export type Card = z.infer<typeof CardShema>
export type Income = z.infer<typeof IncomeSchema>
export type ExpenseItem = z.infer<typeof ExpenseItemType>
export type ExpenseList = z.infer<typeof ExpenseListSchema>
export interface IFavouriteCards {
    favourite_card: number[]
}
export interface IExpenseListBlock {
    id: number,
    name: string,
    active: boolean
}

export interface IExpenseSlider {
    id: number,
    name: string,
    img: string,
    sum?: number 
}

export interface IExpenseSliderCategory {
    id: number, 
    name: string,
    img: string
}

export interface IPaymentsDays {
    number: number,
    day: string,
    arrPayments: IPayment[],
    active: boolean
}

export interface IPayment {
    id: number,
    name: string,
    sum: number,
    done: boolean,
}

export interface IWork { // для вненсения доходов
    id?: number,
    name: string,
    income: number[]
}

export interface IIncome { // для вненсения доходов
    id?: number,
    work: null|number,
    project: null|number,
    funds: number,
    comment: string|null,
    writeoff_account: number
    created_at?: Date
}

export interface IIncomeBalance { // Внутри balance.card_list
    id?: number,
    object_id?: number,
    funds: number,
    comment: string|null,
    writeoff_account: number
    created_at?: Date
}

export interface IExpenseBalance { // Внутри balance.card_list
    id?: number,
    object_id?: number,
    funds: number,
    comment: string|null,
    writeoff_account: number
    category?: {
        icon_id: number|null,
        title: string|null
    }
    created_at?: Date
}

export interface IExpensePersonalIcons {
    id?: number,
    title: string,
    icon_id: number
}