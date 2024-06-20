import React, { useEffect, useRef, useState } from "react"
import "./inputSumTransport.css"

interface IInputSum {
    length: number,
    value: string,
    alertSignal?: string,
    setAlert: (str: string)=>void,
    setValue: (str: string)=>void,
    placeHolder: string,
    background?: string
}

export function InputSumTransport({background='white', length, value, setValue, setAlert, alertSignal='', placeHolder}:IInputSum) {
    const [textAlert, setTextAlert] = useState('')
    const [attentionVisible, setAttentionVisible] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

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
        const maxLength = length
        const lengthCurrent = event.currentTarget.value.replace(/ /g,'').length
        if(value == '0' && event.currentTarget.value[1]) {
            setValue(event.currentTarget.value[1])
        }
        else {
            setValue(event.currentTarget.value)
        }
        // setValue(event.currentTarget.value)
        if(lengthCurrent<=maxLength) {
            setTextAlert('')
            setAlert('')
        }
        else {
            setTextAlert(`кол-во символов превышено на ${lengthCurrent - maxLength}`)
            setAlert(`кол-во символов превышено на ${lengthCurrent - maxLength}`)
            // setValue('')
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

    const onClickLabel = () => {
        inputRef.current?.focus()
    } 

    return (
        <div className="input-sum-transport-wrapper">
            <div className="input-sum-transport" style={{backgroundColor: background}}>
                <div className="input-sum-transport__label" onClick={onClickLabel} style={{fontSize: value!==''?'15px':'20px'}}>{placeHolder}</div>
                <div className="input-sum-transport__container">
                    <input ref={inputRef} className="input-sum-transport__input" type='text' value={value} onChange={changeValue} onBlur={blurInput} onKeyUp={()=>{setValue(discharge(value))}}></input>
                    <b className="input-sum-transport__valuta"> ₽</b>
                    <b className="input-sum-transport__attention">{attentionVisible ? '!':' '}</b>
                </div>
            </div>
            {textAlert!=='' && <div className="input-sum-transport__alert">{textAlert}</div>}
        </div>      
    )
}
