import { IAlert } from '../../../app/types/alert/IAlert'
import {SHOW_ALERT, HIDE_ALERT} from '../types'

type IPayload = {
    type: string, 
    text: string
}

type IState = {
    alert: IAlert,
}

type IAction = {
    type: string
    payload?: IPayload
}

const handlers: any = {
    [SHOW_ALERT]: ({payload}:IAction) => ({...payload, visible: true}),
    [HIDE_ALERT]: (state:IAlert) => ({...state, visible: false}),
    DEFAULT: (state:IAlert) => state
}

export const AlertReducer = (state:IState, action:IAction) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}