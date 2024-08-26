import { makeAutoObservable } from "mobx";
import {IIncome, IIncomeBalance, Work} from "../../types/balance/IBalance.ts";
import BalanceService from "../../../shared/http/balance";


export class IncomeStore {
    jobList: Work[] | null = null;
    isLoading: boolean = false;
    error: unknown | null = null;


    constructor(){
        makeAutoObservable(this);
    }

    setJobList(jobList: Work[]) {
        this.jobList = jobList;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setError(error: unknown) {
        this.error = error;
    }

    async createNewWork(name: string, param: string | null, funds: number, comment: string) {
        this.setLoading(true)
        try {
            const project = param ? param : null;
            const response = await BalanceService.createWork(name, project, funds, comment)
            if(response && response.data){
                this.setLoading(false)
                return response.data
            }
        } catch (error) {
            this.setError('Error.tsx: ' + error);
            this.setLoading(false)
        }
    }

    async fetchJobList() {
        this.setLoading(true)
        const response = await BalanceService.fetchWorks()
        if(response) {
            // this.setJobList(response);
            this.setLoading(false)
        } else {
            this.setError(response)
            this.setLoading(false)
        }
    }

    async createNewIncome(object: IIncome){
        this.setLoading(true)
        try {
            const response = await BalanceService.createIncome(object)
            if(response && response.data){
                this.setLoading(false)
                return response.data
            } else {
                this.setError(response)
            }
        } catch(e){
            this.setLoading(false)
            this.setError('Error.tsx: ' + e)
        }
    }

    async updateActivesIncome(param: string, id: number | null, objIncome: IIncomeBalance[]){
        this.setLoading(true)
        try {
            const response = await BalanceService.updateActivesIncome(param, id, objIncome)
            if(response && response.data){
                this.setLoading(false)
                return response
            }
        } catch(e) {
            this.setError(e)
        }
    }
}