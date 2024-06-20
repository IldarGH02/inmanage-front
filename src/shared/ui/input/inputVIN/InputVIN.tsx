import React, { useState } from "react"
import { Alert } from "../../../../widgets/Alert/Alert"
import "./inputVIN.css"

interface IInputText {
    value: string,
    placeHolder?: string,
    setValue: (str: string)=>void,
    setAlert: (str: string)=>void
}

export function InputTextVIN({value, setValue, setAlert, placeHolder=''}:IInputText) {
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
        <>
            <div className="input-text-test"><input placeholder={placeHolder} type='text' value={value} onChange={changeValue} onBlur={blurInput}></input>{attentionVisible && <b>!</b>}</div>
            {textAlert!=='' && <Alert text={textAlert} type={'warning'}/>}
        </>
    )
}