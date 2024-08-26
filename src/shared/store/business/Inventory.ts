import { makeAutoObservable } from "mobx";

export class InventoryStore {
    
    constructor(){
        makeAutoObservable(this)
    }
}