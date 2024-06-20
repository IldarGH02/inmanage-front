import React, { useEffect, useState } from "react"
import { Alert } from "../../../../widgets/Alert/Alert" 
import "./inputSumTest.css"

interface IInputSum {
    length: number,
    value: string,
    alertSignal?: string,
    setAlert: (str: string)=>void,
    setValue: (str: string)=>void
}

export function InputSum({length, value, setValue, setAlert, alertSignal=''}:IInputSum) {
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

    return (
        <>
        <div className="input-sum-test-container">
            <div className="input-sum-test"><input placeholder="Введите сумму" type='text' value={value} onChange={changeValue} onBlur={blurInput} onKeyUp={()=>setValue(discharge(value))}></input>{attentionVisible && <b>!</b>}</div>
            <b> руб.</b>
        </div>
            
            
            {textAlert!=='' && <Alert text={textAlert} type={'warning'}/>}
        </>
    )
}