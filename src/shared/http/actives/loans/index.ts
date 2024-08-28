import { AxiosResponse } from "axios";
import { CreditRequest } from "../../../../app/types/request/requestTypes";
import $api from "../../api";
import { LoanDto } from "../../../../app/types/dto/DtoTypes";

export class LoansService {
    static async createLoans(loan: CreditRequest): Promise<AxiosResponse> {
        return await $api.post(`/actives/deposits/`, loan)
    }

    static async getLoanById(id: string): Promise<AxiosResponse>{
        return await $api.get<LoanDto>(`/actives/deposits/${id}/`)
    }

    static async updateLoan(id: string, loan: LoanDto): Promise<AxiosResponse>{
        return await $api.patch(`/actives/deposits/up/${id}/`, loan)
    }

    static async removeLoan(id: string): Promise<AxiosResponse>{
        return await $api.delete(`/actives/deposits/del/${id}/`)
    }
}