import { DateTime } from "luxon"
import { FormEvent } from "react";
import { checkFloorsLength } from "../store/immovables/prepareFunctions";
import { makeAutoObservable } from "mobx";

export class ImmovablesValidation {
    immovables_name: string = '';
    city: string = '';
    street: string = '';
    home: string = '';
    rooms: string = '';
    floors: string = '';
    facing: string = '';
    construction: string = '';
    balcony: boolean = false
    balcony_value: string = ''
    initial_payment: string = '';
    first_payment_date: DateTime | null = null;
    loan: boolean | null = null;
    bougth_price: string = ''
    loan_term: string = '';
    interest_rate: string = '';
    payment_order: string = '';
    payment_period: string = '';
    writeoff_account: string = '';

    immovables_error: string | null = null;
    city_error: string | null = null;
    street_error: string | null = null;
    home_error: string | null = null;
    rooms_error: string | null = null;
    floors_error: string | null = null;
    facing_error: string | null = null;
    bougth_price_error: string | null = null;
    construction_error: string | null = null;
    balcony_error: string | null = null;
    initial_payment_error: string | null = null;
    first_payment_date_error: string | null = null;
    loan_term_error: string | null = null;
    interest_rate_error: string | null = null;
    payment_order_error: string | null = null;
    payment_period_error: string | null = null;
    writeoff_account_error: string | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    handleChangeImmovablesName = (value: string) => {
        this.immovables_name = value
    }

    handleChangeCity = (value: string) => {
        this.city = value
    }

    handleChangeStreet = (value: string) => {
        this.street = value
    }

    handleChangeHome = (value: string) => {
        this.home = value
    }

    handleChangeRooms = (value: string) => {
        this.rooms = value
    }

    handleChangeFloors = (value: string) => {
        this.floors = checkFloorsLength(value)
    }

    handleChangeFacing = (value: string) => {
        this.facing = value
    }

    handleChangeConstruction = (value: string) => {
        this.construction = value
    }

    handleChangeBalconyValue = (value: string) => {
        this.balcony_value = value
    }

    handleChangeBalcony = (bool: boolean) => {
        this.balcony = bool
    }

    handleChangeBoughtPrice = (value: string) => {
       this.bougth_price = value;
    }

    handleChangeLoan = (value: boolean | null) => {
        this.loan = value
    }

    handleChangeInitialPayment = (value: string) => {
        this.initial_payment = value
    }

    handleChangePaymentOrder = (value: string) => {
        this.payment_order = value;
    }

    handleChangePaymentPeriod = (value: string) => {
        this.payment_period = value;
    }

    handleChangeDate = (date: DateTime | null) => {
        this.first_payment_date = date
    }

    handleChangeLoanTerm = (value: string) => {
        this.loan_term = value
    }

    handleChangeInterestRate = (value: string) => {
        this.interest_rate = value
    }

    handleChangeWriteoffAccount = (value: string) => {
        this.writeoff_account = value
    }

    immovablesValidation = (e: FormEvent) => {
        const minTextLength = 3;
        const maxTextLength = 20;

        if(
            this.immovables_error &&
            this.city_error &&
            this.street_error &&
            this.home_error &&
            this.floors_error &&
            this.facing_error &&
            this.rooms_error &&
            this.construction_error &&
            this.balcony_error &&
            this.initial_payment_error &&
            this.first_payment_date_error &&
            this.loan_term_error &&
            this.interest_rate_error &&
            this.payment_order_error &&
            this.payment_period_error &&
            this.writeoff_account_error
        ) {
            e.preventDefault()
        }

        if(this.immovables_name) {
            if(this.immovables_name.length === 0){
                this.immovables_error = 'Обязательное поле'

                if(this.immovables_name.length < minTextLength) {
                    this.immovables_error = 'Не менее 3-х символов'
                }
        
                if(this.immovables_name.length > maxTextLength) {
                   this.immovables_error = 'Не более 20-ти символов'
                }
            }
        }

        if(this.city) {
            if(this.city.length === 0){
                this.city_error = 'Обязательное поле'

                if(this.city.length < minTextLength) {
                    this.city_error = 'Не менее 3-х символов'
                }
        
                if(this.city.length > maxTextLength) {
                    this.city_error = 'Не более 20-ти символов'
                }
            }
        }

        if(this.street) {
            if(this.street.length === 0){
                this.street_error = 'Обязательное поле'

                if(this.street.length < minTextLength) {
                    this.street_error = 'Не менее 3-х символов'
                }
        
                if(this.street.length > maxTextLength) {
                    this.street_error = 'Не более 20-ти символов'
                }
            }
        }

        if(this.home) {
            if(this.home.length === 0){
                this.home_error = 'Обязательное поле'

                if(this.home.length < 1) {
                    this.home_error = 'Не менее 1-го символов'
                }
        
                if(this.home.length > 3) {
                    this.home_error = 'Не более 3-х символов'
                }
            }
        }

        if(this.floors) {
            if(this.floors.length === 0){
                this.floors_error = 'Обязательное поле'
            } else {
                this.floors_error = null
            }
        }

        if(this.facing) {
            if(this.facing.length === 0){
                this.facing_error = 'Обязательное поле'
            } else {
                this.facing_error = null
            }
        }

        if(this.rooms) {
            if(this.rooms.length === 0){
                this.rooms_error = 'Обязательное поле'
            } else {
                this.rooms_error = null
            }
        }

        if(this.balcony_value) {
            if(this.balcony_value.length === 0){
                this.balcony_error = 'Обязательное поле'
            } else {
                this.balcony_error = null
            }
        }

        if(this.construction) {
            if(this.construction.length === null){
                this.construction_error = 'Обязательное поле'
            } else {
                this.construction_error = null
            }
        }

        if(this.initial_payment) {
            if(this.initial_payment.length === 0) {
                this.initial_payment_error = 'Обязательное поле'
            } else {
                this.initial_payment_error = ''
            }
        }

        if(this.loan) {
            if(this.first_payment_date) {
                if(this.first_payment_date === null){
                    this.first_payment_date_error = 'Обязательное поле'
                } else {
                    this.first_payment_date_error = null
                }
            }

            if(this.loan_term) {
                if(this.loan_term.length === 0){
                    this.loan_term_error = 'Обязательное поле'
                } else {
                    this.loan_term_error = null
                }
            }
        
            if(this.interest_rate) {
                if(this.interest_rate.length === 0){
                    this.interest_rate_error = 'Обязательное поле'
                } else {
                    this.interest_rate_error = null
                }
            }
        
            if(this.payment_order) {
                if(this.payment_order.length === 0){
                    this.payment_order_error = 'Обязательное поле'
                } else {
                    this.payment_order_error = null
                }
            }
        
            if(this.payment_period) {
                if(this.payment_period.length === 0){
                    this.payment_period_error = 'Обязательное поле'
                } else {
                    this.payment_period_error = null
                }
            }
        
            if(this.writeoff_account) {
                if(this.writeoff_account.length === 0){
                    this.writeoff_account_error = 'Обязательное поле'
                } else {
                    this.writeoff_account_error = null
                }
            }
        }
    }
}

