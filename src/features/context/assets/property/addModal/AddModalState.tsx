import React, {useReducer} from "react";
import { ASSETS_PROPERTY_EARLIER_STEPS, ASSETS_PROPERTY_NEXT_STEPS, CLEAR_STEPS } from "../../../types";
import { AddModalReducer } from "./AddModalReducer";
import { AddModalContext } from "./AddModalContext";
import { IAssetsProperty } from "../../../../../app/types/assets/property/IProperty";
import { IStep } from "../../../../../app/types/steps";
import { IAssetsTransport } from "../../../../../app/types/assets/transport/ITransport";
import { IAssetsBusiness } from "../../../../../app/types/assets/business/IBusiness";
import { ILiabilitiesProperty } from "../../../../../app/types/liabilities/property/IProperty";
import { ILiabilitiesTransport } from "../../../../../app/types/liabilities/transport/ITransport";

interface IStepState {
    children: React.ReactNode,
    dataSteps: IStep[],
    dataArr: IAssetsProperty|IAssetsTransport|IAssetsBusiness| ILiabilitiesProperty | ILiabilitiesTransport
}

export const AddModalState = ({children, dataSteps, dataArr}: IStepState) => {
    const [state, dispatch] = useReducer(AddModalReducer, {steps: dataSteps, dataArr:dataArr})

    const nextStep = () => {
        dispatch({
            type: ASSETS_PROPERTY_NEXT_STEPS
            // payload: {steps}
        })
    }

    const earlierStep = () => {
        dispatch({
            type: ASSETS_PROPERTY_EARLIER_STEPS
            // payload: {steps}
        })
    }

    const clearSteps = ()=> {
        dispatch({
            type: CLEAR_STEPS
        })
    }

    return (
        <AddModalContext.Provider value={{
            stepsArr: state.steps, 
            dataArr: state.dataArr,
            nextStep: nextStep, 
            earlierStep: earlierStep,
            clearSteps: clearSteps
        }}>
            {children}
        </AddModalContext.Provider>
    )
}