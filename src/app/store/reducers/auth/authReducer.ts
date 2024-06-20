import { actionTypesAuth, initialStateAuth } from "../../types/authTypes"

export const authReducer = (state = initialStateAuth, action: any) => {
    switch(action.type) {

        case actionTypesAuth.SHOW_LOADER_AUTH: {
            return {...state, loading: true};
        }

        case actionTypesAuth.IS_CHECK_AUTH: {
            return { ...state, isCheck: true };
        }

        case actionTypesAuth.CHANGE_IS_AUTH_ON_FALSE: {
            return { ...state, loading: false, isAuth: false, isCheck: false, user: {} };
        }

        case actionTypesAuth.HIDE_LOADER_AUTH: {
            return {...state, loading: false};
        }

        case actionTypesAuth.REGISTRATION: {
            return { ...state, loading: false, tempToken: action.payload.tempToken }
        }

        case actionTypesAuth.REGISTRATION_CONFIRM: {
            return { ...state, loading: false, tempToken: '', isAuth: true }
        }

        case actionTypesAuth.LOGIN: {

            return { ...state, loading: false, isAuth: true }
        }

        case actionTypesAuth.CHECK_AUTH: {

            return { ...state, loading: false, isAuth: true, isCheck: false  }
        }

        case actionTypesAuth.LOGOUT: {
            return { ...state, loading: false, isAuth: false }
        }

        case actionTypesAuth.NOT_AUTH: {
            return { ...state, loading: false, isAuth: false }
        }

        default: {
            return state;
        }
    }
}
