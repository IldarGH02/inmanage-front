export interface IPayment {  
	id: number
    name: string
    amount: number
    date:  string
    date_end: string // 2024-12-31, приходит только для кредитов, дата последнего платежа
    // task: number // техническое поле, ссылка на задачу если платеж создан из задачи
    // parent: number // техническое поле, ссылка на кредит если платеж создан из кредита
    is_paid: boolean// key: это дата в формате "2024-12-31", value: это булево значение оплачен ли платеж на это число или нет
    diff_pay: string // key: это дата в формате "2024-12-31", value: это сумма платежа
    principal_payment_amount: string // key: это дата в формате "2024-12-31", value: это сумма основного платежа, без учета процентов
    parent: number// ID кредита
    order: string // Указатель типа платежа ann/diff (для кредитов)
    frequency: string // указатель регулярности платежа once; daily; weekly; monthly; quarterly; yearly

}