export interface ITokens {
        accessToken: string
        refreshToken: string
}

export const useSetLocalStorage = (key: string, tokens: ITokens) => {
    localStorage.setItem(key, JSON.stringify(tokens))
}

export const useGetLocalStorage = (key: string):ITokens => {
    const data = localStorage.getItem(key);
    const tokens: ITokens = data ? JSON.parse(data) : '';
    return tokens
}

export const useRemoveTokenFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key)
}

export const useSetSessionStorage = (key: string, path: string) => {
    window.onbeforeunload = () => {
        useSetSessionStorage(key, path)
    }
}

export const useGetSessionStorage = (key: string): string => {
    return window.sessionStorage.getItem(key) || '{}'
}