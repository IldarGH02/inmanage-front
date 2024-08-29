import { makeAutoObservable } from "mobx";
import { IDropDownList } from "../../../app/types/elements/IDropDownList";
import { owners } from "../../../features/constants/owners";
import { paymentTypes } from "../../../features/constants/payments";
import { steeringWheel, traponsportBodyTypes } from "../../../features/constants/transportDrop";
import data from '../../data.json'
import banks from '../../banks.json'

export class TransportStore {
    brand: string = ''
    model: string = ''
    year: string = ''
    body_type: string = ''
    wheel: string = ''
    owner_count: string = ''
    payment_type: string = ''
    horses_power: string = ''
    writeoff_account: string = ''
    bank: string = ''
    loan_term: string = ''
    down_payment: string = ''
    interest_rate: string = ''
    payment_order: string = ''
    payment_period: string = ''
    sum: string = ''
    type_funds: string = ''

    owner_list: IDropDownList[] = []
    paymentType_list: IDropDownList[] = []
    transportBody_list: IDropDownList[] = []
    wheel_list: IDropDownList[] = []
    year_list: IDropDownList[] = []
    brand_list: IDropDownList[] = []
    model_list: IDropDownList[] = []
    bank_list: IDropDownList[] = []

    constructor(){
        makeAutoObservable(this)
    }

    checkValidation(){

    }

    prepareLists(){
        this.owner_list = owners
        this.paymentType_list = paymentTypes
        this.transportBody_list = traponsportBodyTypes
        this.wheel_list = steeringWheel

        let date_id = 1;
        let id = 0;

        for(let i = new Date().getFullYear(); i < 1900; i--) {
            this.year_list.push({content: String(i), id: date_id})
            date_id++
        }

        for(const elem in data) {
            id++
            const transport: IDropDownList = {
                //@ts-ignore
                content: data[`${elem}`].name,
                id: id
            }
            this.brand_list.push(transport)
        }

        if(this.brand) {
            //@ts-ignore
            data[this.brand].models.map((model: string) => {
                id++
                const car_model: IDropDownList = {
                    content: model,
                    id: id
                }
                this.model_list.push(car_model)
            })
        }

        for(const elem in banks) {
            id++
            const bank: IDropDownList = {
                //@ts-ignore
                content: banks[`${elem}`].name,
                id: id
            }
            this.bank_list.push(bank)
        }
    }

    handleChangeBrand = (value: string) => {
        this.brand = value
    }

    handleChangeModel = (value: string) => {
        this.model = value
    }

    handleChangeYear = (value: string) => {
        this.year = value
    }

    handleChangeBodyType = (value: string) => {
        this.body_type = value
    }

    handleChangeWheel = (value: string) => {
        this.wheel = value
    }

    handleChangeOwnerCount = (value: string) => {
        this.owner_count = value
    }

    handleChangePaymentType = (value: string) => {
        this.payment_type = value
    }

    handleChangeHorsesPower = (value: string) => {
        this.horses_power = value
    }

    handleChangeWriteoffAccount = (value: string) => {
        this.writeoff_account = value
    }

    handleChangeBank = (value: string) => {
        this.bank = value
    }

    handleChangeLoanTerm = (value: string) => {
        this.loan_term = value
    }

    handleChangeDownPayment = (value: string) => {
        this.down_payment = value
    }

    handleChangeInterestRate = (value: string) => {
        this.interest_rate = value
    }

    handleChangePaymentOrder = (value: string) => {
        this.payment_order = value
    }

    handleChangePaymentPeriod = (value: string) => {
        this.payment_period = value
    }

    handleChangeSum = (value: string) => {
        this.sum = value
    }

    handleChangeTypeFund = (value: string) => {
        this.type_funds = value
    }
}