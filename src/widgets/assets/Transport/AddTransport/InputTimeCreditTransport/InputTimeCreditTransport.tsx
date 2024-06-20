import React, { useEffect, useState } from "react"
import "./inputTimeCreditTransport.css"

interface IInputTime {
    value: string,
    alertSignal?: string,
    setAlert: (str: string)=>void,
    setValue: (str: string)=>void,
    placeHolder: string
}

export function InputTimeCreditTransport({value, setValue, setAlert, alertSignal='', placeHolder}:IInputTime) {
    const [textAlert, setTextAlert] = useState('')
    const [attentionVisible, setAttentionVisible] = useState(false)

    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    useEffect(()=>{
        setAttentionVisible(true)
        setTextAlert(alertSignal)
    },[alertSignal])
    useEffect(()=>{
        setAttentionVisible(false)
    },[])

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
        <div className="input-time-credit-transport-wrapper">
            <div className="input-time-credit-transport">
            <div className="input-time-credit-transport__label" style={{fontSize: value!==''?'15px':'20px'}}>{placeHolder}</div>
                <div className="input-time-credit-transport__container">
                    <input className="input-time-credit-transport__input" type='text' value={value} onChange={changeValue} onBlur={blurInput} onKeyUp={()=>{setValue(discharge(value))}}></input>
                    <b className="input-time-credit-transport__valuta"> мес.</b>
                    <b className="input-time-credit-transport__attention">{attentionVisible ? '!':' '}</b>
                </div>
            </div>
            {textAlert!=='' && <div className="input-time-credit-transport__alert">{textAlert}</div>}
        </div>      
    )
}
