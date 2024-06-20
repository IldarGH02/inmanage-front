import { IAssetsBusiness, IAssetsProperty, IAssetsTransport } from "../../../types/assets/IAssets";
import { IExpenseBalance, IIncomeBalance } from "../../../types/balance/IBalance";
import { IAction, actionTypes, initialStateAssets } from "../../types/types"

export const assetsReducer = (state = initialStateAssets, action: IAction) => {
    switch(action.type) {

        case actionTypes.SHOW_LOADER: {
            return {...state, loading: true};
        }

        case actionTypes.HIDE_LOADER: { 
            return {...state, loading: false};
        }

        // case actionTypes.GET_ASSETS: {
        //     state.assets = action.payload
        //     state.loading = false
        //     return { ...state, loading: false }
        // };

        case actionTypes.ADD_INCOME: {
            type typeAssets = 'properties' | 'transport' | 'business'
            let activeCategory: typeAssets = action.payload.typeAssets
            // state.assets = action.payload
            switch (activeCategory) {
                    
                case 'properties': {
                    let asset: IAssetsProperty = action.payload.asset
                    let objIncome: IIncomeBalance = action.payload.objIncome
                    state.assets!.properties!.properties = state.assets!.properties!.properties.map((el:any)=>{
                        if(action.payload.id === el.id) {
                            return asset
                        } 
                        return el
                    })
                    state.assets!.properties!.total_income += objIncome.funds
                    state.assets!.total_income += objIncome.funds
                    console.log(state.assets)
                    break;
                }
                    
                case 'transport': {
                    let asset: IAssetsTransport = action.payload.asset
                    let objIncome: IIncomeBalance = action.payload.objIncome
                    state.assets!.transports!.transport = state.assets!.transports!.transport.map((el:any)=>{
                        if(action.payload.id === el.id) {
                            return asset
                        } 
                        return el
                    })
                    state.assets!.transports!.total_income += objIncome.funds
                    state.assets!.total_income += objIncome.funds
                    break;
                }
    
                case 'business': {
                    let asset: IAssetsBusiness = action.payload.asset
                    let objIncome: IIncomeBalance = action.payload.objIncome
                    state.assets!.businesses!.businesses = state.assets!.businesses!.businesses.map((el:any)=>{
                        if(action.payload.id === el.id) {
                            return asset
                        } 
                        return el
                    })
                    state.assets!.businesses!.total_income += objIncome.funds
                    state.assets!.total_income += objIncome.funds
                    break;
                }
                    
                default:
                    break;
            }
            return { ...state, loading: false }
        };

        case actionTypes.ADD_EXPENSE: {
            type typeAssets = 'properties' | 'transport' | 'business'
            let activeCategory: typeAssets = action.payload.typeAssets
            // state.assets = action.payload
            switch (activeCategory) {
                    
                case 'properties': {
                    let asset: IAssetsProperty = action.payload.asset
                    let objExpense: IExpenseBalance = action.payload.objExpense
                    state.assets!.properties!.properties = state.assets!.properties!.properties.map((el:any)=>{
                        if(action.payload.id === el.id) {
                            return asset
                        } 
                        return el
                    })
                    state.assets!.properties!.total_expenses+= objExpense.funds
                    state.assets!.total_expenses += objExpense.funds
                    break;
                }
                    
                case 'transport': {
                    let asset: IAssetsTransport = action.payload.asset
                    let objExpense: IExpenseBalance = action.payload.objExpense
                    state.assets!.transports!.transport = state.assets!.transports!.transport.map((el:any)=>{
                        if(action.payload.id === el.id) {
                            return asset
                        } 
                        return el
                    })
                    state.assets!.transports!.total_expenses += objExpense.funds
                    state.assets!.total_expenses += objExpense.funds
                    break;
                }
    
                case 'business': {
                    let asset: IAssetsBusiness = action.payload.asset
                    let objExpense: IExpenseBalance = action.payload.objExpense
                    state.assets!.businesses!.businesses = state.assets!.businesses!.businesses.map((el:any)=>{
                        if(action.payload.id === el.id) {
                            return asset
                        } 
                        return el
                    })
                    state.assets!.businesses!.total_expenses += objExpense.funds
                    state.assets!.total_expenses += objExpense.funds
                    break;
                }
                       
                default:
                    break;
            }
            return { ...state, loading: false }
        };

        ////////Property///////////

        case actionTypes.EDIT_PROPERTY: {
            const properties = state.assets!.properties!.properties.map((el:any) => {
                if(el.id === action.payload.id) {
                    return action.payload
                }
                return el
            })
            state.assets!.properties!.properties = properties
            return { ...state, loading: false }
        }

        case actionTypes.REMOVE_PROPERTY: {
            const elInState = state.assets?.properties?.properties.find((el:any)=>el.id===action.payload) 
            state.assets!.properties!.properties! = state.assets!.properties!.properties!.filter((el:any) => el.id !== action.payload)
            state.assets!.total_funds -= elInState!.bought_price
            return { ...state, loading: false }
        }

        case actionTypes.ADD_PROPERTY: {
            state.assets?.properties?.properties.push(action.payload)
            state.assets!.total_funds += action.payload!.bought_price
            return { ...state, loading: false }
        }

        case actionTypes.ADD_PROPERTY_INVENTORY: {
            state.assets!.properties!.properties.find((el:any)=>el.id===action.payload.id)!.equipment!.assets = action.payload
            // state.assets!.total_funds += action.payload!.bought_price
            return { ...state, loading: false }
        }

        /////////Transport/////////

        case actionTypes.EDIT_TRANSPORT: {
            const transports = state.assets!.transports!.transport.map((el:any) => {
                if(el.id === action.payload.id) {
                    return action.payload
                }
                return el
            })
            state.assets!.transports!.transport = transports
            console.log(state)
            return { ...state, loading: false }
        }

        case actionTypes.REMOVE_TRANSPORT: {
            const elInState = state.assets?.transports?.transport.find((el:any)=>el.id===action.payload) 
            state.assets!.transports!.transport! = state.assets!.transports!.transport!.filter((el:any) => el.id !== action.payload)
            state.assets!.total_funds -= elInState!.bought_price
            return { ...state, loading: false }
        }

        case actionTypes.ADD_TRANSPORT: {
            state.assets?.transports?.transport.push(action.payload)
            state.assets!.total_funds += action.payload!.bought_price
            return { ...state, loading: false }
        }

        /////////Business/////////

        case actionTypes.EDIT_BUSINESS: {
            const business = state.assets!.businesses!.businesses.map((el:any) => {
                if(el.id === action.payload.id) {
                    return action.payload
                }
                return el
            })
            state.assets!.businesses!.businesses = business
            console.log(state)
            return { ...state, loading: false }
        }

        case actionTypes.REMOVE_BUSINESS: {
            const elInState = state.assets?.businesses?.businesses.find((el:any)=>el.id===action.payload) 
            state.assets!.businesses!.businesses! = state.assets!.businesses!.businesses!.filter((el:any) => el.id !== action.payload)
            state.assets!.total_funds -= elInState!.bought_price
            return { ...state, loading: false }
        }

        case actionTypes.ADD_BUSINESS: { 
            state.assets?.businesses?.businesses.push(action.payload)
            // state.assets!.total_funds += action.payload!.bought_price
            return { ...state, loading: false }
        }

        /////////Valuable/////////

        case actionTypes.ADD_VALUABLE: { 
            state.assets?.jewelries?.jewelries.push(action.payload)
            state.assets!.jewelries!.total_funds += action.payload.purchase_cost
            return { ...state, loading: false }
        }

        case actionTypes.REMOVE_VALUABLE: {
            const elInState = state.assets?.jewelries?.jewelries.find((el:any)=>el.id===action.payload) 
            state.assets!.jewelries!.jewelries! = state.assets!.jewelries!.jewelries!.filter((el:any) => el.id !== action.payload)
            state.assets!.total_funds -= elInState!.purchase_cost
            return { ...state, loading: false }
        }

        /////////Securities/////////

        case actionTypes.ADD_SECURITIES: {
            state.assets?.securities?.securities.push(action.payload)
            // state.assets!.securities!.total_funds += action.payload.purchase_cost
            // state.assets??.businesses.push(action.payload)
            return { ...state, loading: false }
        }

        case actionTypes.REMOVE_SECURITIES: {
            // const elInState = state.assets?.jewelries?.jewelries.find(el=>el.id===action.payload) 
            state.assets!.securities!.securities! = state.assets!.securities!.securities!.filter((el:any) => el.id !== action.payload)
            // state.assets!.total_funds -= elInState!.purchase_cost
            return { ...state, loading: false }
        }

         /////////Deposit/////////

         case actionTypes.ADD_DEPOSIT: {
            state.assets?.deposits?.deposits.push(action.payload)
            // state.assets!.securities!.total_funds += action.payload.purchase_cost
            // state.assets??.businesses.push(action.payload)
            return { ...state, loading: false }
        }

        case actionTypes.REMOVE_DEPOSIT: {
            // const elInState = state.assets?.jewelries?.jewelries.find(el=>el.id===action.payload) 
            state.assets!.deposits!.deposits! = state.assets!.deposits!.deposits!.filter((el:any) => el.id !== action.payload)
            // state.assets!.total_funds -= elInState!.purchase_cost
            return { ...state, loading: false }
        }

        default: {
            return state;
        }
    }
}
