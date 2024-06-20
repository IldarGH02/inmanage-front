import React, { useState } from "react";
import "./inputTextareaForm.css";
import { Field } from "formik";

interface IInputTextareaForm {
    value: string,
    name: string,
    error: string | undefined,
    touched: boolean | undefined,
    placeHolder: string,
    length: number
}

export function InputTextareaForm({name, error, touched, placeHolder, length}: IInputTextareaForm) {
    const [counter, setCounter] = useState(0)

    function onInput(e: React.FormEvent<HTMLInputElement>) {
        setCounter(e.currentTarget.value.length)
    }

    return (
        <div className={`input-textarea-form${error && touched ? '--error' : ''}`}>
            <div className="input-textarea-form__title">{placeHolder}</div>
            <Field
                // placeholder="Введите текст"
                onInput={onInput}
                as="textarea"
                name={name}
                className="input-textarea-form__textarea"
            >
            </Field>
            <span className="input-textarea-form__counter-text">
                <span className="input-textarea-form__counter-current">{counter}</span>
                /
                <span className="input-textarea-form__counter-total">{length}</span>
            </span>
        </div>
    )
}
