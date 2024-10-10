import { DateTime } from "luxon";
import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { IDropDownList } from "../../../app/types/elements/IDropDownList";
import { listPeriodPayments } from "../../../features/constants/businessDrop";
import { paymentsOrder } from "../../../features/constants/payments";
import { creditPaymentPeriod } from "../../../features/constants/businessDrop";
import { Card } from "../../../app/types/dto/DtoTypes";

export class BusinessCreate {
    cardList: Card[] | null = [] 
    cardsList: IDropDownList[] = []
    paymentsPeriodList: IDropDownList[] = []
    paymentsOrderList: IDropDownList[] = []
    creditPaymentPeriodList: IDropDownList[] = []
    balance_cardList: Card[] | null = []

    name: string = ''
    address: string = ''
    equityPercentage: string = '';

    //* Состояния чекбоксов *//
    ownFundsCheckbox: boolean = false;
    investmentCheckbox: boolean = false;
    creditCheckbox: boolean = false;

    //* Собственные средства *//
    writeoffAccount: string = '';
    ownFunds: string = '';

    //* Инвестиции *//
    creditSum: string = '';
    loanTerm: string = '';
    loanDate: DateTime | null = null;
    percent: string = '';
    paymentsPeriod: string = '';

    //* Кредит *//
    loanAmount: string = '';
    loanTerms: string = '';
    creditDate: DateTime | null = null;
    interestRate: string = '';
    paymentsOrder: string = '';
    creditPeriod: string = ''


    constructor() {
        makeAutoObservable(this)
    }

    setCardList(cards: Card[] | null){
        this.cardList = cards
    }

    createNewLists(){
        let id = 0;

        this.cardList?.map((item) => {
            this.cardsList.push({content: item.bank_name, id: item.id})
        })

        listPeriodPayments.map((item) => {
            id++
            this.paymentsPeriodList.push({content: item.content, id: id})
        })

        paymentsOrder.map((item) => {
            id++
            this.paymentsOrderList.push({content: item.content, id: id})
        })

        creditPaymentPeriod.map((item) => {
            id++
            this.creditPaymentPeriodList.push({content: item.content, id: id})
        })
    }

    handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        this.name = value
    }

    handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        this.address = value
    }

    handleChangeEquityPercentage = (value: string) => {
        this.equityPercentage = value
    }

    //* Состояния чекбоксов *//
    handleChangeOwnFundCheckbox = (bool: boolean) => {
        this.ownFundsCheckbox = bool
    }

    handleChangeInvestmentCheckbox = (bool: boolean) => {
        this.investmentCheckbox = bool
    }

    handleChangeCreditCheckbox = (bool: boolean) => {
        this.creditCheckbox = bool
    }

    //* Собственные средства *//
    handleChangeWriteoffAccount = (id: string) => {
        this.writeoffAccount = id
    }

    handleChangeOwnFund = (e: ChangeEvent<HTMLInputElement>) => {
        this.ownFunds = e.target.value
    }

    //* Инвестиции *//
    handleChangeCreditSum = (e: ChangeEvent<HTMLInputElement>) => {
        this.creditSum = e.target.value
    }

    handleChangeLoanTerm = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        this.loanTerm = value
    }

    handleChangeLoanDate = (date: DateTime) => {
        this.loanDate = date
    }

    handleChangePercent = (value: string) => {
        this.percent = value
    }

    handleChangePaymentsPeriod = (value: string) => {
        this.paymentsPeriod = value
    }

    //* Кредит *//
    handleChangeLoanAmount = (e: ChangeEvent<HTMLInputElement>) => {
        this.loanAmount = e.target.value
    }

    handleChangeLoanTerms = (e: ChangeEvent<HTMLInputElement>) => {
        this.loanTerms = e.target.value
    }

    handleChangeCreditDate = (date: DateTime) => {
        this.creditDate = date
    }

    handleChangeInterestRate = (value: string) => {
        this.interestRate = value
    }

    handleChangePaymentsOrder = (value: string) => {
        this.paymentsOrder = value
    }

    handleChangeCreditPeriod = (value: string) => {
        this.creditPeriod = value
    }
}