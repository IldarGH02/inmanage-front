import { IExpenseBalance, IIncomeBalance } from "../balance/IBalance"
import { IAssetsDeposit } from "./deposit/IDeposit"
import { IAssetsSecurities } from "./securities/ISecurities"
import { IAssetsJewelries } from "./valuable/IValuable"

export interface IAssets {
    id: number,
    user: number,
    properties: IProperty | null,
    transports: ITransport | null,
    businesses: IBusiness | null,
    jewelries: IValuable | null,
    securities: ISecurities | null,
    deposits: IDeposit | null
    total_funds: number,
    total_income: number,
    total_expenses: number
}

export interface IProperty {
    id: number,
    user: number,
    total_funds: number,
    total_income: number,
    total_expenses: number,
    properties: IAssetsProperty[]
}

interface IDeposit {
    id?: number,
    deposits: IAssetsDeposit[],
    total_funds: number,
    total_income: number,
    total_expenses: number
}

interface ISecurities {
    id: number,
    user: number,
    total_funds: number,
    // total_income: number,
    // total_expenses: number,
    securities: IAssetsSecurities[]
}

interface IValuable {
    id: number,
    user: number,
    total_funds: number,
    // total_income: number,
    // total_expenses: number,
    jewelries: IAssetsJewelries[]
}

interface ITransport {
    id: number,
    user: number,
    total_funds: number,
    total_income: number,
    total_expenses: number,
    transport: IAssetsTransport[]
}

interface IBusiness {
    id: number,
    user: number,
    total_funds: number,
    total_income: number,
    total_expenses: number,
    businesses: IAssetsBusiness[]
}

// interface IIncomeExpenses {
//     id: number,
//     funds: number,
// }

export interface IAssetsProperty {
    id?: number,
    user?: number,
    name: string,
    address?: string, //
    bought_price: number, //цена покупки
    actual_price: number,
    revenue: number,//доход
    equipment_price: number,//цена оборудования
    month_income: number,
    month_expense: number,
    average_profit: number,
    rent_type: string,//long_rent
    rent_price: number,
    equipment?: IEquipment,

    loan?: boolean,
    
    income: IIncomeBalance[],
    expenses: IExpenseBalance[],
    total_income: number,
    total_expense: number,
    initial_payment: number | null,//первый взнос
    loan_term: number | null, // срок кредитования
    percentage: number, //процентная ставка
    month_payment: number | null, // ежемесячный платеж
    owner: string
}

export interface ITransportImages {
    id: number,
    transport: number,
    image: string
}

export interface IAssetsTransport {
    id?: number,
    user?: number,
    mark: string,
    model: string,
    year: string,
    owner_count: string,
    owner: string,
    vin: string,
    use: string, // назначение
    month_income: number,
    month_expense: number,
    average_profit: number,
    bought_price: number, //цена покупки
    revenue: number, //доход
    // purpose: string, // назначение
    owner_type: boolean,//физическое лицо

    loan: boolean,

    average_market_price: number,
    min_market_price: number,
    max_market_price: number,
    images: ITransportImages[],
    income: IIncomeBalance[],
    expenses: IExpenseBalance[],
    total_income: number,
    total_expense: number,
    initial_payment: number,//первый взнос
    loan_term: number, // срок кредитования
    percentage: number, //процентная ставка
    month_payment: number, // ежемесячный платеж
}

// interface IInvestmentType {
//     own_funds: boolean,
//     third_party_tools: boolean,
//     loan_credit: boolean
// }

export interface IAssetsBusiness {
    id?: number,
    user?: number,
    name: string,
    bought_price: number,
    // logo
    address: string,
    direction: string, // направление
    type: string, //тип коммерции
    // investment_type?: string|number,
    own_funds:boolean,
    own_funds_amount: number | null, // собственные средства
    income: IIncomeBalance[],
    expenses: IExpenseBalance[],
    // equipment: [],

    third_party_tools: number,//сторонние инвестиции
    creditor: string,
    third_party_tools_percentage: number, // сторонние инвестиции процент
    loan: boolean,
    // loan_link: number,

    // loan_sum: number,//сумма кредита
    loan_term: number, // срок кредитования
    percentage: number, //процентная ставка
    month_payment: number, // ежемесячный платеж

    revenue: number,//доход
    month_income: number,
    month_expense: number,
    total_income: number,
    total_expense: number,
    average_profit: number,
    total_worth: number,
    // own_funds: boolean,
    // third_party_tools: boolean,
    initial_payment: number,//сумма кредита
    // loan_credit: boolean

    // investment_type?: IInvestmentType
}

export interface IEquipment {
    id: number,
    assets: IInventory[],
    total_actives_cost: number,
    total_consumables_cost: number
    // previous_inventories: [],
}

export interface IInventory {
    id?: number,
    text: string,
    price: number,
    count: number, 
    // flag: boolean,
    added: boolean,
    delete: boolean
}


//Инвентаризация
export interface IInventoryTable {
    id: number,
    text: string,
    price: number,
    amount: number, //!!!
    flag: boolean,
    added: boolean,
    delete: boolean
} 

export interface IInventoryTableInput {
    id: number,
    text: string,
    price: string,
    amount: string, //!!!
    added: boolean,
    delete: boolean
}