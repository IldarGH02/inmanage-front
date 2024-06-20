import React, { useState } from "react"
import { Alert } from "../../../../widgets/Alert/Alert"
import "./inputTextTest.css"

interface IInputText {
    length: number,
    value: string | undefined,
    attentionFlag: boolean,
    placeHolder?: string,
    setValue: (str: string)=>void,
    setAlert?: (str: string)=>void
}

export function InputText({length, value, attentionFlag, setValue, setAlert, placeHolder=''}:IInputText) {
    const [textAlert, setTextAlert] = useState('')
    const [attentionVisible, setAttentionVisible] = useState(false)

    const changeValue = (event: React.FormEvent<HTMLInputElement>) => {
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
            <div className="input-text-test"><input placeholder={placeHolder} type='text' value={value} onChange={changeValue} onBlur={blurInput}></input>{attentionVisible && attentionFlag && <b>!</b>}</div>
            {textAlert!=='' && <Alert text={textAlert} type={'warning'}/>}
        </>
    )
}