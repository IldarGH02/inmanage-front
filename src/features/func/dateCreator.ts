export const setDate = (date: Date) => {
    return {date}
}

export const setDaysOfMonth = (array: number[][]) => {
    let newArr: number[] = []
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            newArr.push(array[i][j])
        }
    }
    return {newArr}
}
