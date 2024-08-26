import { ChangeEvent, FC } from "react";
import { observer } from "mobx-react-lite";
import { TextField } from "@mui/material";
import "./InputPercent.scss"

type InputSum = {
    value: string,
    type: string,
    currency: string,
    placeholder: string,
    classNameCurrency: string,
    setPercentValue: (value: string) => void,
    setPercentError: (error: string) => void,
}

export const InputPercent: FC<InputSum> = observer((
    {
        value,
        type,
        placeholder,
        classNameCurrency,
        currency,
        setPercentValue
    }) => {

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const regex = /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/;
        if(e.target.value.length === 0 || regex.test(e.currentTarget.value)) {           
            if(Number(e.currentTarget.value) <= 100){
                setPercentValue(e.currentTarget.value)
            }
        }
    }

    return (
        <div className="input__percent-container">
            <TextField
                onChange={handleChangeValue}
                value={value}
                type={type}
                className="input__percent"
                label={placeholder}
            />
            {value && <span className={classNameCurrency}>{currency}</span>}
        </div>
    )
})