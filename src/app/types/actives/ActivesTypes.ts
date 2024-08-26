import { IAssetsDeposit } from "./deposit/IDeposit"
import { IValuable } from "./jewelries/JewelriesTypes.ts"; 
import { IBusiness } from "./business/BusinessTypes.ts";
import { ITransports } from "./transport/TransportTypes.ts";
import { Immovable } from "../common/immovableType.ts";
import { SecuritiesTypes } from "./securities/securitiesTypes.ts";

export type typeAssets = 'properties' | 'transport' | 'business'

export type Actives = {
    id: number,
    user: number,
    properties: Immovable, // optional, may be null
    transports: ITransports // optional
    businesses: IBusiness, // optional
    jewelries: IValuable | null,
    securities: SecuritiesTypes,
    deposits: IDeposit | null,
    total_funds: number, // optional
    total_income: number, // optional
    total_expenses: number // optional
}

interface IDeposit {
    id?: number,
    deposits: IAssetsDeposit[],
    total_funds: number,
    total_income: number,
    total_expenses: number
}

// interface IValuable {
//     id: number,
//     user: number,
//     total_funds: number,
//     // total_income: number,
//     // total_expenses: number,
//     jewelries: IAssetsJewelries[]
// }
//
// interface IBusiness {
//     id: number,
//     user: number,
//     total_funds: number,
//     total_income: number,
//     total_expenses: number,
//     businesses: IAssetsBusiness[]
// }

// interface IIncomeExpenses {
//     id: number,
//     funds: number,
// }

export interface ImmovableRequest {
    bought_price: number | null
    writeoff_account: number
    building_number: string
    city: string;
    street: string;
    name: string;

    // Поля для указания кредита/ипотеки
    loan: boolean;
    loan_term: number | null; // в месяцах
    percentage: number | null;
    initial_payment: number | null;
    month_payment: number | null;

    // Новые поля которые мы еще не передавали
    first_payment_date: string; // ISO
    payment_order: string; // ann - Аннуитентный; diff - Дифференцированный
    payment_period: string; // monthly; quarterly; yearly
}


export type typeLiabilities = 'properties' | 'transport'

export interface ITransportImages {
    id: number,
    transport: number,
    image: string
}

export type RequestBodyTransport = {
    mark: string,
    model: string,
    owner_count: string,
    owner_type: string, // legal/natural
    year: string,
    bought_price: number,

    // Поля для указания кредита/ипотеки
    loan: boolean;
    loan_term: number; // в месяцах
    percentage: number;
    initial_payment: number;

    // Новые поля которые мы еще не передавали
    writeoff_account: number; // Счет откуда списываем деньги первого взноса
    first_payment_date: string; // ISO
    payment_order: string; // ann - Аннуитентный; diff - Дифференцированный
    payment_period: string; // monthly; quarterly; yearly

    steering_wheel: string // руль - LEFT/RIGHT 
    body_type: string // тип кузова - Cедан; Купе; Универсал; Джип/SUV 5-дв; Джип/SUV 3-дв; Хэтчбэк; Кабриолет; Лифтбэк
    horse_power: string // кол-во лошадиных сил
}

// interface IInvestmentType {
//     own_funds: boolean,
//     third_party_tools: boolean,
//     loan_credit: boolean
// }

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