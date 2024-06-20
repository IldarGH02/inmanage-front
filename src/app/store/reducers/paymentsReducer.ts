// import { IPlannerTask } from "../../types/planner/IPlanner"
import { actionTypesBalance, initialStatePayments } from "../types/balanceTypes"

// function bblSortDate(arr: IPlannerTask[]) { 
//     for (let i = 0; i < arr.length; i++) {   
//         for (let j = 0; j < (arr.length - i - 1); j++) { 
//             if (arr[j].date_start > arr[j + 1].date_start) { 
//                 let temp = arr[j] 
//                 arr[j] = arr[j + 1] 
//                 arr[j + 1] = temp 
//             } 
//         } 
//     } 
// }

// function checkDate(dt1: Date, dt2: Date, dt: Date) {
//     if(dt>=dt1 && dt<=dt2) {
//         return true
//     }
//     return false
// }

export const paymentsReducer = (state = initialStatePayments, action: any) => {
    switch(action.type) {

        // case actionTypes.SHOW_LOADER: {
        //     return {...state, loading: true};
        // }

        case actionTypesBalance.SET_DATE: {
            let date = action.payload.date
            return { ...state, date }
        }

        case actionTypesBalance.SET_DAYS_OF_MONTH: {
            let daysOfMonth = action.payload.days
            console.log(daysOfMonth)
            return { ...state, daysOfMonth }
        }

        default: {
            return state;
        }
    }
}
