import { DateTime } from "luxon"
import { ImmovablesRequestLoan, ImmovablesRequestCash } from "../../../app/types/request/requestTypes" 


export const immovablesRequest = (
    bought_price: string,
    building_number: string,
    city: string,
    street: string,
    name: string,

    rooms: string,
    floors: string,
    facing: string, // "Требуется", Косметический, Евро, Дизайнерский
    construction: string, // Кирпичный, Панельный, Блочный, Монолитный, Монолитно-кирпичный, Деревянный
    balcony: boolean,

    // Поля для указания кредита/ипотеки
	loan: boolean,
    loan_term: string, // в месяцах
    percentage: string,
    initial_payment: string,

    // Новые поля которые мы еще не передавали
    writeoff_account: string,
    first_payment_date: DateTime | null, // ISO
    payment_order: string, // ann - Аннуитентный, diff - Дифференцированный
    payment_period: string, 
) => {

    const immovablesRequestLoan: ImmovablesRequestLoan = {
        bought_price: Number(bought_price),
        building_number: building_number,
        city: city,
        street: street,
        name: name,

        rooms: rooms,
        floors: floors,
        facing: facing,
        construction: construction,
        balcony: balcony,

        loan: loan,
        loan_term: loan ? Number(loan_term) : null,
        percentage: loan ? Number(percentage) : null,
        initial_payment: loan ? Number(initial_payment) : null,
        writeoff_account: loan ? Number(writeoff_account) : null,
        first_payment_date: loan ? String(first_payment_date) : null,
        payment_order: loan ? payment_order : null,
        payment_period: loan ? payment_period : null
    }

    const immovablesRequestCash: ImmovablesRequestCash = {
        bought_price: Number(bought_price),
        building_number: building_number,
        city: city,
        street: street,
        name: name,

        rooms: rooms,
        floors: floors,
        facing: facing,
        construction: construction,
        balcony: balcony,
    }
 
    if(loan) {
        return immovablesRequestLoan
    } else {
        return immovablesRequestCash
    }
}