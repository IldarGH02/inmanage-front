import {ChangeEvent, useState} from "react";

export const useChange = (initialValue: string) => {
    const [value, setValue] = useState<string>(initialValue)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isError, setIsError] = useState<boolean>(false)
    
    const onChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value
        if(value.length === 0) {
            setIsError(true)
            setErrorMessage('Не более 20 символов')
        } else {
            setIsError(false)
            setValue(value)
        }
    }

    return {
        value,
        onChange,
        errorMessage,
        isError
    }
}