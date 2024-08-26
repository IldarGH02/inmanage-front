import data from '../../shared/data.json'
import banks from '../../shared/banks.json'
import {IDropDownList} from "../../app/types/elements/IDropDownList.ts";

export interface ICarList {
    content: string
    id: number
}

export const getCarsBrand = () => {
    const carsBrand: ICarList[] = []
    let id = 0;
    for(const elem in data) {
        id++
        const car: ICarList = {
            //@ts-ignore
            content: data[`${elem}`].name,
            id: id
        }
        carsBrand.push(car)
    }
    return carsBrand

}

export const getModelList = (brand: string) => {
    const modelList: ICarList[] = []
    let id = 0;
    if(brand) {
        //@ts-ignore
        data[brand].models.map((model: string) => {
            id++
            const carModel: ICarList = {
                content: model,
                id: id
            }
            modelList.push(carModel)
        })
    }
    return modelList
}

export const getBankList = () => {
    const parsBankList: IDropDownList[] = []
    let id = 0;
    for(const elem in banks) {
        id++
        const bank = {
            //@ts-ignore
            content: banks[`${elem}`].name,
            id: id
        }
        parsBankList.push(bank)
    }
    return parsBankList
}