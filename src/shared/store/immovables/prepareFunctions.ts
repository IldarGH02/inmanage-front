export const discharge = (str:string): string => {
    return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export const checkFloorsLength = (str: string) => {
    if(str.length > 2) {
        return str.slice(2, str.length)
    }
    return str
}