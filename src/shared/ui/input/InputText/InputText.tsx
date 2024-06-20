import React, { useState } from "react"
import { Alert } from "../../../../widgets/Alert/Alert" 
import "./inputText.css"

interface IInputText {
    lenght: number,
    value: string,
    setValue: (str: string)=>void,
    setAlert?: (str: string)=>void
}

export function InputText({lenght, value, setValue, setAlert}:IInputText) {
    const [textAlert, setTextAlert] = useState('')

    const changeValue = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = lenght
        const length = event.currentTarget.value.length
        setValue(event.currentTarget.value)
        if(length<=maxLength) {
            setTextAlert('')
        }
        else {
            if(setAlert !== undefined) {
                setAlert(`допустимое количество символов превышено на ${length - maxLength}`)
            }
            setTextAlert(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    return (
        <>
            <input className="input-text" type='text' value={value} onChange={changeValue}></input>
            {textAlert!=='' && <Alert text={textAlert} type={'warning'}/>}
        </>
    )
}