import React, { useState } from "react"
import "./inputVIN.css"
// import { Alert } from "../../../../Alert/Alert"

interface IInputTextVin {
    value: string,
    placeHolder?: string,
    setValue: (str: string)=>void,
    setAlert: (str: string)=>void
}

export function InputTextVIN({value, setValue, setAlert, placeHolder=''}:IInputTextVin) {
    const [textAlert, setTextAlert] = useState('')
    const [attentionVisible, setAttentionVisible] = useState(false)

    const changeValue = (event: React.FormEvent<HTMLInputElement>) => {
        setAttentionVisible(false)
        const maxLength = 17
        let length = event.currentTarget.value.replace(/ /g,'').length
        
        setValue(event.currentTarget.value)
        if(length===maxLength) {
            setAlert('')
            setTextAlert('')
        }
        else {
            if(length>=1 && length<17) {
                setAlert(`осталось ввести симовов для заполнения ${maxLength - length}`)
                setTextAlert(`осталось ввести симовов для заполнения ${maxLength - length}`)
            }
            if(length>maxLength) {
                setAlert(`допустимое количество символов превышено на ${length - maxLength}`)
                setTextAlert(`допустимое количество символов превышено на ${length - maxLength}`)
            }
            if(length===0) {
                setAlert('')
                setTextAlert('')
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

    return (
        <div className="input-vin-wrapper">
            <div className="input-vin">
                <div className="input-vin__container">
                <div className="input-vin__label" style={{fontSize: value!==''?'15px':'20px'}}>{placeHolder}</div>
                    <input className="input-vin__input" type='text' value={value} onChange={changeValue} onBlur={blurInput}></input>
                </div>
                {attentionVisible && <b className="input-vin__attention">!</b>}
            </div>
            {textAlert!=='' && <div className="input-vin__alert">{textAlert}</div>}
        </div>
    )
}