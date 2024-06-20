import React, { useRef } from "react"
import "./inputSumForm.css"
import { Field } from "formik"

interface IInputSum {
    name: string,
    value: string,
    error: string | undefined,
    touched: boolean | undefined,
    placeHolder: string,
    background?: string,
    valuta: string,
    inputDisable?: boolean
}

export function InputSumForm({valuta, inputDisable=false, name, error, touched, background='white', value, placeHolder}:IInputSum) {
    const inputRef = useRef<HTMLInputElement>(null)
    // const [val, setValue] = useState(value)

    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    const onClickLabel = () => {
        if(!inputDisable) {
            inputRef.current?.focus()
        }
    } 

    const onFocusInput = () => {
        if(inputDisable) {
            inputRef.current?.blur()
        }
    } 

    return (
        <div className={`input-sum-form${error && touched ? '--error' : ''}`} style={{backgroundColor: background}}>
            <div className="input-sum-form__label" onClick={onClickLabel} style={{fontSize: value.length!==0?'15px':'20px'}}>{placeHolder}</div>
            <div className="input-sum-form__container">
                <Field 
                    name={name}
                    innerRef={inputRef} 
                    className="input-sum-form__input" 
                    type='text' 
                    onFocus={onFocusInput}
                    value={discharge(value)} 
                    // onKeyDown={()=>{setValue(discharge(value))}}
                    // onKeyUp={()=>{setValue(discharge(value))}}
                >
                </Field>
                <b className="input-sum-form__valuta"> {valuta}</b>
            </div>
        </div>      
    )
}
