import React, { FC, useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import { TextField } from "@mui/material";
import "./InputSum.scss"

type InputSum = {
    value: string,
    type: string,
    currency: string,
    placeholder: string,
    classNameCurrency: string,
    setValue: (value: string) => void,
    setError: (error: string) => void,
}

export const InputSum: FC<InputSum> = observer((
    {
        value,
        placeholder,
        classNameCurrency,
        currency,
        setValue,
        setError
    }) => {
    
    const [inputValue, setInputValue] = useState('');
    const  discharge = (str:string): string => {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.target.value;
        setInputValue(currentValue);

        if(value == '0' && currentValue[1]) {
            setValue(currentValue[1])
        } else {
            setValue(e.currentTarget.value)
        }

        setValue(e.currentTarget.value)
    }

    useEffect(() => {
        const maxLength = length;
        const currentLength = inputValue.replace(/ /g, '').length;

        if(inputValue.length <= maxLength) {
            setError(`кол-во символов превышено на ${currentLength - maxLength}`)
        } else {
            setError('')
        }
        if(inputValue.length <= 0) {
            setError('Обязательно поле')
        }
    }, [inputValue, setError]);

    return (
        <div className="input__sum-container">
            <TextField
                label={placeholder}
                onKeyUp={() => setValue(discharge(value))}
                onChange={handleChangeValue}
                value={value}
                type="text"
                className="input__sum"
            />
            {value && <span className={classNameCurrency}>{currency}</span>}
        </div>
    )
})