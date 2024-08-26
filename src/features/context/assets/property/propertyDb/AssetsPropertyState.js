import React, {useReducer} from "react";
import { AssetsPropertyContext } from "./AssetsPropertyContext";
import { AssetsPropertyReducer } from "./AssetsPropertyReducer";
import axios from "axios"
import { SHOW_LOADER, FETCH_NOTES, ADD_NOTE, REMOVE_NOTE } from "../../../types";
import { PROPERTY_EDIT } from "../../../../../widgets/modalWindow/types";

// const url = 'http://localhost:9001'
const url = 'http://127.0.0.1:8000'


export const AssetsPropertyState = ({children}) => {
    const intialState = {
        notes: [],
        loading: false
    }
    const [state, dispatch] = useReducer(AssetsPropertyReducer, intialState)

    // const showLoader = () => {
    //     dispatch({
    //         type: SHOW_LOADER
    //     })
    // }

    const getProperties = async () => {
        // showLoader()
        try {
            const res = await axios.get(`${url}/actives/properties/`)
            console.log(res)
            dispatch({
                type: FETCH_NOTES,
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
        
        // const payload = Object.keys(res.data).map(key=>{
        //     return {
        //         ...res.data[key],
        //         id: key
        //     }
        // })
        // dispatch({
        //     type: FETCH_NOTES,
        //     payload
        // })
        
    }

    const addProperty = async (element) => {
        // console.log(element)
        let data = {
            ...element,
            loan: element.loan_term > 0 ? true : false
          }
        // let dtTmp = new Date
        // let dt = dtTmp.getDate() + '.' + dtTmp.getMonth() + '.' +dtTmp.getFullYear()
        // const note = {
        //     title,
        //     date: dt,
        // }
        try {
            const res = await axios.post(`${url}/actives/properties/`, data)
            const elems = await (await axios.get(`${url}/actives/properties/`)).data
            
            dispatch({
                type: ADD_NOTE, 
                payload: {elems}
            })   
        } catch (error) {
            // throw new Error.tsx(error.message)
            console.log(error)
        }
    }

    const editProperty = async (newDt) => {
        try {
            const res = await axios.patch(`${url}/actives/properties/up/${newDt.id}`, newDt)
            dispatch({
                type: PROPERTY_EDIT,
                payload: {newDt}
            })
        } catch (error) {
            console.log(error)
        }
    }

    const removeProperty = async (id) => {
        await axios.delete(`${url}/actives/properties/del/${id}`)
        dispatch({
            type: REMOVE_NOTE,
            payload: id
        })
    }

    return (
        <AssetsPropertyContext.Provider value={{
            notes: state.notes,
        //    showLoader,
            getProperties,
            addProperty,
            editProperty,
            removeProperty,
           loading: state.loading,
        //    propertys: state.propertys
        }}>
            {children}
        </AssetsPropertyContext.Provider>
    )
}