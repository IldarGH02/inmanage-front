import { makeAutoObservable } from 'mobx'
import {
    Actives,
    // IActives,
    RequestBodyTransport,
    typeAssets,
    typeLiabilities
} from "../types/actives/ActivesTypes.ts";
import {AssetsService} from "../../shared/http/actives";
import {IExpenseBalance} from "../types/balance/IBalance.ts";
import {TransportService} from "../../shared/http/actives/transport";
import { BusinessRequest } from '../types/actives/business/BusinessTypes.ts';
import { BusinessService } from '../../shared/http/actives/business/index.ts';
import { makePersistable, stopPersisting } from "mobx-persist-store";
import localforage from "localforage"
import { DepositDto, Lists } from '../types/dto/DtoTypes.ts';

export class ActivesStore {
    actives: Actives | null = null;
    error: string | unknown = null;
    expenseObject: IExpenseBalance | null = null;
    loading: boolean = false;
    list: Lists | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'ActivesStore',
            storage: localforage,
            properties: [
                            'actives',
                            'loading'
                        ],
            }
        )
        stopPersisting(this)
        this.fetchActives()
    }

    setActives(actives: Actives) {
        this.actives = actives
    }

    setError(error: unknown) {
        this.error = error
    }

    setLoading(loading: boolean){
        this.loading = loading
    }

    setExpenseObject(expense: IExpenseBalance) {
        this.expenseObject = expense
    }

    //request's to api

    async fetchActives(){
        return await AssetsService.fetchActives()
    }

    async updateAssetsExpense(typeAssets: typeAssets, id: number, objExpense: IExpenseBalance[]) {
        const response = await AssetsService.updateActivesExpense(typeAssets, id, objExpense)
        if(response.status >= 200 && response.status < 300) {
            return response.data
        }
    }

    createExpenseLiabilities(expenseObj: IExpenseBalance) {
        this.setExpenseObject(expenseObj)
    }

    updateLiabilitiesExpense(typeLiabilities: typeLiabilities, id: number, objExpense: IExpenseBalance[]){
        return AssetsService.updateLiabilitiesExpense(typeLiabilities, id, objExpense)
    }

    async createTransport(transport: RequestBodyTransport){
        return await TransportService.createTransport(transport)
    }

    async deleteTransport(id: number) {
        return await TransportService.removeTransport(id)
    }

    async editTransport(id: number, transport: RequestBodyTransport) {
        return await TransportService.editTransport(id, transport)
    }

    async createBusiness(business: BusinessRequest){
        return await BusinessService.createBusiness(business)
    }

    async changeBusiness(id: string){
        return await BusinessService.changeBusiness(id)
    }

    async removeBusiness(id: string){
        return await BusinessService.deleteBusiness(id)
    }
}