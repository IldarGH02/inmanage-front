import React, {useReducer} from "react";
import { SHOW_ALERT, HIDE_ALERT } from "../types";
import { AlertContext } from "./AlertContext";
import { AlertReducer } from "./AlertReducer";

// const url = process.env.REACT_APP_DB_URL

interface IAlertState {
    children: React.ReactNode,
    // show: ()=>void, 
    // hide: ()=>void,
    // alert: IAlert
}

export const AlertState = ({children}:IAlertState) => {
    const intialState = {
        visible: false
    }
    const [state, dispatch] = useReducer(AlertReducer, intialState)

    function showAlert(text:string, type:string) {
        dispatch({
            type: SHOW_ALERT,
            payload: {text, type}
        })
    }

    // const showAlert = (text:string, type:string) => {
    //     console.log(text)
    //     dispatch({
    //         type: SHOW_ALERT,
    //         payload: {text, type}
    //     })
    // }

    const hideAlert = () => {
        dispatch({type: HIDE_ALERT})
    }

    return (
        <AlertContext.Provider value={{
            showAlert: showAlert, 
            hideAlert: hideAlert,
            alert: state
        }}>
            {children}
        </AlertContext.Provider>
    )
}