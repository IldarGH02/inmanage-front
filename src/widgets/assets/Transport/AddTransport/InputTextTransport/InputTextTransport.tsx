import React, { useState } from "react";
import "./inputTextTransport.css";

interface IInputText {
    value: string,
    placeHolder?: string,
    setValue: (str: string)=>void,
    setAlert: (str: string)=>void,
    attentionFlag?: boolean,
}

export function InputTextTransport({value, setValue, setAlert, placeHolder='', attentionFlag=true}:IInputText) {
    const [textAlert, setTextAlert] = useState('')
    const [attentionVisible, setAttentionVisible] = useState(false)

    const changeValue = (event: React.FormEvent<HTMLInputElement>) => {
        setAttentionVisible(false)
        const maxLength = 50
        let length = event.currentTarget.value.replace(/ /g,'').length
        
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

    const blurInput = ()=> {
        if(textAlert!==''||value==='') {
            setAttentionVisible(true)
        }
        else {
            setAttentionVisible(false)
        }
    }

    return (
        <div className="input-text-wrapper">
            <div className="input-text">
                <div className="input-text__container">
                    <div className="input-text__label" style={{fontSize: value!==''?'15px':'20px'}}>{placeHolder}</div>
                    <input className="input-text__input" type='text' value={value} onChange={changeValue} onBlur={blurInput}></input>
                </div>
                {attentionVisible && attentionFlag && <b className="input-text__attention">!</b>}
            </div>
            {textAlert!=='' && <div className="input-text__alert">{textAlert}</div>}
        </div>
    )
}