import React, {useReducer} from "react";
import {CLOSE_WINDOW, OPEN_WINDOW} from '../types'
import { ModalReducer } from "./ModalReducer";
import { ModalContext } from "./ModalContext"; 

// const url = process.env.REACT_APP_DB_URL

// interface IModalState {
//     children: React.ReactNode, 
// }
// type IModalState = {
//     visibility: boolean,
//     kind: string
// }

// type IModal = {
//     visible: boolean,
//     kind: string
// }
// type IModalState1 = {
//     visible: boolean,
//     kind: string
// }

export const ModalState = ({children}) => {
    const intialState = {
        visible: false,
        kind: ""
    }
    const [state, dispatch] = useReducer(ModalReducer, intialState)

    function show(kind) {
        dispatch({
            type: OPEN_WINDOW,
            payload: {kind}
        })
    }

    const hide = () => {
        dispatch({
            type: CLOSE_WINDOW,
        })
    }

    return (

        <ModalContext.Provider value={{
            modal: state,
            show,
            hide
        }}>
           {children}
        </ModalContext.Provider>
    )
}