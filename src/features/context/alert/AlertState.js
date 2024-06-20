import React, {useReducer} from "react";
import { HIDE_ALERT, SHOW_ALERT } from "../types";
import {AlertContext} from "./AlertContext"
import {AlertReducer} from "./AlertReducer"

export const AlertState = ({children}) => {
    const intialState = {
        visible: false
    }
    const [state, dispatch] = useReducer(AlertReducer, intialState)

    const showAlert = (text, type = 'warning') => {
        dispatch({
            type: SHOW_ALERT,
            payload: {text, type}
        })
    }

    const hideAlert = () => {
        dispatch({type: HIDE_ALERT})
    }

    return (
        <AlertContext.Provider value={{
            showAlert, 
            hideAlert,
            alert: state
        }}>
            {children}
        </AlertContext.Provider>
    )
}