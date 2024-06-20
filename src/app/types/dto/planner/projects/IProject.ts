import { IListItem } from "../../../planner/IPlanner"

export interface IProjectItemDTO {
    id?: number, 
    name: string,
    description: string,
    date_start: Date,
    date_end: Date, 
    planned_sum: number,
    reserved_sum: number,
    writeoff_account: string//счет списания
}

export interface ITodoDTO {
    user_id?: number,
    date_start: Date,//здесь должен быть формат даты типа dd.mm.yyyy
    date_end: Date,//здесь должен быть формат даты типа dd.mm.yyyy
    title: string,
    description: string, 
    items?: IListItem[],
    expense: number, //расходы
    done: boolean
}