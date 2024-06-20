import React, { useEffect, useRef, useState } from "react"
import "./inputPercentTransport.css"

interface IInputSum {
    value: string,
    alertSignal?: string,
    setAlert: (str: string)=>void,
    setValue: (str: string)=>void,
    placeHolder: string,
    background?: string,
    inputDisable?: boolean
}

export function InputPercentTransport({background='white', value, setValue, setAlert, alertSignal='', placeHolder, inputDisable=false}:IInputSum) {
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
        if((/(^\d{1,2})[.](\d{1,2})$/).test( event.currentTarget.value) && !inputDisable) {           
            // console.log(event.currentTarget.value)
            if( Number(event.currentTarget.value)<100){
                // setInputVal(event.currentTarget.value)
                setValue(event.currentTarget.value)
                setTextAlert(``)
                setAlert('')
            } else {
                setTextAlert(`некорректные данные`)
            }
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
        if(!inputDisable) {
            inputRef.current?.focus()
        }
    }

    const onFocus = () => {
        if(inputDisable) {
            inputRef.current?.blur()
        }
    }

    return (
        <div className="input-sum-transport-wrapper">
            <div className="input-sum-transport" style={{backgroundColor: background}}>
            <div className="input-sum-transport__label" onClick={onClickLabel} style={{fontSize: value!==''?'15px':'20px'}}>{placeHolder}</div>
                <div className="input-sum-transport__container">
                    <input ref={inputRef} className="input-sum-transport__input" type='text' onFocus={onFocus} value={value} onChange={changeValue} onBlur={blurInput} onKeyUp={()=>{setValue(discharge(value))}}></input>
                    <b className="input-sum-transport__valuta"> %</b>
                    <b className="input-sum-transport__attention">{attentionVisible && !inputDisable ? '!':' '}</b>
                </div>
            </div>
            {textAlert!=='' && <div className="input-sum-transport__alert">{textAlert}</div>}
        </div>      
    )
}
