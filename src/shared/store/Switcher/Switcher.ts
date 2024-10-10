import { makeAutoObservable } from "mobx"
import { ChangeEvent, MouseEvent } from "react"

export class Switcher {
    category: string = 'Продажа'
    sum: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    changeCategory(value: string){
        this.category = value
    }

    handleChangeButtonValue = (e: MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.textContent
        if(value) {
            this.changeCategory(value)
        }
    }

    handleChangeSaleSum = (e: ChangeEvent<HTMLInputElement>) => {
        this.sum = e.target.value
    }
}
