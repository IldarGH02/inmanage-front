import React, { useEffect, useState } from "react";
import "./stepsTest.css"
// import { steps } from "./stepsData"
// import { StepContext } from "../context/stepContext/stepContext";
import { StepItem } from "./StepItem";
import { IStep, Status } from "../../../app/types/steps";

// interface IContext {
//     stepsArr: IStep[],
//     nextStep: () => void,
//     earlierStep: () => void, 
//     clearSteps: () => void
// }

interface ISteps {
    stepsArr: IStep[]
}

// interface ISteps {
//     stepsArr: IStep[]
// }

export default function Steps({stepsArr}: ISteps) {
    const [stepsData, setStepsData] = useState<IStep[]>([])
    
    useEffect(()=>{
        // setStepsData(stepsArr)
        clearSteps()
    },[])

    // const nextStep = () => {
    //     let resTmp = stepsData
    //     let index: number = -1;
    //     let steps: IStep[] = resTmp.map((el:IStep, i: number)=>{
    //         if(el.status === Status.active) {
    //             el.status = Status.done
    //             index = i
    //         }
    //         return el
    //     })
    //     if(index!==-1 && index<resTmp.length-1) {
    //         steps[index+1].status = Status.active
    //     }
    //     setStepsData(steps)
    // }

    // const earlierStep = ()=> {
    //     let resTmp = stepsData
    //     var index: number = -1; 
    //     var flag = false
    //     let steps: IStep[] = resTmp.map((el:IStep, i: number)=>{
    //         if(el.status === Status.active && !flag) {
    //             flag = true
    //             if(i===1) {
    //                 index = 0
    //             }
    //             else {
    //                 el.status = Status.inactive
    //                 index = i-1
    //             }
    //         }
    //         return el
    //     })
    //     // console.log(steps)
    //     if(index>0) {
    //         steps[index].status = Status.active
    //     }
    //     else if(index===-1){
    //         steps[steps.length-1].status = Status.active
    //     }
    //     setStepsData(steps)
    // }

    const clearSteps = ()=> {
        for(let i = 0; i<stepsArr.length; i++) {
            if(i === 1) {
                stepsArr[i].status = Status.active
            }
            else if(i>1) {
                stepsArr[i].status = Status.inactive
            }
        }
        setStepsData(stepsArr)
    }

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
