import {CreditDto, EquipmentDto, ExpenseDto, ImageDto, IncomeDto} from "../../dto/DtoTypes.ts";

export type Business = {
    id: number,
    name: string;
    address: string,
    participation_percent: number;
    loan: CreditDto[];
    images: ImageDto[],
    third_party_tools: CreditDto[];
    equipment: EquipmentDto;
    created_at: string; // "2023-07-31T14:15:22Z"
    income: IncomeDto[];
    expenses: ExpenseDto[];
    bought_price: number;
    total_worth: number;
    month_income: number;
    funds_invested: number;
    month_expense: number;
    total_income: number;
    total_expense: number;
    average_profit: number;
    revenue: number;
    own_funds: boolean;
    own_funds_amount: number;
    grow: number; // прирост стоимости в процентах
}

export interface IBusiness {
    id: number;
    user: number;
    businesses: Business[];
    total_expenses: number;
    total_income: number;
    total_funds: number;
}

export interface BusinessRequest {
    name: string;
    address: string;
    participation_percent: number;

		// Собственные средства
    own_funds: boolean;
    own_funds_amount: number;
    own_funds_writeoff_account: number;
    
    // Сторонние и инвестиционные средства
    third_party_tools: CreditDto | null
    
    // Инвестиции в кредит
	loan: CreditDto | null
}

// interface IInvestmentType {
//     own_funds: boolean,
//     third_party_tools: boolean,
//     loan_credit: boolean
// }

// export interface IAssetsBusiness {
//     user_id: number
//     id?: number,
//     user?: number,
//     name: string,
//     // logo
//     address: string,
//     direction: string, // направление
//     type: boolean, //тип коммерции
//     // investment_type?: string|number,
//     own_funds: number, // собственные средства

//     third_party_tools: number,//сторонние инвестиции
//     creditor: string,
//     third_party_tools_percentage: number, // сторонние инвестиции процент

//     loan_sum: number,//сумма кредита
//     loan_term: number, // срок кредитования
//     percentage: number, //процентная ставка
//     month_payment: number, // ежемесячный платеж

//     revenue: number,//доход
//     month_income: number,
//     month_expense: number,
//     average_profit: number,

//     investment_type2?: IInvestmentType
// }

// export interface IInventoryBusiness {
//     id?: number, 
//     name: string,
//     price: number,
//     business_id: number,
//     done: boolean
// }

// export interface IInventory {
//     id: number, 
//     name: string,
//     price: number,
//     business_id: number
// }

