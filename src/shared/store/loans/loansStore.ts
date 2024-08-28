import { makeAutoObservable } from "mobx";
import { CreditRequest } from "../../../app/types/request/requestTypes";
import { LoansService } from "../../http/actives/loans";
import { LoanDto } from "../../../app/types/dto/DtoTypes";
import { makePersistable } from "mobx-persist-store";
import localforage from "localforage"
import { ChangeEvent, MouseEvent } from "react";
import { DateTime } from "luxon";

export class LoansStore {
    loanName: string = ''
    writeoffAccount: string = ''
    loanSum: string = ''
    loanPeriod: string = ''
    loanTerm: string = ''
    loanDate: DateTime | null = null
    loanPercent: string = ''

    depositName: string = ''
    depositSum: string = ''
    depositTerm: string = ''
    depositPercent: string = ''

    switchParam: string | null = 'Вклады'

    loading: boolean = false

    constructor() {
        makeAutoObservable(this)
        makePersistable(this, {
            name: 'LoansStore',
            storage: localforage,
            properties: [

            ]
        })
    }

    setLoading(bool: boolean){
        this.loading = bool
    }

    handleChangeSwitchParam = (e: MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.textContent
        this.switchParam = value
        console.log(value)
    }

    handleChangeDepositName = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        this.depositName = value
    }

    handleChangeDepositSum = (value: string) => {
        this.depositSum = value
    }

    handleChangeDepositTerm = (value: string) => {
        this.depositTerm = value
    }

    handleChangeDepositPercent = (value: string) => {
        this.depositPercent = value
    }

    handleChangeLoanName = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        this.loanName = value
    }

    handleChangeLoanSum = (value: string) => {
        this.loanSum = value
    }

    handleChangeLoanPeriod = (value: string) => {
        this.loanPeriod = value
    }

    handleChangeLoanTerm = (value: string) => {
        this.loanTerm = value
    }

    handleChangeLoanDate = (date: DateTime) => {
        this.loanDate = date
    }

    handleChangeLoanPercent = (value: string) => {
        this.loanPercent = value
    }

    handleChangeWriteoffAccount = (value: string) => {
        this.writeoffAccount = value
    }

    createLoan(loan: CreditRequest){
        return LoansService.createLoans(loan)
    }

    changeLoan(loan: LoanDto, id: string){
        return LoansService.updateLoan(id, loan)
    }

    removeLoan(id: string){
        return LoansService.removeLoan(id)
    }
}