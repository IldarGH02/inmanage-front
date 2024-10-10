import { makeAutoObservable } from "mobx";
import { IDropDownList } from "../../../app/types/elements/IDropDownList";
import { owners } from "../../../features/constants/owners";
import { paymentsOrder, paymentsPeriod, paymentTypes } from "../../../features/constants/payments";
import { steeringWheel, traponsportBodyTypes } from "../../../features/constants/transportDrop";
import data from '../../data.json'
import banks from '../../banks.json'
import { Card } from "../../../app/types/dto/DtoTypes";
import { ChangeEvent } from "react";

export class TransportStore {
    brand: string = ''
    model: string = ''
    year: string = ''
    body_type: string = ''
    wheel: string = ''
    owner_count: string = ''
    payment_type: string = ''
    horses_power: string = ''   
    loan_term: string = ''
    down_payment: string = ''
    interest_rate: string = ''
    sum: string = ''
    type_funds: string = ''
    loan: boolean = false
    
    // Credit
    bank: string = ''
    writeoff_account: string = ''
    payment_order: string = ''
    payment_period: string = ''

    // Lists
    owner_list: IDropDownList[] = []
    paymentType_list: IDropDownList[] = []
    transportBody_list: IDropDownList[] = []
    wheel_list: IDropDownList[] = []
    year_list: IDropDownList[] = []
    brand_list: IDropDownList[] = []
    model_list: IDropDownList[] = []
    bank_list: IDropDownList[] = []
    payments_order_list: IDropDownList[] = []
    payments_period_list: IDropDownList[] = []
    writeoff_account_list: IDropDownList[] = []

    show: boolean = false
    show_delet: boolean = false;

    //Error's
    brand_error: string = ''
    isError_brand: boolean = false

    model_error: string = ''
    isError_model: boolean = false

    body_type_error: string = ''
    isBody_type_error: boolean = false

    steering_wheel_error: string = ''
    isSteering_wheel_error: boolean = false

    horses_power_error: string = ''
    isHorses_power_error: boolean = false

    year_error: string = ''
    isYear_error: boolean = false

    owner_count_error: string = ''
    isOwner_count_error: boolean = false

    payment_type_error: string = ''
    isPayment_type_error: boolean = false

    down_payment_error: string = ''
    isDown_payment_error: boolean = false

    loan_term_error: string = ''
    isLoan_term_error: boolean = false

    interest_rate_error: string = ''
    isInterest_rate_error: boolean = false

    input_sum_error: string = ''

    constructor(){
        makeAutoObservable(this)
        this.prepareLists()
    }

    checkValidation(){
        if(this.brand !== '') {
            this.isError_brand = false
        } else {
            this.isError_brand = true
            this.brand_error = 'Обязательное поле'
        }

        if(this.body_type !== ''){
            this.isBody_type_error = false
        } else {
            this.isBody_type_error = true
            this.body_type_error = 'Обязательное поле'
        }

        if(this.model !== '') {
            this.isError_model = false
        } else {
            this.isError_model = true
            this.model_error = 'Обязательное поле'
        }

        if(this.wheel !== ''){
            this.isSteering_wheel_error = false
        } else {
            this.isSteering_wheel_error = true
            this.steering_wheel_error = 'Обязательное поле'
        }

        if(this.horses_power !== ''){
            this.isHorses_power_error = false
        } else {
            this.isHorses_power_error = true
            this.horses_power_error = 'Обязательное поле'
        }
        
        if(this.year !== '') {
            this.isYear_error = false
        } else {
            this.isYear_error = true
            this.year_error = 'Обязательное поле'
        }

        if(this.owner_count !== '') {
            this.isOwner_count_error = false
        } else {
            this.isOwner_count_error = true
            this.owner_count_error = 'Обязательное поле'
        }

        if(this.payment_type) {
            this.isPayment_type_error = false
        } else {
            this.isPayment_type_error = true
            this.payment_type_error = 'Обязательное поле'
        }

        if(this.down_payment.length > 0) {
            this.isDown_payment_error = false
        } else {
            this.isDown_payment_error = true
            this.down_payment_error = 'Обязательное поле'
        }

        if(this.loan_term.length > 0) {
            this.isLoan_term_error = false
        } else {
            this.isLoan_term_error = true
            this.loan_term_error = 'Обязательное поле'
        }

        if(this.interest_rate.length > 0) {
            this.isInterest_rate_error = false
        } else {
            this.isInterest_rate_error = true
            this.interest_rate_error = 'Обязательное поле'
        }
    }

    setError = (error: string) => {
        this.input_sum_error = error
    }

    setLoan = (bool: boolean) => {
        this.loan = bool
    }

    setShow = (bool: boolean) => {
        this.show = bool
    }

    setShowDelete = (bool: boolean) => {
        this.show_delet = bool
    }

    handleCloseModalForm = () => {
        this.setShow(false)
    }

    setWriteOffAccountList = (list: Card[]) => {
        list.map((item) => {
            this.writeoff_account_list.push({content: item.bank_name, id: item.id})
        })
    }

    prepareLists(){
        this.owner_list = owners
        this.paymentType_list = paymentTypes
        this.transportBody_list = traponsportBodyTypes
        this.wheel_list = steeringWheel
        this.payments_order_list = paymentsOrder
        this.payments_period_list = paymentsPeriod

        let date_id = 1;
        let id = 0;

        for(let i = new Date().getFullYear(); i >= 1900; i--) {
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

    prepareModelList = (brand: string) => {
        let id = 0;
            //@ts-ignore
        data[brand].models.map((model: string) => {
            id++
            const car_model: IDropDownList = {
                content: model,
                id: id
            }
            this.model_list.push(car_model)
        })
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

    handleChangeHorsesPower = (e: ChangeEvent<HTMLInputElement>) => {
        this.horses_power = e.target.value
    }

    handleChangeWriteoffAccount = (value: string) => {
        this.writeoff_account = value
    }

    handleChangeBank = (value: string) => {
        this.bank = value
    }

    handleChangeLoanTerm = (e: ChangeEvent<HTMLInputElement>) => {
        this.loan_term = e.target.value
    }

    handleChangeDownPayment = (e: ChangeEvent<HTMLInputElement>) => {
        this.down_payment = e.target.value
    }

    handleChangeInterestRate = (e: ChangeEvent<HTMLInputElement>) => {
        this.interest_rate = e.target.value
    }

    handleChangePaymentOrder = (value: string) => {
        this.payment_order = value
    }

    handleChangePaymentPeriod = (value: string) => {
        this.payment_period = value
    }

    handleChangeSum = (e: ChangeEvent<HTMLInputElement>) => {
        this.sum = e.target.value
    }

    handleChangeTypeFund = (value: string) => {
        this.type_funds = value
    }
}