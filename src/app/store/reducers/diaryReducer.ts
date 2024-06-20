import { IPlannerTask, IPlannerTaskAdd } from "../../types/planner/IPlanner"
import { IAction, actionTypes, initialStateDiary } from "../types/types"

function bblSortDate(arr: IPlannerTask[]) { 
    for (let i = 0; i < arr.length; i++) {   
        for (let j = 0; j < (arr.length - i - 1); j++) { 
            if (arr[j].date_start > arr[j + 1].date_start) { 
                let temp = arr[j] 
                arr[j] = arr[j + 1] 
                arr[j + 1] = temp 
            } 
        } 
    } 
}

function checkDate(dt1: Date, dt2: Date, dt: Date) {
    if(dt>=dt1 && dt<=dt2) {
        return true
    }
    return false
}

export const diaryReducer = (state = initialStateDiary, action: IAction) => {
    switch(action.type) {

        case actionTypes.SET_DATE_DIARY: {
            let date = action.payload.date
            return { ...state, date }
        }

        case actionTypes.SET_PLANNER_TASK_FOR_ADD: {
            return { ...state,  taskForAdd: action.payload.task }
        }

        case actionTypes.REMOVE_PLANNER_TASK: {
            const newTasks = state.currentDateTasks.filter(el => el.id !== action.payload.id)
            return { ...state, currentDateTasks: newTasks }
        }

        case actionTypes.ADD_PLANNER_TASK: {
            const tasks = [...state.currentDateTasks, {...action.payload.task, id: Number(new Date())}]
            let taskForAdd: IPlannerTaskAdd = {
                steps: {
                    step1: false,
                    step2: true,
                    step3: false,
                    step4: false
                },
                task: null
            }
            bblSortDate(tasks)
            // console.log(tasks)
            return { ...state,  taskForAdd: taskForAdd, currentDateTasks: tasks }
        }

        case actionTypes.EDIT_DAW_TASK: {
            let id = action.payload.id
            const currentDateTasks: IPlannerTask[] = state.currentDateTasks.map(el => {
                if(el.id === id) {
                  el.done = !el.done
                  return el
                }
                return el
            })
            // console.log(currentDateTasks)
            return { ...state, currentDateTasks }
        }

        case actionTypes.EDIT_DAW_INNER_TASK: {
            let id = action.payload.id
            let idInner = action.payload.idInner
            const currentDateTasks: IPlannerTask[] = state.currentDateTasks.map(el => {
                if(el.id === id) {
                    el.desc_list!.map((innerEl:any)=>{
                        if(innerEl.id === idInner) {
                            innerEl.done = !innerEl.done
                        }
                        return innerEl
                    })
                }
                return el
            })
            return { ...state, currentDateTasks }
        }

        case actionTypes.SET_TASKS_DIARY: {
            console.log(action.payload.tasks)
            return { ...state, tasks: action.payload.tasks }
        }

        case actionTypes.GET_TASKS_BY_DATE: {
            let dt1 = new Date(state.date)
            dt1.setHours(0)
            dt1.setMinutes(0)
            dt1.setSeconds(0)
            let dt2 = new Date(state.date)
            dt2.setHours(0)
            dt2.setMinutes(0)
            dt2.setSeconds(0)
            const tasksTmp = state.tasks.filter(()=>checkDate(dt1, dt2, action.payload.date))
            console.log(tasksTmp)
            console.log('tasksTmp')
            return { ...state, currentDateTasks: tasksTmp }
        }

        default: {
            return state;
        }
    }
}
