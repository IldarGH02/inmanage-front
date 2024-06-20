import $api from "../api"
import { IPayment } from "../../../app/types/balance/IPayment"

export default class PaymentsService {
    static async getPayments(): Promise<IPayment> {
        const response = await $api.get<IPayment>(`/balance/payments`)
        return response.data
    }
}