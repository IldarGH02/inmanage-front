import React, { useReducer } from "react";
import { SET_CATEGORY } from "../../types";
import { CategoriesLiabilitiesContext } from "./CategoriesLiabilitiesContext";
import { CategoriesLiabilitiesReducer } from "./CategoriesLiabilitiesReducer";

interface IStepState {
    children: React.ReactNode,

}

export const CategoriesLiabilitiesState = ({children}: IStepState) => {
    const [state, dispatch] = useReducer(CategoriesLiabilitiesReducer, {category:0})
    // useEffect(()=>{
    //     console.log(steps)
    // },[])

    // const add

    const setCategory = (i:number) => {
        dispatch({
            type: SET_CATEGORY,
            payload: {i}
        })
    }

    return (
        <CategoriesLiabilitiesContext.Provider value={{
            category: state.category, 
            setCategory: setCategory
        }}>
            {children}
        </CategoriesLiabilitiesContext.Provider>
    )
}