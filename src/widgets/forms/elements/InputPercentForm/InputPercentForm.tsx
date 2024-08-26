import { useRef, useState } from "react"
import "./inputPercentForm.css"
import { Field } from "formik"

interface IInputPercent {
    name: string,
    value: string,
    alertSignal?: string,
    error: string | undefined,
    touched: boolean | undefined,
    placeHolder: string,
    background?: string
}

export function InputPercentForm({name, error, touched, background='white', value, placeHolder}:IInputPercent) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [val] = useState(value) //setValue

    function discharge(str:string): string {
        if((/(^\d{1,2})[.](\d{1,2})$/).test(str)) {
            return str
        } 
        return val
    }

    const onClickLabel = () => {
        inputRef.current?.focus()
    } 

    return (
        <div className={`input-percent-form${error && touched ? '--error' : ''}`} style={{backgroundColor: background}}>
            <div className="input-percent-form__label" onClick={onClickLabel} style={{fontSize: val.length!==0?'15px':'20px'}}>{placeHolder}</div>
            <div className="input-percent-form__container">
                <Field 
                    name={name}
                    innerRef={inputRef} 
                    className="input-percent-form__input" 
                    type='text' 
                    value={discharge(value)} 
                    // onKeyDown={()=>{setValue(discharge(value))}}
                    // onKeyUp={()=>{setValue(discharge(value))}}
                >
                </Field>
                <b className="input-percent-form__valuta"> %</b>
            </div>
        </div>      
    )
}
