import {ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER} from '../../../types'
import { IAssetsProperty } from '../../../../../models/assets/property/IProperty'
import { PROPERTY_EDIT } from '../../../../../widgets/modalWindow/types'

const handlers = {
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [ADD_NOTE]: (state, {payload}) => {
        const newArr = payload.elems
        let obj = {
            ...state,
            notes: newArr
        }
        console.log(obj)
        return obj
    },
    [FETCH_NOTES]: (state, {payload}) => {
        let arr = []
        
        payload.forEach(element => {
            let arrTmp = {
                id: element.id,
                user_id: element.user_id,
                name: element.name,
                address: element.address,
                bought_price: element.bought_price ,
                actual_price: element.actual_price ,
                revenue: element.revenue,
                equipment_price: element.equipment_price ,
                month_income: element.month_income ,
                month_expense: element.month_expense ,
                average_profit: element.average_profit ,
                rent_type: element.rent_type,//long_rent
                loan_term: element.loan_term ,
                percentage: element.percentage,
                monthly_payment: element.monthly_payment,
                initial_payment: element.initial_payment,
                owner: element.owner 
            }
            arr.push(arrTmp)
        });
        return {...state, notes: arr, loading: false}
    },
    [PROPERTY_EDIT]: (state, {payload}) => {
        let arr = state.notes
        arr.forEach((el)=>{
            if(el.id === payload.newDt.id) {
                el.name = payload.newDt.name
                el.address = payload.newDt.address
            }
        })
        return {...state, notes: arr}
    },
    [REMOVE_NOTE]: (state, {payload}) => ({
        ...state,
        notes: state.notes.filter(note => note.id !== payload)
    }),
    DEFAULT: state => state
}

export const AssetsPropertyReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}