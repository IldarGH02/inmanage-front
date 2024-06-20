import React, {useReducer} from "react";
import { PlannerDateReducer } from "./PlannerDateReducer";
import { PlannerDateContext } from "./PlannerDateContext";
import { GET_DATE, SET_DATE } from "../../types";

interface IStepState {
    children: React.ReactNode,
}

export const PlannerDateState = ({children}: IStepState) => {
    const [state, dispatch] = useReducer(PlannerDateReducer, {date: new Date()})
    // useEffect(()=>{
    //     console.log(steps)
    // },[])

    // const add

    const getDate = () => {
        dispatch({type: GET_DATE})
    }

    const setDate = (date: Date) => {
        dispatch({
            type: SET_DATE,
            payload: {date}
        })
    }

    return (
        <PlannerDateContext.Provider value={{
            date: state, 
            getDate: getDate,
            setDate: setDate, 
        }}>
            {children}
        </PlannerDateContext.Provider>
    )
}