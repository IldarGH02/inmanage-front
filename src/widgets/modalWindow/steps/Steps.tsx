import React, { useContext, useEffect, useState } from "react";
import "./steps.css"
// import { steps } from "./stepsData"
// import { StepContext } from "../context/stepContext/stepContext";
import { StepItem } from "./StepItem";
import { AddModalContext } from "../../../features/context/assets/property/addModal/AddModalContext";
import { IStep } from "../../../app/types/steps";
interface IContext {
    stepsArr: IStep[],
    nextStep: () => void,
    earlierStep: () => void, 
    clearSteps: () => void
}

// interface ISteps {
//     stepsArr: IStep[]
// }

export default function Steps() {
    const [stepsData, setStepsData] = useState<IStep[]>([])
    
    const {stepsArr} = useContext(AddModalContext) as IContext
    useEffect(()=>{
        setStepsData(stepsArr)
    },[])

    // function getClassActive(status: Status) {
    //     let res: string = ''
    //     switch (status) {
    //         case Status.active: {
    //             res = 'active'
    //             break;
    //         }
    //         case Status.inactive: {
    //             res = 'inactive'
    //             break;
    //         }
    //         case Status.done: {
    //             res = 'done'
    //             break;
    //         }
    //         default:
    //             break;
    //     }
    //     return res
    // }

    return (
        <div className="steps">
            {stepsData.map((step: IStep) => {
                return (
                    <StepItem step={step} key={step.id}></StepItem>
                )
            })}
        </div>
    )
}
