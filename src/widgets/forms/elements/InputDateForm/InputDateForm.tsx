import { useRef } from "react";
import "./inputDateForm.css";
import { Field, FormikErrors, FormikTouched } from "formik";

interface IInputDate {
    name: string,
    value: Date,
    error: FormikErrors<Date> | undefined,
    touched: FormikTouched<Date> | undefined,
    placeHolder: string,
    background?: string,
}

export function InputDateForm({name, error, touched, background='white', value, placeHolder}: IInputDate) {
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickLabel = () => {
        inputRef.current?.focus()
    } 

    return (
        <div className={`input-date-form${error && touched ? '--error' : ''}`} style={{backgroundColor: background}}>
            <div className="input-date-form__label" onClick={onClickLabel} style={{fontSize: value?'15px':'20px'}}>{placeHolder}</div>
            <div className="input-date-form__container">
                <Field 
                    name={name}
                    innerRef={inputRef} 
                    className="input-date-form__input" 
                    type='date' 
                    min={new Date()}
                >
                </Field>
                {/* <b className="input-date-form__valuta"> {valuta}</b> */}
            </div>
        </div>
    )
}