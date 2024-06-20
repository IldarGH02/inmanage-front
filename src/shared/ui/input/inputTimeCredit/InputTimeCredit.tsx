import React, { useState } from "react"
import { Alert } from "../../../../widgets/Alert/Alert"
import "./inputTimeCredit.css"

interface IInputTimeCredit {
    value: string,
    setAlert: (str: string)=>void,
    setValue: (str: string)=>void
}

export function InputTimeCredit({value, setValue, setAlert}:IInputTimeCredit) {
    const [textAlert, setTextAlert] = useState('')
    const [attentionVisible, setAttentionVisible] = useState(false)

    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    const changeValue = (event: React.FormEvent<HTMLInputElement>) => {
        let num = event.currentTarget.value.replace(/ /g,'')
        if(value == '0') {
            setValue(event.currentTarget.value[1])
        }
        else {
            setValue(event.currentTarget.value)
        }
        if(Number(num) <= 500) {
            setTextAlert('')
            setAlert('')
        }
        else {
            setTextAlert(`некорректные данные (max 500)`)
            setAlert(`некорректные данные (max 500)`)
        }
    }

    const blurInput = ()=> {
        if(textAlert!==''||value==='') {
            setAttentionVisible(true)
        }
        else {
            setAttentionVisible(false)
        }
    }

    return (
        <>
        <div className="input-time-credit-container">
            <div className="input-time-credit"><input placeholder="Введите срок" type='text' value={value} onChange={changeValue} onBlur={blurInput} onKeyUp={()=>setValue(discharge(value))}></input>{attentionVisible && <b>!</b>}</div>
            <b> мес.</b>
        </div>
            {textAlert!=='' && <Alert text={textAlert} type={'warning'}/>}
        </>
    )
}