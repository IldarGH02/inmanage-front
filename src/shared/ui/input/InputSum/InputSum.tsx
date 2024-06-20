import React, { useState } from "react"
import { Alert } from "../../../../widgets/Alert/Alert" 
import "./inputSum.css"

interface IInputSum {
    length: number,
    value: string,
    setValue: (str: string)=>void
}

export function InputSum({length, value, setValue}:IInputSum) {
    const [inputVal, setInputVal] = useState(value)
    const [textAlert, setTextAlert] = useState('')

    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    const changeValue = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = length
        const currentLength = event.currentTarget.value.replace(/ /g,'').length
        setInputVal(event.currentTarget.value)
        if(currentLength<=maxLength) {
            setValue(event.currentTarget.value)
            setTextAlert('')
        }
        else {
            setTextAlert(`кол-во символов превышено на ${length - maxLength}`)
            setValue('')
        }
    }

    return (
        <>
            <input id="input-sum" className="input-sum" type='text' placeholder="Введите сумму" value={inputVal} onChange={changeValue} onKeyUp={()=>setInputVal(discharge(value))}></input>
            <b> руб.</b>
            {textAlert!=='' && <Alert text={textAlert} type={'warning'}/>}
        </>
    )
}