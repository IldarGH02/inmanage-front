import { SET_CATEGORY } from "../../types"

type IPayload = {
    i: number
}

type IState = {
    category: number
}

type IAction = {
    type: string
    payload: IPayload
}

const handlers: any = {
    [SET_CATEGORY]: ({payload}:IAction) => {
        console.log(payload.i)
        return {category:payload.i}
    },
    DEFAULT: (state: number) => state
}

export const CategoriesAssetsReducer = (state: IState, action: IAction) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}