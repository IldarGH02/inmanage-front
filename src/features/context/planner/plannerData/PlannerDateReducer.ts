import { GET_DATE, SET_DATE } from "../../types"

type IPayload = {
    date: Date
}

type IState = {
    date: Date,
}

type IAction = {
    type: string
    payload?: IPayload
}

const handlers: any = {
    [SET_DATE]: ({payload}:IAction) => ({...payload}),
    [GET_DATE]: (state:Date) => ({...state}),
    DEFAULT: (state:Date) => state
}

export const PlannerDateReducer = (state:IState, action:IAction) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}