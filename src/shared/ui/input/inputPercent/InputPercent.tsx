import React, { useState } from "react"
import { Alert } from "../../../../widgets/Alert/Alert"
import "./inputPercent.css"

interface IInputPercent {
    value: string,
    // setAlert: (str: string)=>void,
    setValue: (str: string)=>void
}

export function InputPercent({value, setValue}:IInputPercent) {
    const [inputVal, setInputVal] = useState(value)
    const [textAlert, setTextAlert] = useState('')

    const changeValue = (event: React.FormEvent<HTMLInputElement>) => {
        if((/(^\d{1,2})[.](\d{1,2})$/).test( event.currentTarget.value )) {           
            if( Number(event.currentTarget.value)<100){
                setInputVal(event.currentTarget.value)
                setValue(event.currentTarget.value)
                setTextAlert(``)
            }
            // else {
            //     setTextAlert(`некорректные данные`)
            // }
        }
    }

    return (
        <>
        <div className="input-percent-container">
            <input id="input-percent" className="input-percent" type='text' placeholder="Введите процентную ставку" value={inputVal} onChange={changeValue}></input>
            <b> %</b>
        </div>
        {textAlert!=='' && <Alert text={textAlert} type={'warning'}/>}
        </>
    )
}