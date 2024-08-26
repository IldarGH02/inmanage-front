import {IDropDownList} from "../../app/types/elements/IDropDownList.ts";

export const paymentTypes: IDropDownList[] = [
    {
        id: 1,
        content: 'Наличные средства'
    },
    {
        id: 2,
        content: 'Кредит'
    }
]

export const paymentsOrder: IDropDownList[] = [
    {
        id: 1,
        content: 'Аннуитентный'
    },
    {
        id: 2,
        content: 'Дифференцированный'
    }
]

export const paymentsPeriod: IDropDownList[] = [
    {
        id: 1,
        content: 'Ежемесячно'
    },
    {
        id: 2,
        content: 'Ежеквартально'
    },
    {
        id: 3,
        content: 'Ежегодно'
    }
]

export const accountTypes: IDropDownList[] = [
    {
        id: 1,
        content: 'Наличные средства'
    },
    {
        id: 2,
        content: 'Карта'
    }
]

export const cardTypes: IDropDownList[] = [
    {
        id: 1,
        content: 'Дебетовая'
    },
    {
        id: 2,
        content: 'Кредитная'
    }
]

export const immovablesTypes: IDropDownList[] = [
    {
        id: 1,
        content: 'Наличные средства'
    },
    {
        id: 2,
        content: 'Кредит/Ипотека'
    }
]

export const rentTypeList: IDropDownList[] = [
    {
        id: 1,
        content: 'Долгосрочная'
    },
    {
        id: 2,
        content: 'Посуточная'
    }
]