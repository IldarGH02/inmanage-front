export const setDate = (type: string, date: Date) => {
    return {
        type,
        payload: {
            date: date
        }
    }
}

export const setDaysOfMonth = (type: string, array: number[][]) => {
    let newArr: number[] = []
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            newArr.push(array[i][j])
        }
    }
    return {
        type,
        payload: {
            days: newArr
        }
    }
}
