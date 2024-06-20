import { ICard, IExpenseBalance, IIncome, IIncomeBalance } from "../../../types/balance/IBalance";
import { IActionBalance, actionTypesBalance, initialStateBalance } from "../../types/balanceTypes";

export const balanceReducer = (state = initialStateBalance, action: IActionBalance) => {
    switch(action.type) {

        case actionTypesBalance.SHOW_LOADER: {
            return {...state, loading: true};
        }

        case actionTypesBalance.HIDE_LOADER: {
            return {...state, loading: false};
        }

        // case actionTypesBalance.GET_BALANCE: {
        //     state.balance = action.payload
        //     return { ...state, loading: false }
        // };

        //Card

        case actionTypesBalance.ADD_CARD: {
            return {...state, balance: action.payload, loading: false};
        }

        case actionTypesBalance.EDIT_CARD: {
            let newCardList: ICard[] = state.balance!.card_list.map((el:any)=>{
                if(el.id === action.payload.id) {
                    return action.payload as ICard
                }
                return el
            })
            state.balance!.card_list = newCardList
            return {...state, loading: false};
        }

        case actionTypesBalance.REMOVE_CARD: {
            let newCardList: ICard[] = state.balance!.card_list.filter((el:any)=>el.id !== action.payload.id)
            state.balance!.card_list = newCardList
            return {...state, loading: false};
        }

        case actionTypesBalance.ADD_FAVORITE_CARD: {
            if(state.balance) {
                state.balance = action.payload.balance
            }
            return {...state, loading: false};
        }

        //Income

        // case actionTypesBalance.GET_WORKS: {
        //     state.work = action.payload.works
        //     return { ...state, loading: false }
        // };

        case actionTypesBalance.ADD_WORK: {
            return {...state, work: action.payload.work, loading: false};
        }

        case actionTypesBalance.ADD_INCOME_WORK: {
            const income: IIncomeBalance = {
                id: action.payload.income.id,
                object_id: action.payload.income.child,
                funds: action.payload.income.funds,
                comment: action.payload.income.comment,
                writeoff_account: action.payload.income.writeoff_account,
                created_at: action.payload.income.created_at
            }
            if(state.balance) {
                state.balance.total += income.funds
                state.balance.card_funds += income.funds
                state.balance.total_income += income.funds
                state.balance.card_income += income.funds
                state.balance.card_list = state.balance.card_list.map((el:any)=>{
                    if(el.id===income.writeoff_account) {
                        el.income.push(income)
                        el.remainder += income.funds                        
                    }
                    return el
                })
            }
            console.log(state.balance)
            return {...state, loading: false};
        }

        case actionTypesBalance.ADD_INCOME_ASSETS: {
            const incomePayload: IIncomeBalance = action.payload.incomeObj
            const income: IIncome = {
                id: incomePayload.id,
                work: null,
                project: null,
                funds: incomePayload.funds,
                comment: incomePayload.comment,
                writeoff_account: incomePayload.writeoff_account,
                created_at: incomePayload.created_at
            }
            if(state.balance) {
                state.balance.total += incomePayload.funds
                state.balance.card_funds += incomePayload.funds
                state.balance.total_income += incomePayload.funds
                state.balance.card_income += incomePayload.funds
                state.balance.card_list = state.balance.card_list.map((el:any)=>{
                    if(el.id===incomePayload.writeoff_account) {
                        el.income.push(income)
                        el.remainder += income.funds                        
                    }
                    return el
                })
            }
            return {...state, loading: false};
        }

        //Expense 

        case actionTypesBalance.ADD_EXPENSE_ASSETS_LIABILITIES: {
            const expensePayload: IExpenseBalance = action.payload.expenseObj
            const expense: IExpenseBalance = {
                id: expensePayload.id,
                funds: expensePayload.funds,
                comment: expensePayload.comment,
                writeoff_account: expensePayload.writeoff_account,
                created_at: expensePayload.created_at
            }
            if(state.balance) {
                state.balance.total -= expensePayload.funds
                state.balance.card_funds -= expensePayload.funds
                state.balance.total_expenses += expensePayload.funds
                state.balance.card_expenses += expensePayload.funds
                state.balance.card_list = state.balance.card_list.map((el:any)=>{
                    if(el.id===expensePayload.writeoff_account) {
                        el.income.push(expense)
                        el.remainder -= expense.funds                        
                    }
                    return el
                })
            }
            return {...state, loading: false};
        }

        case actionTypesBalance.GET_PERSONAL_EXPENSE_CATEGORIES: {
            return {...state, personalCategories: action.payload.icons, loading: false};
        }

        case actionTypesBalance.ADD_EXPENSE_PERSONAL_CATEGORY: {
            // state.personalCategories!.push(action.payload.icon)
            return {...state, personalCategories: [...state.personalCategories!, action.payload.icon], loading: false};
        }

        case actionTypesBalance.ADD_EXPENSE_PERSONAL: {
            return {...state}
            // state.personalCategories!.push(action.payload.icon)
            // return {...state, personalCategories: [...state.personalCategories!, action.payload.icon], loading: false};
        }

        default: {
            return state;
        }   
    }
}
