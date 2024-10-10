import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { IDropDownList } from "../../../app/types/elements/IDropDownList";
import { immovablesTypes, paymentsOrder, paymentsPeriod } from "../../../features/constants/payments";
import { DateTime } from "luxon";
import { balcony_existence, construction_list, facing_list, rooms_list } from "../../../features/constants/immovables";
import { Card } from "../../../app/types/dto/DtoTypes";
import { ImmovablesRequestCash, ImmovablesRequestLoan } from "../../../app/types/request/requestTypes";
import { ImmovablesService } from "../../http/actives/immovable";
import { discharge, checkFloorsLength} from "./prepareFunctions";

export class ImmovablesStore {
    //main
    immovables_name: string = '';
    city: string = '';
    street: string = '';
    home: string = '';
    rooms: string = '';
    floors: string = '';
    facing: string = '';
    construction: string = '';
    balcony_value: string = '';
    balcony: boolean = false;

    payment_type: string = '';
    bought_price: string = '';
    payments_type_list: IDropDownList[] = [];
    facing_list: IDropDownList[] = [];
    construction_list: IDropDownList[] = [];
    balcony_existence: IDropDownList[] = [];
    payment_order_list: IDropDownList[] = [];
    payment_period_list: IDropDownList[] = [];
    writeoff_account_list: IDropDownList[] = []
    rooms_list: IDropDownList[] = []

    //Credit
    initial_payment: string = '';
    first_payment_date: DateTime | null = null;
    loan: boolean = false;
    loan_term: string = '';
    interest_rate: string = '';
    payment_order: string = '';
    payment_period: string = '';
    writeoff_account: string = '';

    //common_set
    show: boolean = false;
    disabled: boolean = true;

    constructor(){
        makeAutoObservable(this)
        this.prepareLists()
        this.checkToDisabledButton()
    }

    prepareLists = () => {
        this.payments_type_list = immovablesTypes
        this.facing_list = facing_list;
        this.construction_list = construction_list;
        this.balcony_existence = balcony_existence;
        this.payment_order_list = paymentsOrder;
        this.payment_period_list = paymentsPeriod;
        this.rooms_list = rooms_list
    }

    checkToDisabledButton(){
        if(
            this.immovables_name.length > 0 &&
            this.city.length > 0 &&
            this.street.length > 0 &&
            this.home.length > 0 &&
            this.rooms.length > 0 &&
            this.floors.length > 0 &&
            this.facing.length > 0 &&
            this.construction.length > 0 &&
            this.balcony_value.length > 0
        ) {
            this.disabled = false
        } else {
            this.disabled = true
        }

        if(this.loan) {
            if(
                this.immovables_name.length > 0 &&
                this.city.length > 0 &&
                this.street.length > 0 &&
                this.home.length > 0 &&
                this.rooms.length > 0 &&
                this.floors.length > 0 &&
                this.facing.length > 0 &&
                this.construction.length > 0 &&
                this.balcony_value.length > 0 &&
                this.loan_term.length > 0 &&
                this.bought_price.length > 0 &&
                this.initial_payment.length > 0 &&
                this.first_payment_date === null &&
                this.payment_order.length > 0 &&
                this.payment_period.length > 0 &&
                this.writeoff_account.length > 0
            ) {
                this.disabled = false
            } else {
                this.disabled = true
            }
        }
    }

    prepareWriteoffAccount = (list: Card[]) => {
        list.map((item) => {
            this.writeoff_account_list.push({
                content: item.bank_name,
                id: item.id
            })
        })
    }

    setShow = (bool: boolean) => {
        this.show = bool
    }

    setLoan = (bool: boolean) => {
        this.loan = bool
    }

    handleCloseForm = () => {
        this.setShow(false)
        this.immovables_name = '';
        this.city = '';
        this.street = '';
        this.home = '';
        this.rooms = '';
        this.floors = '';
        this.facing = '';
        this.construction = '';
        this.balcony_value = '';
        this.balcony = false;

        this.payment_type = '';
        this.bought_price = '';
        this.payments_type_list = [];
        this.facing_list = [];
        this.construction_list = [];
        this.balcony_existence = [];
        this.payment_order_list = [];
        this.payment_period_list = [];
        this.writeoff_account_list = []

        //Credit
        this.initial_payment = '';
        this.first_payment_date = null;
        this.loan = false;
        this.loan_term = '';
        this.interest_rate = '';
        this.payment_order = '';
        this.payment_period = '';
        this.writeoff_account = '';
        
    }

    handleChangeImmovablesName = (e: ChangeEvent<HTMLInputElement>) => {
        this.immovables_name = e.target.value
    }

    handleChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
        this.city = e.target.value
    }

    handleChangeStreet = (e: ChangeEvent<HTMLInputElement>) => {
        this.street = e.target.value
    }

    handleChangeHome = (e: ChangeEvent<HTMLInputElement>) => {
        this.home = e.target.value
    }

    handleChangeRooms = (value: string) => {
        this.rooms = value
    }

    handleChangeFloors = (e: ChangeEvent<HTMLInputElement>) => {
        this.floors = checkFloorsLength(e.target.value)
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

    handleChangePaymentType = (value: string) => {
        this.payment_type = value
    }

    handleChangeBoughtPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.target.value;

        if(this.bought_price == '0' && currentValue[1]) {
            this.bought_price = discharge(currentValue[1])
        } else {
            this.bought_price = discharge(e.currentTarget.value)
        }

        this.bought_price = discharge(e.currentTarget.value)
    }

    handleChangeInitialPayment = (e: ChangeEvent<HTMLInputElement>) => {
        this.initial_payment = e.target.value
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

    handleChangeLoanTerm = (e: ChangeEvent<HTMLInputElement>) => {
        this.loan_term = e.target.value
    }

    handleChangeInterestRate = (value: string) => {
        this.interest_rate = value
    }

    handleChangeWriteoffAccount = (value: string) => {
        this.writeoff_account = value
    }

    createImmovables(immovables: ImmovablesRequestLoan | ImmovablesRequestCash){
        return ImmovablesService.createImmovable(immovables)
    }

    removeImmovables(id: string){
        return ImmovablesService.deleteImmovable(id)
    }
}