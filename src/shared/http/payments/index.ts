import $api from "../api"
import { Payment } from "../../../app/types/balance/IPayment"

export default class PaymentsService {
    static async getPayments(): Promise<Payment> {
        const response = await $api.get<Payment>(`/balance/payments`)
        return response.data
    }
}