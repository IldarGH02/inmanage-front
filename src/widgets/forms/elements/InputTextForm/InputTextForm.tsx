import "./inputTextForm.css";
import { Field } from 'formik';

interface IInputTextForm {
    value: string,
    name: string,
    error: string | undefined,
    touched: boolean | undefined,
    attentionFlag?: boolean,
    placeHolder: string
}

export function InputTextForm({value, name, error, touched, placeHolder, attentionFlag=true}: IInputTextForm) {
    return (
        <div className={`input-text-form${error && touched && attentionFlag ? '--error' : ''}`}>
            <div className="input-text-form__label" style={{fontSize: value!==''?'15px':'20px'}}>{placeHolder}</div>
            <Field 
                // placeholder="Введите текст"
                name={name}
                className="input-text-form__input"
            />
        </div>
    )
    
    
}