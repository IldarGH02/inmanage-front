import { IAssetsBusiness } from "../../../../../app/types/assets/business/IBusiness"
import { IAssetsProperty } from "../../../../../app/types/assets/property/IProperty"
import { IAssetsTransport } from "../../../../../app/types/assets/transport/ITransport"
import { ILiabilitiesProperty } from "../../../../../app/types/liabilities/property/IProperty"
import { ILiabilitiesTransport } from "../../../../../app/types/liabilities/transport/ITransport"
import { IStep, Status } from "../../../../../app/types/steps"
import { ASSETS_PROPERTY_EARLIER_STEPS, ASSETS_PROPERTY_NEXT_STEPS, CLEAR_STEPS } from "../../../types"


type IStepState = {
    steps: IStep[], 
    dataArr: IAssetsProperty|IAssetsTransport|IAssetsBusiness| ILiabilitiesProperty | ILiabilitiesTransport
}

type IStepAction = {
    type: string
}

const handlers: any  = {
    [ASSETS_PROPERTY_NEXT_STEPS]: (state: IStepState) => {
        // console.log(state.steps)
        let resTmp = state.steps
        // let dataArr= state.dataArr
        let index: number = -1;
        let steps: IStep[] = resTmp.map((el:IStep, i: number)=>{
            if(el.status === Status.active) {
                el.status = Status.done
                index = i
            }
            return el
        })
        if(index!==-1 && index<resTmp.length-1) {
            steps[index+1].status = Status.active
        }
        state = {steps:[...steps], dataArr: state.dataArr}
        return state
    },
    [ASSETS_PROPERTY_EARLIER_STEPS]: (state: IStepState) => {
        // console.log(state.steps)
        let resTmp = state.steps
        var index: number = -1; 
        var flag = false
        let steps: IStep[] = resTmp.map((el:IStep, i: number)=>{
            if(el.status === Status.active && !flag) {
                flag = true
                if(i===1) {
                    index = 0
                }
                else {
                    el.status = Status.inactive
                    index = i-1
                }
            }
            return el
        })
        // console.log(steps)
        if(index>0) {
            steps[index].status = Status.active
        }
        else if(index===-1){
            steps[steps.length-1].status = Status.active
        }
        state = {steps:[...steps], dataArr: state.dataArr}
        return state
    },
    [CLEAR_STEPS]: (state: IStepState) => {
        for(let i = 0; i<state.steps.length; i++) {
            if(i === 1) {
                state.steps[i].status = Status.active
            }
            else if(i>1) {
                state.steps[i].status = Status.inactive
            }
        }
        return state
    }, 
    DEFAULT: (state: IStep[]) => state
}

export const AddModalReducer = (state: IStepState, action: IStepAction) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}