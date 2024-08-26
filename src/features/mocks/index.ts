export interface IPaymentMock {
    name: string
    amount: number
    id: number
}

export const PaymentMock: IPaymentMock[] = [
    {
        name: 'Коммуналка',
        amount: 6000,
        id: 1
    },
    {
        name: 'Футбол',
        amount: 3500,
        id: 2
    },
    {
        name: 'Связь',
        amount: 1200,
        id: 3
    }
]