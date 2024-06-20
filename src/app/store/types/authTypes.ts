export enum actionTypesAuth {

    SHOW_LOADER_AUTH = 'SHOW_LOADER_AUTH',
    HIDE_LOADER_AUTH = 'HIDE_LOADER_AUTH',

    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    REGISTRATION = 'REGISTRATION',
    REGISTRATION_CONFIRM = 'REGISTRATION_CONFIRM',
    CHECK_AUTH = 'CHECK_AUTH',

    CHANGE_IS_AUTH_ON_FALSE = 'CHANGE_IS_AUTH_ON_FALSE',
    IS_CHECK_AUTH = 'IS_CHECK_AUTH',

    NOT_AUTH = 'NOT_AUTH'
};

export interface IStateAuth {
    isAuth: boolean,
    tempToken: string,
    loading: boolean,
    isCheck: boolean
}

export interface IUserInfoLogin {
    phoneNumber: string,
    password: string
}

// export interface IAction {
//     type: string;
//     payload?: any; 
// };

export const initialStateAuth: IStateAuth = {
    // isAuth: localStorage.getItem('accessToken')?true: false,
    isAuth: false,
    tempToken: '',
    loading: false,
    isCheck: true,
};
