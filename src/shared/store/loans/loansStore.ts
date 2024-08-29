import { makeAutoObservable } from "mobx";
import { CreditRequest } from "../../../app/types/request/requestTypes";
import { LoansService } from "../../http/actives/loans";
import { Card, DepositDto, LoanDto, LoansDto } from "../../../app/types/dto/DtoTypes";
import { makePersistable, stopPersisting } from "mobx-persist-store";
import localforage from "localforage"
import { ChangeEvent, MouseEvent } from "react";
import { DateTime } from "luxon";
import { IDropDownList } from "../../../app/types/elements/IDropDownList";
import { listPeriodPayments } from "../../../features/constants/businessDrop";

export class LoansStore {
    loanName: string = ''
    loansList: LoansDto[] = []
    currentLoan:  LoansDto | undefined = undefined
    writeoffAccount: string = ''
    writeoffAccountList: IDropDownList[] = []
    loanSum: string = ''
    loanPeriod: string = ''
    loanTerm: string = ''
    loanDate: DateTime | null = null
    loanPercent: string = ''
    loanPeriodList: IDropDownList[] = [];
    loanSelectPeriod: string = ''

    depositList: DepositDto[] = []
    currentDeposit: DepositDto | undefined = undefined
    depositName: string = ''
    depositSum: string = ''
    depositTerm: string = ''
    depositPercent: string = ''

    switchParam: string | null = 'Вклады'
    show: boolean = false
    loading: boolean = false

    loan: boolean = false
    deposit: boolean = false

    constructor() {
        makeAutoObservable(this)
        this.setLoanPeriodList()
        makePersistable(this, {
            name: 'LoansStore',
            storage: localforage,
            properties: [
                "loanPeriodList"
            ]
        })
        stopPersisting(this)
    }

    handleClickCurrentLoan = () => {
        this.loan = true
        console.log(this.loan)
    }

    handleClickCurrentDeposit = () => {
        this.deposit = true
    }

    setLoading(bool: boolean){
        this.loading = bool
    }

    setShow = (bool: boolean) => {
        this.show = bool
    }

    setLoanPeriodList(){
        listPeriodPayments.map((item) => {
            this.loanPeriodList.push({content: item.content, id: item.id})
        })
    }

    setWriteOffAccountList(list: Card[]){
        list.map((item) => {
            this.writeoffAccountList.push({content: item.bank_name, id: item.id})
        })
    }

    prepareCurrentLoan = (id: string | undefined) => {
        this.currentLoan = this.loansList.find((item) => item.id === Number(id))
    }

    prepareCurrentDeposit = (id: string | undefined) => {
        this.currentDeposit = this.depositList.find((item) => item.id === Number(id))
    }

    handleCloseForm = () => {
        this.setShow(false)
        this.loanName = ''
        this.loanSum = ''
        this.loanTerm = ''
        this.loanPercent = ''
        this.loanDate = null
        this.loanPeriod = ''
        this.switchParam = 'Вклады'
        this.loanPeriodList = []
    }

    handleChangeSwitchParam = (e: MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.textContent
        this.switchParam = value
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