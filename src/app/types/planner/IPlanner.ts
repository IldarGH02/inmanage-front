// export interface IToDo {
//     id: number,
//     user_id: number,
//     date: string,
//     title: string,
//     startTime?: string,
//     endTime: string,
//     description: string, 
//     descList?: IListItem[],
//     expense: number, //расходы
//     done: boolean
// }

interface Steps {
    step1: boolean,
    step2: boolean,
    step3: boolean,
    step4: boolean,
}

export interface IPlannerTaskAdd {
    steps: Steps,
    task: IPlannerTask | null
}


export interface IPlannerTime {
    time: string,
    active: boolean,
    arrTasks: IPlannerTask[]
}

export interface IPlannerTask {
    id?: number,
    user?: number,
    project?: number,
    title: string,
    description: string, 
    date_start: Date,//здесь должен быть формат даты типа dd.mm.yyyy
    date_end: Date,//здесь должен быть формат даты типа dd.mm.yyyy
    desc_list: IListItem[] | null,
    expenses?: number | null, //расходы
    color: string,
    done: boolean
}

export interface IPlannerProject {
    id: number,
    user: number,
    // done: boolean,
    name: string,
    description: string,
    date_start: Date,
    date_end: Date, 
    planned_sum: number,
    spent_sum: number,
    reserved_sum: number,
    writeoff_account: string,//счет списания
    tasks_list: IPlannerTask
}

// export interface ITaskList {
//     id?: number,
//     user?: number,
//     project?: number,
//     title: string,
//     description: string, 
//     date_start: Date,//здесь должен быть формат даты типа dd.mm.yyyy
//     date_end: Date,//здесь должен быть формат даты типа dd.mm.yyyy
//     desc_list: IListItem[] | null,
//     expenses?: number | null, //расходы
//     done: boolean
// }

export interface IListItem {
    id: number,
    text: string, 
    done: boolean
}

// export interface IImportantToday {
//     id: number,
//     user_id: number,
//     date: string,
//     title: string,
//     endTime: string,
//     expense: number,
//     description: string, 
//     done: boolean
// }

// export interface IProject {
//     id: number,
//     user_id: number,
//     name: string,
//     description: string,
//     date_start: string,
//     date_end: string, 
// }

export interface IToDo {
    id?: number,
    user_id?: number,
    project?: number,
    date_start?: Date,//здесь должен быть формат даты типа dd.mm.yyyy
    date_end: Date,//здесь должен быть формат даты типа dd.mm.yyyy
    title: string,
    // start_time?: string,
    // end_time: string,
    description: string, 
    desc_list?: IListItem[],
    // items?: IListItem[],
    expense?: number, //расходы
    done: boolean
}

export interface IProjectInner {
    id: number,
    user_id: number,
    project_id?: number,
    date_start?: Date,//здесь должен быть формат даты типа dd.mm.yyyy
    date_end: Date,//здесь должен быть формат даты типа dd.mm.yyyy
    title: string,
    // start_time?: string,
    // end_time: string,
    description: string, 
    desc_list?: IListItem[],
    items?: IListItem[],
    expense?: number, //расходы
    done: boolean
}

export interface IProject {
    id: number,
    user_id: number,
    name: string,
    description: string,
    date_start: Date,
    date_end: Date, 
    planned_sum: number,
    spent_sum: number,
    reserved_sum: number,
    writeoff_account: string//счет списания
}