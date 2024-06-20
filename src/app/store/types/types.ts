// import { dataTasks } from "../../../widgets/planner/TasksBlock/AddTaskBlock/data";
import { IAssets } from "../../types/assets/IAssets";
import { IPlannerTask, IPlannerTaskAdd, IPlannerTime, IToDo } from "../../types/planner/IPlanner";


export enum actionTypes {
    GET_ASSETS = 'GET_ASSETS',
    SHOW_LOADER = 'SHOW_LOADER',
    HIDE_LOADER = 'HIDE_LOADER',

    ADD_INCOME = 'ADD_INCOME',
    ADD_EXPENSE = 'ADD_EXPENSE',

    REMOVE_PROPERTY = 'REMOVE_PROPERTY',
    EDIT_PROPERTY = 'EDIT_PROPERTY',
    ADD_PROPERTY = 'ADD_PROPERTY',
    ADD_PROPERTY_INVENTORY = 'ADD_PROPERTY_INVENTORY',

    REMOVE_TRANSPORT = 'REMOVE_TRANSPORT',
    EDIT_TRANSPORT = 'EDIT_TRANSPORT',
    ADD_TRANSPORT = 'ADD_TRANSPORT',

    REMOVE_BUSINESS = 'REMOVE_BUSINESS',
    EDIT_BUSINESS = 'EDIT_BUSINESS',
    ADD_BUSINESS = 'ADD_BUSINESS',

    ADD_VALUABLE = 'ADD_VALUABLE',
    REMOVE_VALUABLE = 'REMOVE_VALUABLE',

    ADD_SECURITIES = 'ADD_SECURITIES',
    REMOVE_SECURITIES = 'REMOVE_SECURITIES',

    ADD_DEPOSIT = 'ADD_DEPOSIT',
    REMOVE_DEPOSIT = 'REMOVE_DEPOSIT',

    SET_DATE_DIARY = 'SET_DATE_DIARY',
    SET_TASKS_DIARY = 'SET_TASKS_DIARY',
    EDIT_DAW_TASK = 'EDIT_DAW_TASK',
    EDIT_DAW_INNER_TASK = 'EDIT_DAW_INNER_TASK',
    SET_PLANNER_TASK_FOR_ADD = 'SET_PLANNER_TASK_FOR_ADD',
    ADD_PLANNER_TASK = 'ADD_PLANNER_TASK',
    REMOVE_PLANNER_TASK = 'REMOVE_PLANNER_TASK',
    GET_TASKS_BY_DATE = 'GET_TASKS_BY_DATE',

};

export interface IStateDiary {
    date: Date,
    currentDateTasks: IPlannerTask[],
    currentTimeArray: IPlannerTime[],
    tasks: IToDo[],
    taskForAdd: IPlannerTaskAdd
}

export interface IStateAssets {
    assets: IAssets | null;
    loading: boolean
};

export interface IAction {
    type: string;
    payload?: any; 
};

export const initialStateAssets: IStateAssets = {
    assets: null,
    loading: false
};


export const initialStateDiary: IStateDiary = {
    date: new Date(),
    currentDateTasks: [],
    currentTimeArray: [],
    tasks: [],
    taskForAdd: {
        steps: {
            step1: false,
            step2: true,
            step3: false,
            step4: false
        },
        task: null
    }
}