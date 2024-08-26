import { action, makeObservable, observable } from 'mobx'
import { IPayment } from '../types/balance/IPayment'
import { setDate, setDaysOfMonth } from '../../features/func/dateCreator'
import PaymentsService from '../../shared/http/payments'

export default class PaymentsStore {
    payment: IPayment | null = null
    date: Date = new Date
    daysOfMonth: number[][] = []
    isFetching = false

    constructor(
        
    ) {
        makeObservable(this, {
            payment: observable, 
            isFetching: observable,
            date: observable,
            daysOfMonth: observable,
            setIsFetching: action.bound,
            setPayments: action.bound,
            fetchPayments: action.bound,
            setDate: action.bound,
            setDaysOfMoths: action.bound
        })
    }

    setIsFetching(bool: boolean) {
        this.isFetching = bool
    }

    setPayments(data: IPayment) {
        this.payment = data
    }

    setDate(date: Date) {
        this.date = date
    }

    setDaysOfMoths(number: number[][]) {
        this.daysOfMonth = number
    }

    async fetchPayments() {
        try {
            const response = await PaymentsService.getPayments()
            this.setPayments(response)
        } catch (e) {
            return e
        }
    }

    createDate(date: Date) {
        this.setDate(date)
        setDate(date)
    }

    createDays(number: number[][]) {
        this.daysOfMonth = number
        setDaysOfMonth(number)
    }
}