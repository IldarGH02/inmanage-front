import { makeAutoObservable } from "mobx";
import { ChangeEvent, FormEvent } from "react";
import { SecurititesRequest } from "../../../app/types/request/requestTypes";
import { SecuritiesService } from "../../http/actives/securitites";
import { Card } from "../../../app/types/dto/DtoTypes";
import { IDropDownList } from "../../../app/types/elements/IDropDownList";
import { prepareSecurities } from "./prepareSecurities";
import { ISecuritiesData } from "../../../app/types/actives/securities/securitiesTypes";

export class SecuritiesStore {
    name: string = ''
    broker: string = ''
    writeoff_account: string = '' //  счёт списания определяет по ID
    securities_list: ISecuritiesData[] | null = null
    cost: string = ''
    count: string = ''
    market_price: string = ''
    card_list: Card[] | null = null
    cards: IDropDownList[] = []
    securities: IDropDownList[] = []
    local_securities: IDropDownList[] = []
    selectWriteOffAccount: string = ''
    current_securities: ISecuritiesData | undefined = undefined
    price: number | undefined = undefined
    show: boolean = false
    loading: boolean = false
    reload: boolean = false

    constructor(){
        makeAutoObservable(this)
    }

    getCurrentPrice = (id: string) => {
        if(this.securities_list) {
            this.current_securities = this.securities_list?.find((item) => item.id === Number(id))
            console.log(this.current_securities)
            this.price = this.current_securities?.market_price
        }
    }

    createNewLists = () => {
        let secuirities_list: IDropDownList[] = [];

        this.card_list?.map((item) => {
            this.cards.push({content: item.bank_name, id: item.id})
        });

        const data = JSON.parse(localStorage.getItem('securities')!);
        this.securities_list = data;
        
        data.map((item: ISecuritiesData) => {
            secuirities_list.push({content: item.name, id: item.id})
        });

        this.local_securities = secuirities_list
    }

    setCardList(list: Card[]){
        this.card_list = list
    }

    setShow = (bool: boolean) => {
        this.show = bool
    }

    setLoading(bool: boolean){
        this.loading = bool
    }

    setReload(bool: boolean){
        this.reload = bool
    }

    setSecuritiesList(list: ISecuritiesData[]) {
        this.securities_list = list
    }

    handleSubmitForm = (e: FormEvent) => {
        e.preventDefault()
        
        const securities = prepareSecurities(
            this.name,
            this.broker,
            this.cost,
            this.count,
            this.price
        )

        const response = this.createSecuritiesItem(securities)
        this.setLoading(true)
        response.then(res => {
            if(res.status >= 200 && res.status < 300) {
                this.setLoading(false)
                this.handleCloseForm()
            }
        })
    }

    handleChangeName = (value: string) => {
        this.name = value
    }

    handleChangeBroker = (value: string) => {
        this.broker = value
    }

    handleChangeCost = (value: string) => {
        this.cost = value
    }

    handleChangeCount = (value: ChangeEvent<HTMLInputElement>) => {
        this.count = value.target.value
    }

    handleChangeMarketPrice = (e: ChangeEvent<HTMLInputElement>) => {
        this.market_price = e.target.value
    }

    handleChangeWriteoffAccount = (value: string) => {
        this.writeoff_account = value
    }

    createSecuritiesItem = (securities: SecurititesRequest) => {
        return SecuritiesService.createSecurities(securities)
    }

    handleCloseForm = () => {
        this.setShow(false)
        this.name = ''
        this.broker = ''
        this.cost = ''
        this.count = ''
        this.market_price = ''
        this.writeoff_account = ''
        this.price = 0
    }

    handleClickSubmit = () => {
        this.setShow(false)
    }

    async fetchSecurities(){
        return await SecuritiesService.getSecurities()
    }
}