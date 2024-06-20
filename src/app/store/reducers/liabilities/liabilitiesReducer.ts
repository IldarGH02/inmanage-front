import { IExpenseBalance } from "../../../types/balance/IBalance";
import { ILiabilitiesProperty, ILiabilitiesTransport } from "../../../types/liabilities/ILiabilities";
import { IActionLiabilities, actionTypesLiabilities, initialStateLiabilities } from "../../types/liabilitiesTypes";

export const liabilitiesReducer = (state = initialStateLiabilities, action: IActionLiabilities) => {
    switch(action.type) {

        case actionTypesLiabilities.SHOW_LOADER_LIABILITIES: {
            return {...state, loading: true};
        }

        case actionTypesLiabilities.HIDE_LOADER_LIABILITIES: {
            return {...state, loading: false};
        }

        // case actionTypesLiabilities.GET_LIABILITIES: {
        //     state.liabilities = action.payload
        //     state.loading = false
        //     // console.log(state)
        //     return { ...state, loading: false }
        // };

        case actionTypesLiabilities.ADD_EXPENSE: {
            type typeAssets = 'properties' | 'transport' | 'business'
            let activeCategory: typeAssets = action.payload.typeAssets
            // state.assets = action.payload
            switch (activeCategory) {
                    
                case 'properties': {
                    let asset: ILiabilitiesProperty = action.payload.asset
                    let objExpense: IExpenseBalance = action.payload.objExpense
                    state.liabilities!.properties!.properties = state.liabilities!.properties!.properties.map((el:any)=>{
                        if(action.payload.id === el.id) {
                            return asset
                        } 
                        return el
                    })
                    state.liabilities!.properties!.total_expenses+= objExpense.funds
                    state.liabilities!.total_expenses += objExpense.funds
                    break;
                }
                    
                case 'transport': {
                    let asset: ILiabilitiesTransport = action.payload.asset
                    let objExpense: IExpenseBalance = action.payload.objExpense
                    state.liabilities!.transports!.transport = state.liabilities!.transports!.transport.map((el:any)=>{
                        if(action.payload.id === el.id) {
                            return asset
                        } 
                        return el
                    })
                    state.liabilities!.transports!.total_expenses += objExpense.funds
                    state.liabilities!.total_expenses += objExpense.funds
                    break;
                }
                    
                default:
                    break;
            }
            return { ...state, loading: false }
        };

        ////////Property///////////

        case actionTypesLiabilities.EDIT_PROPERTY_LIABILITIES: {
            const properties = state.liabilities!.properties!.properties.map((el:any) => {
                if(el.id === action.payload.id) {
                    return action.payload
                }
                return el
            })
            state.liabilities!.properties!.properties = properties
            // console.log(state)
            return { ...state, loading: false }
        }

        case actionTypesLiabilities.REMOVE_PROPERTY_LIABILITIES: {
            state.liabilities!.properties!.properties! = state.liabilities!.properties!.properties!.filter((el:any) => el.id !== action.payload.id)
            return { ...state, loading: false }
        }

        case actionTypesLiabilities.ADD_PROPERTY_LIABILITIES: {
            state.liabilities?.properties?.properties.push(action.payload)
            return { ...state, loading: false }
        }

        /////////Transport/////////

        case actionTypesLiabilities.EDIT_TRANSPORT_LIABILITIES: {
            // console.log(action.payload)
            const transports = state.liabilities!.transports?.transport.map((el:any) => {
                if(el.id === action.payload.id) {
                    return action.payload
                }
            })
            // console.log(action.payload)
            if(transports) {
                state.liabilities!.transports!.transport = transports
            }
            // console.log(state)
            return { ...state, loading: false }
        }

        case actionTypesLiabilities.REMOVE_TRANSPORT_LIABILITIES: {
            state.liabilities!.transports!.transport! = state.liabilities!.transports!.transport!.filter((el:any) => el.id !== action.payload.id)
            return { ...state, loading: false }
        }

        case actionTypesLiabilities.ADD_TRANSPORT_LIABILITIES: {
            state.liabilities?.transports?.transport.push(action.payload)
            return { ...state, loading: false }
        }

        /////////Loan/////////

        case actionTypesLiabilities.EDIT_LOAN_LIABILITIES: {
            const business = state.liabilities!.loans!.loans.map((el:any) => {
                if(el.id === action.payload.id) {
                    return action.payload
                }
                return el
            })
            state.liabilities!.loans!.loans = business
            return { ...state, loading: false }
        }

        case actionTypesLiabilities.REMOVE_LOAN_LIABILITIES: {
            state.liabilities!.loans!.loans! = state.liabilities!.loans!.loans!.filter((el:any)=> el.id !== action.payload.id)
            return { ...state, loading: false }
        }

        case actionTypesLiabilities.ADD_LOAN_LIABILITIES: {
            state.liabilities?.loans?.loans.push(action.payload)
            return { ...state, loading: false }
        }

        /////////Borrow/////////

        case actionTypesLiabilities.ADD_BORROW_LIABILITIES: {
            state.liabilities?.borrows?.borrows.push(action.payload)
            return { ...state, loading: false }
        }

        case actionTypesLiabilities.REMOVE_BORROW_LIABILITIES: {
            state.liabilities!.borrows!.borrows! = state.liabilities!.borrows!.borrows!.filter((el:any) => el.id !== action.payload.id)
            return { ...state, loading: false }
        }

        default: {
            return state;
        }
    }
}
