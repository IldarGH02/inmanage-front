import React, {useReducer} from "react";
import { SET_CATEGORY } from "../../types";
import { CategoriesPlannerContext } from "./CategoriesPlannerContext";
import { CategoriesPlannerReducer } from "./CategoriesPlannerReducer";

interface IStepState {
    children: React.ReactNode,

}

export const CategoriesPlannerState = ({children}: IStepState) => {
    const [state, dispatch] = useReducer(CategoriesPlannerReducer, {category:0})
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
        <CategoriesPlannerContext.Provider value={{
            category: state.category, 
            setCategory: setCategory
        }}>
            {children}
        </CategoriesPlannerContext.Provider>
    )
}