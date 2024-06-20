import { IAction, actionTypes, initialStateAssets } from "../types/types"

export const plannerReducer = (state = initialStateAssets, action: IAction) => {
    switch(action.type) {

        case actionTypes.SHOW_LOADER: {
            return {...state, loading: true};
        }

        

        default: {
            return state;
        }
    }
}
