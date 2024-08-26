import { LiabilitiesType } from "../../types/common/liabilitiesType"; 

export enum actionTypesLiabilities {
    SHOW_LOADER_LIABILITIES = 'SHOW_LOADER_LIABILITIES',
    HIDE_LOADER_LIABILITIES = 'HIDE_LOADER_LIABILITIES',

    ADD_EXPENSE = 'ADD_EXPENSE',

    GET_LIABILITIES = "GET_LIABILITIES",

    REMOVE_PROPERTY_LIABILITIES = 'REMOVE_PROPERTY_LIABILITIES',
    EDIT_PROPERTY_LIABILITIES = 'EDIT_PROPERTY_LIABILITIES',
    ADD_PROPERTY_LIABILITIES = 'ADD_PROPERTY_LIABILITIES',

    REMOVE_TRANSPORT_LIABILITIES = 'REMOVE_TRANSPORT_LIABILITIES',
    EDIT_TRANSPORT_LIABILITIES = 'EDIT_TRANSPORT_LIABILITIES',
    ADD_TRANSPORT_LIABILITIES = 'ADD_TRANSPORT_LIABILITIES',

    REMOVE_LOAN_LIABILITIES = 'REMOVE_LOAN_LIABILITIES',
    EDIT_LOAN_LIABILITIES = 'EDIT_LOAN_LIABILITIES',
    ADD_LOAN_LIABILITIES = 'ADD_LOAN_LIABILITIES',

    ADD_BORROW_LIABILITIES = 'ADD_BORROW_LIABILITIES',
    REMOVE_BORROW_LIABILITIES = 'REMOVE_BORROW_LIABILITIES',
};

export interface IStateLiabilities {
    liabilities: LiabilitiesType | null;
    loading: boolean
};

export interface IActionLiabilities {
    type: string;
    payload?: any; 
}

export const initialStateLiabilities: IStateLiabilities = {
    liabilities: null,
    loading: false
}
