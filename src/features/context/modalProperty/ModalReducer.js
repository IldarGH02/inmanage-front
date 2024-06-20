import {CLOSE_WINDOW, OPEN_WINDOW} from '../types'

// type IModalState = {
//     visible: boolean,
//     kind: string
// }

// type IPyload = {
//     kind: string
// }

// type IModalAction = {
//     type: string,
//     payload: IPyload
// }

const handlers = {
    [OPEN_WINDOW]: (state, {payload}) => ({...payload, visible: true}),
    [CLOSE_WINDOW]: (state) => ({...state, visible: false}),
    DEFAULT: (state) => state
}

export const ModalReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}