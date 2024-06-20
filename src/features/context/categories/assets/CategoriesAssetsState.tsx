import React, { useReducer } from "react";
import { SET_CATEGORY } from "../../types";
import { CategoriesAssetsContext } from "./CategoriesAssetsContext";
import { CategoriesAssetsReducer } from "./CategoriesAssetsReducer";

interface IStepState {
    children: React.ReactNode,

}

export const CategoriesAssetsState = ({children}: IStepState) => {
    const [state, dispatch] = useReducer(CategoriesAssetsReducer, {category:0})
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
        <CategoriesAssetsContext.Provider value={{
            category: state.category, 
            setCategory: setCategory
        }}>
            {children}
        </CategoriesAssetsContext.Provider>
    )
}