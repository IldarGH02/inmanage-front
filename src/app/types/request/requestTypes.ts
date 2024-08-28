export type SecurititesRequest = {
    name: string,
    broker: string,
    cost: number,
    count: number,
    market_price: number | undefined
}

export type ValuableRequest = {
    name: string,
    purchase_cost: number,
    estimated_cost: number,
    comment: string,
    images?: string | null
}

export type CreditRequest = {
    name: string; // только при создании кредита/займа
	date: string; // Можно передать при необходимости дату займа
	sum: number;
	loan_term: number; // в месяцах
	percentage: number;
	month_payment: number;
	first_payment_date: string; // ISO
	payment_order: string; // ann - Аннуитентный; diff - Дифференцированный
	payment_period: string; // once; monthly; quarterly; yearly
	writeoff_account: number; // счет списания
}

export type DepositRequest = {
    name: string;
	writeoff_account: number;
	type: string; // Тип вклада
	period: number; // Период вклада
	percentage: number; // Процентная ставка
	sum: number; // Сумма вклада
}