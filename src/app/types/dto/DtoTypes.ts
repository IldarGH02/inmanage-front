import { IExpenseBalance, IIncomeBalance } from "../balance/IBalance";

export interface ExpenseCategoryDto {
    title: string,
    icon_id: number
}

export type IncomeDto = {
    id: number;
    funds: number;
    comment: string;
    writeoff_account: number;
    created_at: Date; // "2023-07-31T14:15:22Z"
}

export type ImageDto = {
    image: string
}

export type AssetDto = {
    id: number;
    created_at: string; // "2023-07-31T14:15:22Z"
    count: string;
    text: string;
    price: string;
    is_consumables: boolean;
    inventory: number; // EquipmentDto
    flag: boolean
}

export type EquipmentDto = {
    id: number;
    assets: AssetDto[],
    expenses: ExpenseDto[];
    created_at: string; // "2023-07-31T14:15:22Z"
    total_actives_cost: number;
    total_consumables_cost: number;
}

export type ExpenseDto = {
    id: number;
    funds: number;
    title: string;
    category: ExpenseCategoryDto // только в личных расходах
    created_at: Date; // "2023-07-31T14:15:22Z"
    writeoff_account: number;
    description: string,
}

export type CreditDto = {
    name?: string; // только при создании кредита/займа
	date?: string; // Можно передать при необходимости дату займа
	sum: number;
	loan_term: number; // в месяцах
	percentage: number;
	month_payment?: number;
	first_payment_date: string; // ISO
	payment_order: string; // ann - Аннуитентный; diff - Дифференцированный
	payment_period: string; // once; monthly; quarterly; yearly
	writeoff_account?: number; // счет списания
}

export type RealtyDto = {
    id: number;
    actual_price: number;
    average_profit: number;
    bought_price: number;
    building_number: string;
    images: ImageDto[],
    city: string;
    street: string;
    created_at: string; // "2024-03-28T12:59:00Z"
    equipment: EquipmentDto;
    equipment_price: number;
    funds_invested: number;
    expenses: ExpenseDto[];
    income: IncomeDto[];
    loan: CreditDto;
    name: string;
    revenue: number; // Прибыль
    month_expense: number;
    month_income: number;
    total_expense: number;
    total_income: number;
    grow: number; // прирост стоимости в процентах
}

export type CreditCardDto = {
    limit: number,
    balance: number, // текущий остаток
    interest_free: number,
    interest_free_day: number, // День обнуления БП
    percentage_for_delay: number, // Процент за просрочку
    usage_payment: number, // плата за обслуживание
}

export type Card = {
    id: number,
    created_at: string; // "2023-07-31T14:15:22Z"
    income: IncomeDto[];
    expenses: ExpenseDto[];
    name: string,
    bank: boolean,
    bank_name: string,
    currency: string,
    remainder: number,
    total_income: number,
    total_expense: number,
    is_editable: boolean,
    is_business: boolean,
    is_deletable: boolean,
    is_visible: boolean

    // Новые поля
    loan: CreditDto | null,
    credit_card: CreditCardDto | null,
}

export type TransportDto = {
    id: number,
    loan: CreditDto;
    funds_invested: number;
    created_at: string, // "2023-07-31T14:15:22Z"
    images: ImageDto[],
    income: IncomeDto[],
    expenses: ExpenseDto[],
    mark: string,
    model: string,
    owner_count: string, // ДОЛЖНО БЫТЬ STRING
    owner_type: string, // legal/natural
    year: string,
    bought_price: number,
    average_market_price: number,
    min_market_price: number,
    max_market_price: number,
    month_income: number,
    month_expense: number,
    month_profit: number,
    total_income: number,
    total_expense: number,
    average_profit: number,
    revenue: number, // прибыль
    grow: number; // прирост стоимости в процентах
    steering_wheel: string // руль - LEFT/RIGHT 
    body_type: string // тип кузова -  Cедан; Купе; Универсал; Джип/SUV 5-дв; Джип/SUV 3-дв; Хэтчбэк; Кабриолет; Лифтбэк
    horse_power: string // кол-во лошадиных сил
}

export type ImmovableDto = {
    id: number;
	actual_price: number;
	average_profit: number;
	bought_price: number;
	building_number: string;
	images: ImageDto[],
	city: string;
	street: string;
	created_at: string; // 2024-03-28T12:59:00Z
	equipment: EquipmentDto;
	equipment_price: number;
	funds_invested: number;
	expenses: ExpenseDto[];
	income: IncomeDto[];
	loan: CreditDto[];
	name: string;
	revenue: number; // Прибыль
	month_expense: number;
	month_income: number;
	total_expense: number;
	total_income: number;
	grow: number; // прирост стоимости в процентах
	
	square: string;
	rooms: string;
    floors: string;
    facing: string;
    construction: string;
    balcony: boolean;
}

export type BorrowDto = {
    id?: number,
    name: string,
    date: Date,
    expenses: IExpenseBalance[],
    insurance: boolean, // страховка
    insurance_sum: number, // стоимость страховки
    remainder: number, // остаток
    total_expense: number,
    // insurance_val: boolean, //наличие страховки (МОЕ) 

    sum: number,//сумма кредита
    loan_term: number, // срок кредитования
    percentage: number, //процентная ставка
    month_payment: number, // ежемесячный платеж
    maintenance_cost: number // стоимость обслуживания
}

export type LoanDto = {
    id?: number,
    user?: number,
    name: string,
    date: Date,
    insurance: boolean, // страховка
    insurance_sum: number, // стоимость страховки
    remainder: number, // остаток

    // insurance_val: boolean, //наличие страховки (МОЕ) 

    sum: number,//сумма кредита
    loan_term: number, // срок кредитования
    percentage: number, //процентная ставка
    month_payment: number, // ежемесячный платеж
    maintenance_cost: number // стоимость обслуживания
    expenses: IIncomeBalance[],
    image?: string
}

export type SecuritiesDto = {
    id: number,
    name: string,
    broker: string,
    cost: number,
    market_price: number,
    value: number, 
    open: number, 
    low: number, 
    high: number, 
    legal_close_price: number, // Новое поле
    income: [IncomeDto], // массив ID из модели Income
    expenses: [ExpenseDto], // массив ID из модели Expenses
    total_income: number,
    total_expense: number,
    month_income: number,
    month_expense: number,
    count: number,
    sum: number,
    grow: number
}

export type JewerlyDto = {
    id: number;  // Уникальный идентификатор ювелирного изделия.
    name: string;  // Название ювелирного изделия.
    images: number[];  // Список идентификаторов изображений, связанных с данным изделием. Связано с моделью JewelryImage.
    purchase_cost: number;  // Стоимость приобретения ювелирного изделия.
    estimated_cost: number;  // Оценочная стоимость изделия.
    comment: string;  // Дополнительный комментарий к изделию.
    grow: number;  // Прирост стоимости изделия.
    income: [IncomeDto], // массив ID из модели Income
    expenses: [ExpenseDto], // массив ID из модели Expenses
    total_income: number;  // Общий доход от изделия.
    total_expense: number;  // Общие расходы на изделие.
    month_income: number;  // Доход от изделия за текущий месяц.
    month_expense: number;  // Расходы на изделие за текущий месяц.
}

