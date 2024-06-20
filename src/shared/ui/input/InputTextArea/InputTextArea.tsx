import React, { useState } from "react"
import { Alert } from "../../../../widgets/Alert/Alert" 
import "./inputTextArea.css"

interface IInputText {
    length: number,
    value: string,
    attentionFlag: boolean,
    placeHolder?: string,
    setValue: (str: string)=>void,
    setAlert?: (str: string)=>void
}

export function InputTextArea({length, value, attentionFlag, setValue, setAlert, placeHolder=''}:IInputText) {
    const [textAlert, setTextAlert] = useState('')
    const [attentionVisible, setAttentionVisible] = useState(false)

    const changeValue = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setAttentionVisible(false)
        const maxLength = length
        const currentLength = event.currentTarget.value.length
        
        setValue(event.currentTarget.value)
        if(currentLength<=maxLength) {
            setTextAlert('')
        }
        else {
            if(setAlert !== undefined) {
                setAlert(`допустимое количество символов превышено на ${currentLength - maxLength}`)
            }
            setTextAlert(`допустимое количество символов превышено на ${currentLength - maxLength}`)
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
            <div className="input-text-area"><textarea placeholder={placeHolder} value={value} onChange={changeValue} onBlur={blurInput}/>{attentionVisible && attentionFlag && <b>!</b>}</div>
            {textAlert!=='' && <Alert text={textAlert} type={'warning'}/>}
        </>
    )
}