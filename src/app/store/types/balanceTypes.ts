import { IExpensePersonalIcons, IWork } from "../../types/balance/IBalance";

export enum actionTypesBalance {
    SHOW_LOADER = 'SHOW_LOADER_BALANCE',
    HIDE_LOADER = 'HIDE_LOADER_BALANCE',
    GET_BALANCE = 'GET_BALANCE',

    ADD_CARD = 'ADD_CARD',
    EDIT_CARD = 'EDIT_CARD',
    REMOVE_CARD = 'REMOVE_CARD',
    ADD_FAVORITE_CARD = 'ADD_FAVORITE_CARD',

    GET_WORKS = 'GET_WORKS',
    ADD_WORK = 'ADD_WORK',
    REMOVE_WORK = 'REMOVE_WORK',

    ADD_INCOME_WORK = 'ADD_INCOME_WORK',
    ADD_INCOME_ASSETS = 'ADD_INCOME_ASSETS',

    GET_PERSONAL_EXPENSE_CATEGORIES = 'GET_PERSONAL_EXPENSE_CATEGORIES',
    ADD_EXPENSE_PERSONAL_CATEGORY = 'ADD_EXPENSE_PERSONAL_CATEGORY',
    ADD_EXPENSE_PERSONAL = 'ADD_EXPENSE_PERSONAL',
    ADD_EXPENSE_ASSETS_LIABILITIES = 'ADD_EXPENSE_ASSETS_LIABILITIES',

    SET_DATE = 'SET_DATE',
    SET_DAYS_OF_MONTH = 'SET_DAYS_OF_MONTH'
};

export interface IStateBalance {
    balance: IBalance | null,
    loading: boolean,
    work: IWork[] | null,
    personalCategories: IExpensePersonalIcons[] | null
}

export interface IStatePayments {
    date: Date,
    daysOfMonth: number[]
}

export interface IActionBalance {
    type: string;
    payload?: any; 
};

export const initialStateBalance: IStateBalance = {
    balance: null,
    work: null,
    loading: false,
    personalCategories: null
}

export const initialStatePayments: IStatePayments = {
    date: new Date(),
    daysOfMonth: []
}
