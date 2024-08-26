export interface ITokens {
        accessToken: string
        refreshToken: string
}

export const setLocalStorage = (key: string, tokens: ITokens) => {
    localStorage.setItem(key, JSON.stringify(tokens))
}

export const getLocalStorage = (key: string):ITokens => {
    const data = localStorage.getItem(key);
    const tokens: ITokens = data ? JSON.parse(data) : '';
    return tokens
}

export const removeTokenFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key)
}

export const setSessionStorage = (key: string, path: string) => {
    
    if(key) {
        window.sessionStorage.removeItem(key)
        window.sessionStorage.setItem(key, JSON.stringify(path))
    }
}

export const getSessionStorage = (key: string): string => {
    return JSON.parse(window.sessionStorage.getItem(key) || "")
}